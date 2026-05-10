"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search, Heart, ShoppingBag, User, Menu, X, Bell, MapPin,
  ChevronDown, Scissors, Store, LayoutDashboard, Calendar
} from "lucide-react";
import { notifications } from "@/lib/mock-data";

const categories = [
  { name: "Sarees", href: "/catalog?category=sarees" },
  { name: "Lehengas", href: "/catalog?category=lehengas" },
  { name: "Kurtas", href: "/catalog?category=kurtas" },
  { name: "Gowns", href: "/catalog?category=gowns" },
  { name: "Indo-Western", href: "/catalog?category=indo-western" },
  { name: "Bridal", href: "/bridal" },
  { name: "Custom Tailoring", href: "/custom-tailoring" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Hide on static brochure pages
  if (pathname.startsWith("/static")) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top bar — hidden on mobile for cleaner look */}
      <div className="hidden md:block bg-primary text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>Delivering to Bengaluru, Mumbai, Delhi, Chennai, Jaipur & 50+ cities</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:underline flex items-center gap-1">
              <Store size={12} /> Sell on StyleVault
            </Link>
            <Link href="/tailor" className="hover:underline flex items-center gap-1">
              <Scissors size={12} /> Tailor Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-base md:text-lg">S</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">
              Style<span className="text-primary">Vault</span>
            </span>
          </Link>

          {/* Desktop search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by style, occasion, fabric, boutique..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-0.5 md:gap-2">
            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse-dot">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div className="fixed inset-0 z-40 md:hidden" onClick={() => setNotifOpen(false)} />
                  <div className="fixed md:absolute left-2 right-2 md:left-auto md:right-0 top-auto md:top-full mt-2 md:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[70vh] md:max-h-[400px]">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button className="text-xs text-primary font-medium min-h-[44px] flex items-center" onClick={() => setNotifOpen(false)}>
                        Mark all read
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-[60vh] md:max-h-80">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors active-press ${
                            !n.isRead ? "bg-primary/5" : ""
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Wishlist — desktop only (mobile uses bottom nav) */}
            <Link href="/wishlist" className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors relative">
              <Heart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                4
              </span>
            </Link>

            {/* Cart — desktop only */}
            <Link href="/cart" className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Profile — desktop only */}
            <Link href="/orders" className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors">
              <User size={20} />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop category nav */}
        <nav className="hidden md:flex items-center gap-1 pb-2 -mx-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all whitespace-nowrap font-medium"
            >
              {cat.name}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all whitespace-nowrap font-medium flex items-center gap-1"
            >
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 top-full pt-1 z-50 ${moreOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[200px]">
                <Link href="/appointments" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  <Calendar size={16} /> Appointments
                </Link>
                <Link href="/subscription" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  <ShoppingBag size={16} /> Subscription Boxes
                </Link>
                <Link href="/stylists" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  <User size={16} /> Personal Stylist
                </Link>
                <Link href="/style-quiz" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  ✨ Style Quiz
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  <LayoutDashboard size={16} /> Business Dashboard
                </Link>
                <Link href="/tailor" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg">
                  <Scissors size={16} /> Tailor Panel
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile search — full-width sticky */}
      {searchOpen && (
        <div className="md:hidden px-3 pb-3 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by style, occasion, fabric..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu — full-screen overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white z-40 overflow-y-auto animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {/* Categories */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">Shop</p>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="flex items-center min-h-[48px] px-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl active-press"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}

            <hr className="my-3" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">Services</p>

            {[
              { href: "/appointments", label: "Appointments", icon: Calendar },
              { href: "/subscription", label: "Subscription Boxes", icon: ShoppingBag },
              { href: "/stylists", label: "Personal Stylist", icon: User },
              { href: "/style-quiz", label: "Style Quiz", icon: null, emoji: "✨" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 min-h-[48px] px-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl active-press"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon ? <item.icon size={18} className="text-gray-400" /> : <span>{item.emoji}</span>}
                {item.label}
              </Link>
            ))}

            <hr className="my-3" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">Business</p>

            <Link href="/dashboard" className="flex items-center gap-3 min-h-[48px] px-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl active-press" onClick={() => setMobileMenuOpen(false)}>
              <LayoutDashboard size={18} className="text-gray-400" /> Business Dashboard
            </Link>
            <Link href="/tailor" className="flex items-center gap-3 min-h-[48px] px-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl active-press" onClick={() => setMobileMenuOpen(false)}>
              <Scissors size={18} className="text-gray-400" /> Tailor Panel
            </Link>

            {/* Extra bottom padding for bottom nav */}
            <div className="h-20" />
          </div>
        </div>
      )}
    </header>
  );
}
