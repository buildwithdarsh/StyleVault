"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/catalog", icon: Search, label: "Browse" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/cart", icon: ShoppingBag, label: "Cart", badge: 3 },
  { href: "/orders", icon: User, label: "Account" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on dashboard/tailor pages
  const hiddenPaths = ["/dashboard", "/tailor", "/static"];
  if (hiddenPaths.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full min-h-[44px] relative transition-colors ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
