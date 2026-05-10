"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Trash2, Bell, BellOff, Share2 } from "lucide-react";
import { wishlistItems, membershipTiers, products } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function WishlistPage() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState(wishlistItems);
  const [activeTab, setActiveTab] = useState<"wishlist" | "collections" | "loyalty">("wishlist");
  const [priceAlerts, setPriceAlerts] = useState<Set<string>>(new Set(["p1", "p4"]));

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const toggleAlert = (id: string) => {
    setPriceAlerts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-gray-200">
        {[
          { key: "wishlist" as const, label: "Wishlist", count: items.length },
          { key: "collections" as const, label: "Collections" },
          { key: "loyalty" as const, label: "Loyalty & Membership" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 min-h-[44px] text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {tab.label} {tab.count !== undefined && `(${tab.count})`}
          </button>
        ))}
      </div>

      {activeTab === "wishlist" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"><Share2 size={14} /> Share Wishlist</button>
          </div>

          {!loaded ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
              <Link href="/catalog" className="bg-primary text-white font-semibold px-6 py-3 rounded-xl">Browse Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((product, i) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="relative overflow-hidden">
                    <Image src={product.images[0]} alt={product.name} width={400} height={500} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button onClick={() => setItems(items.filter((p) => p.id !== product.id))} className="absolute top-3 right-3 w-8 h-8 min-h-[44px] min-w-[44px] bg-white/90 rounded-full flex items-center justify-center text-error hover:bg-error hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary font-medium">{product.boutiqueName}</p>
                    <Link href={`/products/${product.id}`} className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-primary">{product.name}</Link>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-base font-bold">{formatPrice(product.price)}</span>
                      {product.discount > 0 && <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-primary text-white text-xs font-medium py-2 min-h-[44px] rounded-lg hover:bg-primary-dark flex items-center justify-center gap-1">
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                      <button
                        onClick={() => toggleAlert(product.id)}
                        className={`p-2 min-h-[44px] min-w-[44px] rounded-lg border transition-colors ${priceAlerts.has(product.id) ? "bg-accent/10 border-accent text-accent" : "border-gray-200 text-gray-400"}`}
                        title="Price drop alert"
                      >
                        {priceAlerts.has(product.id) ? <Bell size={14} /> : <BellOff size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "collections" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Collections</h1>
            <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg">+ Create Collection</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Wedding Ideas", count: 12, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop" },
              { name: "Office Wardrobe", count: 8, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=300&fit=crop" },
              { name: "Gift List", count: 5, image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=300&fit=crop" },
            ].map((col, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{col.name}</h3>
                  <p className="text-xs text-gray-500">{col.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "loyalty" && (
        <div className="animate-fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loyalty & Membership</h1>
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-white/70">Your Loyalty Tier</p>
                  <h3 className="text-2xl font-bold">Gold Member</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">Style Points</p>
                  <h3 className="text-2xl font-bold">4,280</h3>
                </div>
              </div>
              <div className="bg-white/10 rounded-full h-2 mb-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }} />
              </div>
              <p className="text-xs text-white/60">720 points to Platinum tier</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-4">Membership Tiers</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {membershipTiers.map((tier) => (
              <div key={tier.id} className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${tier.id === "gold" ? "border-accent" : "border-transparent"}`}>
                <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center text-white font-bold" style={{ backgroundColor: tier.color }}>
                  {tier.name[0]}
                </div>
                <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                <p className="text-sm text-primary font-bold mt-1">{tier.price === 0 ? "Free" : `₹${tier.price}/yr`}</p>
                <ul className="mt-3 space-y-1.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-success mt-0.5">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  tier.id === "gold" ? "bg-accent/10 text-accent border border-accent" : "bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
                }`}>
                  {tier.id === "gold" ? "Current Plan" : "Upgrade"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Referral Program</h3>
            <p className="text-sm text-gray-600 mb-3">Share your referral code and earn ₹500 credit when your friend makes their first purchase!</p>
            <div className="flex gap-2">
              <input type="text" value="PRIYA500" readOnly className="flex-1 px-4 py-2 min-h-[44px] bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono" />
              <button className="bg-primary text-white text-sm font-medium px-4 py-2 min-h-[44px] rounded-lg">Copy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
