"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Menu,
  X,
  Quote,
  ArrowRight,
} from "lucide-react";
import {
  staticCollections,
  lookbookItems,
  designers,
  testimonials,
  faqItems,
  storeInfo,
  aboutStats,
} from "@/lib/static-data";
import { pageLoadDelay, lazyLoadDelay, slowResponseDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

// ─── Brochure Navbar ─────────────────────────────────────────────
function BrochureNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Collections", href: "#collections" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Designers", href: "#designers" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              scrolled ? "bg-stone-900" : "bg-white/20 backdrop-blur"
            }`}
          >
            <span className="text-white font-bold text-lg font-[var(--font-playfair)]">S</span>
          </div>
          <span
            className={`text-xl font-bold font-[var(--font-playfair)] transition-colors ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            StyleVault
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded-lg ${
                scrolled
                  ? "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              scrolled
                ? "bg-stone-900 text-white hover:bg-stone-800"
                : "bg-white text-stone-900 hover:bg-white/90"
            }`}
          >
            Visit Our Boutique
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
              scrolled ? "text-stone-900 hover:bg-stone-100" : "text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-base font-semibold text-white bg-stone-900 rounded-xl text-center mt-3"
            >
              Visit Our Boutique
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── FAQ Accordion Item ─────────────────────────────────────────
function FAQAccordion({ item }: { item: (typeof faqItems)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <span className="text-base md:text-lg font-medium text-stone-800 pr-4 group-hover:text-stone-900 font-[var(--font-inter)]">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-stone-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-stone-600 leading-relaxed text-sm md:text-base font-[var(--font-inter)]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// ─── Contact Form ───────────────────────────────────────────────
function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await actionDelay();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={24} className="text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-playfair)] mb-2">
          Thank You!
        </h3>
        <p className="text-stone-600 font-[var(--font-inter)]">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-[var(--font-inter)]">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 transition-all font-[var(--font-inter)]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5 font-[var(--font-inter)]">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="you@email.com"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 transition-all font-[var(--font-inter)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5 font-[var(--font-inter)]">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 transition-all font-[var(--font-inter)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-[var(--font-inter)]">
          Interested In <span className="text-red-400">*</span>
        </label>
        <select
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 transition-all bg-white font-[var(--font-inter)]"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option>Ethnic Wear</option>
          <option>Western</option>
          <option>Bridal</option>
          <option>Custom Tailoring</option>
          <option>Accessories</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5 font-[var(--font-inter)]">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Tell us what you're looking for..."
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-stone-400 transition-all resize-none font-[var(--font-inter)]"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm font-[var(--font-inter)]"
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function StaticBrochurePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);
  const [lookbookLoaded, setLookbookLoaded] = useState(false);
  const [designersLoaded, setDesignersLoaded] = useState(false);
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Initial page load
    pageLoadDelay().then(() => {
      setHeroLoaded(true);
      // Collections loads shortly after hero
      lazyLoadDelay().then(() => setCollectionsLoaded(true));
    });

    // Lookbook lazy-loads
    lazyLoadDelay().then(() => setLookbookLoaded(true));

    // Designers section is the "slow response" for graceful degradation
    slowResponseDelay().then(() => setDesignersLoaded(true));

    // Testimonials load after a moderate delay
    lazyLoadDelay().then(() => setTestimonialsLoaded(true));
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <BrochureNav />

      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        {!heroLoaded ? (
          <div className="absolute inset-0 bg-stone-900 flex items-center justify-center">
            <div className="text-center space-y-6 px-4">
              <Skeleton dark className="h-6 w-48 mx-auto" />
              <Skeleton dark className="h-14 w-80 mx-auto" />
              <Skeleton dark className="h-5 w-64 mx-auto" />
              <Skeleton dark className="h-12 w-44 mx-auto !rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            <Image
              src="https://images.unsplash.com/photo-1765229279946-f265fa703385?w=1920&h=1080&fit=crop"
              alt="Fashion editorial — model in flowing red satin dress"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 animate-fade-in">
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-4 font-[var(--font-inter)]">
                Est. 2016 &middot; Jaipur
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] font-[var(--font-playfair)] mb-6 max-w-4xl">
                Curated Fashion, Personal Style
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-xl mb-8 font-[var(--font-inter)]">
                A boutique experience where handcrafted tradition meets contemporary elegance.
                Discover collections curated by India&apos;s finest designers.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-stone-900 font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all text-sm md:text-base font-[var(--font-inter)]"
              >
                Visit Our Boutique <ArrowRight size={18} />
              </a>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown size={24} className="text-white/50" />
            </div>
          </>
        )}
      </section>

      {/* ═══ 2. ABOUT US SECTION ═══ */}
      <section id="about" className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop"
                  alt="StyleVault boutique interior"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-stone-300 rounded-2xl -z-10" />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)] mb-6 leading-tight">
                Where Tradition Meets Contemporary Elegance
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed font-[var(--font-inter)]">
                <p>
                  Founded in 2016 in the heart of Jaipur, StyleVault began as a single-room
                  boutique with a bold vision: to bring India&apos;s extraordinary textile
                  heritage to the modern wardrobe without compromise.
                </p>
                <p>
                  We partner with over 45 independent designers and master artisans across
                  Rajasthan, Varanasi, Kanchipuram, and Lucknow — preserving age-old
                  techniques like zardozi, gota patti, chikankari, and Banarasi weaving
                  while reimagining them for today&apos;s sensibilities.
                </p>
                <p>
                  Every piece in our collection is handpicked. Every fabric, inspected.
                  Every stitch, intentional. Because fashion should feel as extraordinary
                  as the person wearing it.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 border-t border-stone-200">
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-stone-900 font-[var(--font-playfair)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-stone-500 mt-1 font-[var(--font-inter)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. COLLECTIONS SECTION ═══ */}
      <section id="collections" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)]">
              Our Collections
            </h2>
            <p className="text-stone-500 mt-4 max-w-lg mx-auto font-[var(--font-inter)]">
              Each collection is a celebration of craft, heritage, and the art of dressing well.
            </p>
          </div>

          {!collectionsLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton className="w-full h-80" />
                  <div className="p-5 space-y-3 bg-stone-50">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticCollections.map((collection, i) => (
                <div
                  key={collection.id}
                  className="group rounded-2xl overflow-hidden bg-stone-50 hover:shadow-xl transition-all duration-500 animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-bold text-stone-900 font-[var(--font-playfair)] mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4 font-[var(--font-inter)]">
                      {collection.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {collection.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-stone-200/60 text-stone-600 rounded-full font-[var(--font-inter)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 4. LOOKBOOK SECTION ═══ */}
      <section id="lookbook" className="py-20 md:py-28 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-500 mb-3 font-[var(--font-inter)]">
              Seasonal Editorials
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[var(--font-playfair)]">
              The Lookbook
            </h2>
            <p className="text-stone-400 mt-4 max-w-lg mx-auto font-[var(--font-inter)]">
              Styled complete outfits from our latest Spring/Summer, Autumn/Winter, Festive,
              and Bridal collections.
            </p>
          </div>

          {!lookbookLoaded ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton
                  key={i}
                  dark
                  className={`w-full rounded-xl ${
                    i === 0 || i === 3 ? "h-[400px] md:row-span-2" : "h-48 md:h-[192px]"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[192px] gap-3 md:gap-4">
              {lookbookItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer animate-fade-in ${item.aspectClass}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-white/60 font-[var(--font-inter)]">
                      {item.season}
                    </span>
                    <h3 className="text-white font-semibold text-sm md:text-base font-[var(--font-playfair)]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 5. DESIGNER SPOTLIGHT ═══ */}
      <section id="designers" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
              The Creatives
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)]">
              Designer Spotlight
            </h2>
            <p className="text-stone-500 mt-4 max-w-lg mx-auto font-[var(--font-inter)]">
              Meet the visionaries behind our most sought-after collections.
            </p>
          </div>

          {!designersLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="w-32 h-32 !rounded-full mx-auto" />
                  <Skeleton className="h-6 w-36 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-48 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {designers.map((designer, i) => (
                <div
                  key={designer.id}
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-stone-100 group-hover:ring-stone-300 transition-all">
                    <Image
                      src={designer.photo}
                      alt={designer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 font-[var(--font-playfair)] mb-1">
                    {designer.name}
                  </h3>
                  <p className="text-xs text-stone-400 mb-3 font-[var(--font-inter)]">
                    {designer.yearsActive} years in fashion &middot; {designer.notableWork}
                  </p>
                  <p className="text-sm text-stone-600 italic leading-relaxed mb-3 font-[var(--font-inter)]">
                    &ldquo;{designer.philosophy}&rdquo;
                  </p>
                  <p className="text-xs text-stone-500 font-medium font-[var(--font-inter)]">
                    Signature: {designer.signatureStyle}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS SECTION ═══ */}
      <section id="testimonials" className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
              What They Say
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)]">
              Client Testimonials
            </h2>
          </div>

          {!testimonialsLoaded ? (
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Skeleton className="w-16 h-16 !rounded-full mx-auto" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5 mx-auto" />
              <Skeleton className="h-5 w-3/5 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto" />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {/* Featured testimonial */}
              <div className="text-center animate-fade-in" key={activeTestimonial}>
                <Quote size={36} className="text-stone-200 mx-auto mb-6" />
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-white shadow-lg">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic mb-6 font-[var(--font-inter)]">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonials[activeTestimonial].rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-200"
                      }
                    />
                  ))}
                </div>
                <h4 className="text-base font-bold text-stone-900 font-[var(--font-playfair)]">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-sm text-stone-500 font-[var(--font-inter)]">
                  {testimonials[activeTestimonial].purchaseType} &middot;{" "}
                  {testimonials[activeTestimonial].location} &middot;{" "}
                  {testimonials[activeTestimonial].date}
                </p>
              </div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeTestimonial
                        ? "bg-stone-900 w-6"
                        : "bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 7. FAQ SECTION ═══ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
              Questions?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)]">
              Frequently Asked
            </h2>
          </div>
          <div className="divide-y divide-stone-200 border-t border-stone-200">
            {faqItems.map((item) => (
              <FAQAccordion key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. CONTACT US SECTION ═══ */}
      <section id="contact" className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm tracking-[0.2em] uppercase text-stone-400 mb-3 font-[var(--font-inter)]">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 font-[var(--font-playfair)]">
              Contact Us
            </h2>
            <p className="text-stone-500 mt-4 max-w-lg mx-auto font-[var(--font-inter)]">
              Have a question, need styling advice, or want to schedule a visit?
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <ContactForm />
            </div>

            {/* Right: Store info + map */}
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-56 md:h-64 bg-stone-200">
                <iframe
                  src={storeInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="StyleVault boutique location"
                />
              </div>

              {/* Store details */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-stone-600" />
                  </div>
                  <div className="font-[var(--font-inter)]">
                    <h4 className="font-semibold text-stone-900 text-sm">{storeInfo.name}</h4>
                    <p className="text-sm text-stone-500">
                      {storeInfo.address}, {storeInfo.city}, {storeInfo.state} — {storeInfo.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-stone-600" />
                  </div>
                  <div className="font-[var(--font-inter)]">
                    <h4 className="font-semibold text-stone-900 text-sm">Phone</h4>
                    <p className="text-sm text-stone-500">{storeInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-stone-600" />
                  </div>
                  <div className="font-[var(--font-inter)]">
                    <h4 className="font-semibold text-stone-900 text-sm">Email</h4>
                    <p className="text-sm text-stone-500">{storeInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-stone-600" />
                  </div>
                  <div className="font-[var(--font-inter)]">
                    <h4 className="font-semibold text-stone-900 text-sm mb-1">Boutique Hours</h4>
                    <div className="space-y-1">
                      {storeInfo.hours.map((h) => (
                        <div key={h.day} className="flex justify-between text-sm text-stone-500 gap-4">
                          <span>{h.day}</span>
                          <span className="font-medium text-stone-700">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. FOOTER ═══ */}
      <footer className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + tagline */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[var(--font-playfair)]">S</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg font-[var(--font-playfair)]">
                  StyleVault
                </span>
                <p className="text-stone-500 text-xs font-[var(--font-inter)]">
                  Curated Fashion, Personal Style
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={storeInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                {/* Instagram icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a
                href={storeInfo.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                {/* Pinterest icon (lucide doesn't have one, using an SVG) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 5-3 6.5l-1-3.5" />
                  <path d="M12 2a10 10 0 1 0 4 19.2" />
                </svg>
              </a>
            </div>

            {/* Powered by */}
            <p className="text-stone-500 text-xs font-[var(--font-inter)]">
              &copy; {new Date().getFullYear()} StyleVault. Powered by{" "}
              <span className="text-stone-400">Darsh Gupta</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
