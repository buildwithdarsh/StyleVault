"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/static")) return null;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">
                Style<span className="text-primary-light">Vault</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              India&apos;s curated platform for boutique fashion, custom tailoring, and personal styling.
              Connecting 500+ independent boutiques with fashion-forward shoppers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/stylevault"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StyleVault on Instagram"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
              </a>
              <a
                href="https://pinterest.com/stylevault"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StyleVault on Pinterest"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 5-3 6.5l-1-3.5" /><path d="M12 2a10 10 0 1 0 4 19.2" /></svg>
              </a>
              <a
                href="https://twitter.com/stylevault"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StyleVault on Twitter"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/catalog?category=sarees" className="hover:text-primary-light transition-colors">Sarees</Link></li>
              <li><Link href="/catalog?category=lehengas" className="hover:text-primary-light transition-colors">Lehengas</Link></li>
              <li><Link href="/catalog?category=kurtas" className="hover:text-primary-light transition-colors">Kurtas</Link></li>
              <li><Link href="/catalog?category=gowns" className="hover:text-primary-light transition-colors">Gowns & Dresses</Link></li>
              <li><Link href="/bridal" className="hover:text-primary-light transition-colors">Bridal Collection</Link></li>
              <li><Link href="/custom-tailoring" className="hover:text-primary-light transition-colors">Custom Tailoring</Link></li>
              <li><Link href="/catalog?sort=newest" className="hover:text-primary-light transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/boutiques" className="hover:text-primary-light transition-colors">Find Boutiques</Link></li>
              <li><Link href="/stylists" className="hover:text-primary-light transition-colors">Personal Stylists</Link></li>
              <li><Link href="/subscription" className="hover:text-primary-light transition-colors">Subscription Boxes</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary-light transition-colors">Sell on StyleVault</Link></li>
              <li><Link href="/static" className="hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link href="/static#contact" className="hover:text-primary-light transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/static#faq" className="hover:text-primary-light transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/catalog" className="hover:text-primary-light transition-colors">Size Guide</Link></li>
              <li><Link href="/static#contact" className="hover:text-primary-light transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/static#contact" className="hover:text-primary-light transition-colors">Shipping Info</Link></li>
              <li><Link href="/static#contact" className="hover:text-primary-light transition-colors">Privacy Policy</Link></li>
              <li><Link href="/static#contact" className="hover:text-primary-light transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} /> <span>1800-123-STYLE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> <span>hello@stylevault.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; 2026 StyleVault by Darsh Gupta. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>We accept:</span>
            <div className="flex gap-2">
              {["UPI", "Visa", "Mastercard", "RuPay", "COD"].map((m) => (
                <span key={m} className="px-2 py-1 bg-gray-800 rounded text-[10px] font-medium">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
