"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Calendar, Star, ArrowRight, Sparkles, Crown, Clock } from "lucide-react";
import { bridalCollections, boutiques, products } from "@/lib/mock-data";
import { pageLoadDelay, lazyLoadDelay, slowResponseDelay } from "@/lib/delay";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function BridalPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    pageLoadDelay().then(() => setHeroLoaded(true));
    lazyLoadDelay().then(() => setCollectionsLoaded(true));
    slowResponseDelay().then(() => setProductsLoaded(true));
  }, []);

  const bridalProducts = products.filter((p) => p.occasion.includes("Bridal") || p.occasion.includes("Wedding"));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-pink-900 via-rose-800 to-red-900">
        {!heroLoaded ? (
          <div className="max-w-7xl mx-auto px-4 py-24">
            <Skeleton className="h-12 w-2/3 !bg-white/10 mb-4" />
            <Skeleton className="h-6 w-1/2 !bg-white/10 mb-6" />
            <Skeleton className="h-12 w-40 !bg-white/10" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
                  <Crown size={14} /> Bridal Collection 2026
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Your Dream Bridal <span className="text-rose-300">Trousseau</span> Awaits
                </h1>
                <p className="text-lg text-white/80 max-w-lg mb-6">
                  From mehendi to reception — discover exquisite bridal couture from India&apos;s finest designers. Custom-made, perfectly fitted, delivered on time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/appointments" className="bg-white text-rose-800 font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <Calendar size={18} /> Book Bridal Consultation
                  </Link>
                  <Link href="/custom-tailoring" className="border-2 border-white/30 text-white font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-white/10 transition-colors">
                    Custom Bridal Order
                  </Link>
                </div>
                <div className="flex gap-6 mt-8 text-sm text-white/70">
                  <span>120+ Bridal Designers</span>
                  <span>Trousseau Planning</span>
                  <span>Complimentary Alterations</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="grid grid-cols-2 gap-3">
                  <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop" alt="Bridal" width={400} height={500} className="rounded-2xl shadow-2xl" />
                  <div className="space-y-3 pt-8">
                    <Image src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=250&fit=crop" alt="Mehendi" width={400} height={250} className="rounded-2xl shadow-2xl" />
                    <Image src="https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=250&fit=crop" alt="Reception" width={400} height={250} className="rounded-2xl shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Shop by Event */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop by Wedding Event</h2>
        <p className="text-gray-500 mb-6">Complete your look for every celebration</p>

        {!collectionsLoaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 sm:h-64 md:h-72 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {bridalCollections.map((col, i) => (
              <Link
                key={col.id}
                href={`/catalog?occasion=${col.event.toLowerCase()}`}
                className="group relative rounded-2xl overflow-hidden h-48 sm:h-64 md:h-72 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image src={col.image} alt={col.event} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg font-bold mb-1">{col.event}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 mb-2">{col.description}</p>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{col.priceRange}</span>
                    <span>{col.productCount} designs</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trousseau Planner */}
      <section className="bg-rose-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Trousseau Planner</h2>
              <p className="text-gray-600 mb-6">Plan your complete bridal wardrobe with our smart trousseau planner. Set your budget, select events, and we&apos;ll help you curate the perfect collection.</p>
              <div className="space-y-3 mb-6">
                {[
                  { event: "Mehendi Outfit", budget: "₹8,000 - ₹25,000", status: "Selected" },
                  { event: "Sangeet Outfit", budget: "₹15,000 - ₹50,000", status: "Exploring" },
                  { event: "Wedding Lehenga", budget: "₹50,000 - ₹3,00,000", status: "Consulting" },
                  { event: "Reception Gown", budget: "₹20,000 - ₹1,00,000", status: "Not started" },
                ].map(({ event, budget, status }) => (
                  <div key={event} className="flex items-center justify-between p-3 min-h-[48px] bg-white rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event}</p>
                      <p className="text-xs text-gray-500">{budget}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      status === "Selected" ? "bg-success/10 text-success" :
                      status === "Consulting" ? "bg-primary/10 text-primary" :
                      status === "Exploring" ? "bg-accent/10 text-accent" :
                      "bg-gray-100 text-gray-500"
                    }`}>{status}</span>
                  </div>
                ))}
              </div>
              <Link href="/appointments" className="bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-rose-700 transition-colors flex items-center gap-2 w-fit">
                <Calendar size={18} /> Start Planning
              </Link>
            </div>
            <div className="hidden md:block">
              <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=500&fit=crop" alt="Trousseau" width={600} height={500} className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Bridal Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Bridal Pieces</h2>
        {!productsLoaded ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bridalProducts.concat(products.slice(0, 4 - bridalProducts.length)).slice(0, 4).map((p, i) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative overflow-hidden">
                  <Image src={p.images[0]} alt={p.name} width={400} height={500} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Heart size={16} className="text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-medium">{p.boutiqueName}</p>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold">{formatPrice(p.price)}</span>
                    {p.discount > 0 && <span className="text-xs text-success font-medium">{p.discount}% off</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Real Wedding Gallery */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Real Brides, Real Stories</h2>
          <p className="text-gray-500 mb-6">See how our brides styled their special day</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Sneha & Arjun", event: "Jodhpur Wedding", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop" },
              { name: "Meera & Vikram", event: "South Indian Wedding", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop" },
              { name: "Aisha & Kabir", event: "Nikah Ceremony", img: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=500&fit=crop" },
              { name: "Priya & Dev", event: "Mumbai Reception", img: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=500&fit=crop" },
            ].map((story, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden h-48 sm:h-56 md:h-64 cursor-pointer">
                <Image src={story.img} alt={story.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold text-sm">{story.name}</p>
                  <p className="text-xs text-white/70">{story.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Services */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bridal Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Private Bridal Consultation", desc: "1:1 sessions with top designers in a private setting. Virtual or in-store.", price: "Complimentary" },
            { icon: Sparkles, title: "Custom Bridal Design", desc: "Design your dream outfit from scratch — sketch to stitch, tracked in real-time.", price: "Starting ₹25,000" },
            { icon: Clock, title: "Bridal Timeline Manager", desc: "Set your wedding date and we auto-schedule all fittings, trials, and delivery.", price: "Free with order" },
          ].map(({ icon: Icon, title, desc, price }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-3">{desc}</p>
              <p className="text-sm font-medium text-rose-600">{price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
