"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Star, ShoppingBag, ArrowRight, Pause, X } from "lucide-react";
import { subscriptionPlans } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function SubscriptionPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("premium");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-12">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop"
          alt="Subscription boxes"
          width={1200}
          height={400}
          className="w-full h-56 sm:h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-5 sm:px-8 md:px-12 text-white max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">StyleVault Style Box</h1>
            <p className="text-white/80 mb-4">Get hand-curated outfits delivered to your door every month. Styled by experts, matched to your preferences. Keep what you love, return the rest.</p>
            <div className="flex gap-4 text-sm text-white/70">
              <span>Personal Stylist</span>
              <span>•</span>
              <span>Free Returns</span>
              <span>•</span>
              <span>Skip Anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Take Style Quiz", desc: "Tell us your sizes, colors, styles, budget, and exclusions" },
            { step: "2", title: "Get Styled", desc: "Our stylists curate pieces just for you from 500+ boutiques" },
            { step: "3", title: "Preview & Swap", desc: "See your box before it ships — swap any item you don't love" },
            { step: "4", title: "Keep or Return", desc: "Try everything at home. Only pay for what you keep. Free returns." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">{step}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Choose Your Box</h2>
      <p className="text-gray-500 text-center mb-8">Cancel, pause, or skip anytime — no commitments</p>

      {!loaded ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-96 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all relative ${
                plan.isPopular ? "border-primary shadow-lg scale-105" : selectedPlan === plan.id ? "border-primary" : "border-transparent"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.itemCount} pieces per month</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(plan.price)}</span>
                <span className="text-sm text-gray-500">/{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-success shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 min-h-[44px] rounded-xl font-semibold text-sm transition-colors ${
                  plan.isPopular || selectedPlan === plan.id ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Sample Box Preview */}
      <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Inside a Sample Premium Box</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "Chanderi Silk Saree", price: 8500, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=250&fit=crop" },
            { name: "Block Print Kurta", price: 2200, img: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=200&h=250&fit=crop" },
            { name: "Statement Earrings", price: 1200, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=250&fit=crop" },
            { name: "Palazzo Pants", price: 1800, img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=200&h=250&fit=crop" },
            { name: "Embroidered Clutch", price: 1500, img: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=200&h=250&fit=crop" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <Image src={item.img} alt={item.name} width={200} height={250} className="w-full h-40 object-cover rounded-xl mb-2" />
              <p className="text-xs font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">{formatPrice(item.price)}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">Total retail value: ₹15,200 — Your price with Premium: <strong className="text-primary">₹4,999</strong></p>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            { q: "Can I skip a month?", a: "Yes! You can pause or skip any month up to 5 days before your next box ships." },
            { q: "What if I don't like anything?", a: "Return everything for free. You'll only be charged the subscription fee, which rolls over as credit." },
            { q: "How are items selected?", a: "Our certified stylists handpick items based on your style quiz, past feedback, and current trends." },
            { q: "Can I request specific items?", a: "Absolutely! Leave notes for your stylist about upcoming events, preferences, or specific pieces you've been eyeing." },
          ].map(({ q, a }) => (
            <details key={q} className="bg-white rounded-xl shadow-sm cursor-pointer group">
              <summary className="font-medium text-gray-900 text-sm list-none flex items-center justify-between p-4 min-h-[48px]">
                {q}
                <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" size={16} />
              </summary>
              <p className="text-sm text-gray-600 px-4 pb-4">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronDown(props: { className: string; size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}><path d="m6 9 6 6 6-6"/></svg>
  );
}
