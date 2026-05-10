"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Calendar, Video, Clock, Check, ArrowRight } from "lucide-react";
import { stylists } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function StylistsPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Personal Styling by Experts</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Book a 1:1 session with a certified fashion stylist. Get personalized outfit recommendations curated from 500+ boutiques — all within your budget.</p>
      </div>

      {/* How it works */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: "📋", title: "Fill Questionnaire", desc: "Tell us about your occasion, budget, preferences, and body type" },
          { icon: "📹", title: "Video Session", desc: "30-60 min video call where your stylist curates looks in real-time" },
          { icon: "🛒", title: "Shop Your Picks", desc: "All recommended items are added to a ready-to-checkout cart" },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <span className="text-3xl mb-3 block">{icon}</span>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Stylists</h2>

      {!loaded ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {stylists.map((stylist, i) => (
            <div key={stylist.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="relative h-40 sm:h-48">
                <Image src={stylist.avatar} alt={stylist.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{stylist.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-accent text-accent" /> {stylist.rating}
                    <span className="text-white/70 ml-1">{stylist.sessionsCompleted} sessions</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{stylist.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {stylist.specialty.map((s) => (
                    <span key={s} className="text-xs bg-primary/5 text-primary font-medium px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(stylist.price)}<span className="text-xs text-gray-500 font-normal">/session</span></span>
                  <div className="flex gap-1">
                    {stylist.availability.slice(0, 4).map((d) => (
                      <span key={d} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{d}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStylist(stylist.id)}
                  className="w-full bg-primary text-white font-semibold py-2.5 min-h-[44px] rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Video size={16} /> Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking modal hint */}
      {selectedStylist && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4" onClick={() => setSelectedStylist(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md animate-slide-up max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Pre-Session Questionnaire</h3>
            <p className="text-sm text-gray-500 mb-4">Help your stylist prepare by filling in a few details:</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">What&apos;s the occasion?</label>
                <input type="text" placeholder="e.g., Beach wedding in Goa, office wardrobe refresh" className="w-full px-3 py-2 min-h-[44px] border border-gray-200 rounded-lg text-base sm:text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Budget range</label>
                <select className="w-full px-3 py-2 min-h-[44px] border border-gray-200 rounded-lg text-base sm:text-sm">
                  <option>Under ₹5,000</option>
                  <option>₹5,000 - ₹15,000</option>
                  <option>₹15,000 - ₹50,000</option>
                  <option>Above ₹50,000</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Any preferences or exclusions?</label>
                <textarea placeholder="e.g., No polyester, prefer earth tones, need size-inclusive options" className="w-full px-3 py-2 min-h-[44px] border border-gray-200 rounded-lg text-base sm:text-sm h-20 resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Session type</label>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 min-h-[44px] border-2 border-primary bg-primary/5 rounded-lg text-sm font-medium text-primary flex items-center justify-center gap-1"><Video size={14} /> Video (30 min)</button>
                  <button className="flex-1 py-2 min-h-[44px] border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center justify-center gap-1"><Clock size={14} /> Video (60 min)</button>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-primary text-white font-semibold py-3 min-h-[48px] rounded-xl hover:bg-primary-dark flex items-center justify-center gap-2">
              <Calendar size={16} /> Select Date & Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
