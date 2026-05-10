#!/usr/bin/env npx tsx
/**
 * StyleVault Image Validator
 *
 * Scans all source files for image URLs (Unsplash, Picsum), checks each one
 * with an HTTP GET request, and replaces any URL that does NOT return 200 with
 * a working picsum.photos fallback that matches the original dimensions.
 *
 * Usage:
 *   npx tsx scripts/validate-images.ts          # dry-run (report only)
 *   npx tsx scripts/validate-images.ts --fix     # replace broken URLs in-place
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, relative } from "path";

// ── Configuration ──────────────────────────────────────────────────────────
const SRC_DIR = join(__dirname, "..", "src");
const EXTENSIONS = [".ts", ".tsx"];
const CONCURRENCY = 6;
const TIMEOUT_MS = 10_000;

// ── Helpers ────────────────────────────────────────────────────────────────

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function parseDimensions(url: string): { w: number; h: number } {
  try {
    const u = new URL(url);
    const w = parseInt(u.searchParams.get("w") || "600", 10);
    const h = parseInt(u.searchParams.get("h") || "400", 10);
    return { w: isNaN(w) ? 600 : w, h: isNaN(h) ? 400 : h };
  } catch {
    return { w: 600, h: 400 };
  }
}

function picsumFallback(w: number, h: number, seed: number): string {
  return `https://picsum.photos/seed/sv${seed}/${w}/${h}`;
}

/**
 * Check a URL by issuing a GET with an immediate abort once we read the status.
 * This avoids HEAD-method issues (405) with some CDNs like Picsum.
 */
async function checkUrl(url: string): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
    // Abort the body download immediately — we only need the status.
    controller.abort();
    return res.status;
  } catch (err: unknown) {
    // AbortError after we already got the status is fine — return the last
    // status we saw.  If we truly timed out before any response, return 0.
    if (err instanceof DOMException && err.name === "AbortError") {
      // We aborted on purpose after getting a status → treat as success if
      // the fetch didn't throw before we got a response.
      return 200; // best-effort; the fetch would have thrown earlier on real failure
    }
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * More reliable status checker: follows redirects and reads status.
 */
async function checkUrlReliable(url: string): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { Range: "bytes=0-0" }, // request minimal body
    });
    return res.status === 206 ? 200 : res.status; // 206 Partial Content = exists
  } catch {
    return 0;
  } finally {
    clearTimeout(timer);
  }
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const fix = process.argv.includes("--fix");

  console.log(`\n🔍  StyleVault Image Validator`);
  console.log(`   Mode : ${fix ? "FIX (will rewrite files)" : "DRY-RUN (report only, pass --fix to replace)"}`);
  console.log(`   Dir  : ${SRC_DIR}\n`);

  // 1. Gather every unique image URL across all source files.
  const files = walk(SRC_DIR);
  const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[^\s"'`]+/g;

  const urlLocations = new Map<string, Set<string>>();

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    let match: RegExpExecArray | null;
    urlRegex.lastIndex = 0;
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[0];
      if (!urlLocations.has(url)) urlLocations.set(url, new Set());
      urlLocations.get(url)!.add(file);
    }
  }

  const uniqueUrls = [...urlLocations.keys()];
  console.log(`   Found ${uniqueUrls.length} unique image URLs across ${files.length} files.\n`);

  if (uniqueUrls.length === 0) {
    console.log("   Nothing to check. ✅\n");
    return;
  }

  // 2. Check every URL in parallel (bounded concurrency).
  console.log("   Checking URLs (GET with Range header)...\n");

  interface CheckResult { url: string; status: number; ok: boolean }

  const results = await mapPool<string, CheckResult>(uniqueUrls, CONCURRENCY, async (url) => {
    const status = await checkUrlReliable(url);
    return { url, status, ok: status === 200 };
  });

  const good = results.filter((r) => r.ok);
  const bad = results.filter((r) => !r.ok);

  console.log(`   ✅  ${good.length} URLs returned 200`);
  console.log(`   ❌  ${bad.length} URLs are broken / non-200\n`);

  if (bad.length === 0) {
    console.log("   All images are valid! Nothing to replace. 🎉\n");
    return;
  }

  // 3. Report broken URLs.
  console.log("   Broken URLs:");
  for (const { url, status: httpStatus } of bad) {
    const filesUsing = [...urlLocations.get(url)!].map((f) => relative(SRC_DIR, f));
    console.log(`     [${httpStatus || "TIMEOUT"}] ${url}`);
    console.log(`       ↳ used in: ${filesUsing.join(", ")}`);
  }
  console.log();

  if (!fix) {
    console.log("   Run with --fix to replace broken URLs with picsum.photos fallbacks.\n");
    process.exitCode = 1;
    return;
  }

  // 4. Build a replacement map and rewrite files.
  let picsumSeed = 200;
  const replacements = new Map<string, string>();

  for (const { url } of bad) {
    const { w, h } = parseDimensions(url);
    replacements.set(url, picsumFallback(w, h, picsumSeed++));
  }

  const filesToRewrite = new Set<string>();
  for (const { url } of bad) {
    for (const file of urlLocations.get(url)!) {
      filesToRewrite.add(file);
    }
  }

  let replacedCount = 0;
  for (const file of filesToRewrite) {
    let content = readFileSync(file, "utf-8");
    for (const [oldUrl, newUrl] of replacements) {
      const before = content;
      content = content.split(oldUrl).join(newUrl);
      if (content !== before) {
        replacedCount += before.split(oldUrl).length - 1;
      }
    }
    writeFileSync(file, content, "utf-8");
  }

  console.log(`   🔧  Replaced ${replacedCount} URL occurrences across ${filesToRewrite.size} files.`);
  console.log(`   ✅  Done! Re-run without --fix to verify.\n`);
}

main();
