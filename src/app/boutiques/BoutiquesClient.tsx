"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, MapPin, Crown, Filter, ChevronDown, X } from "lucide-react";
import { boutiques } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { BoutiqueSkeleton } from "@/components/ui/Skeleton";

const cities = ["All Cities", "Mumbai", "Delhi", "Bengaluru", "Jaipur", "Chennai"];
const specialtyFilters = ["All", "Bridal", "Sarees", "Streetwear", "Sustainable", "Designer", "Custom Tailoring"];

export default function BoutiquesPage() {
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const filtered = boutiques.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.tagline.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === "All Cities" || b.city === selectedCity;
    const matchSpec = selectedSpecialty === "All" || b.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase())) || b.categories.some((c) => c.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    return matchSearch && matchCity && matchSpec;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Boutiques</h1>
        <p className="text-gray-500">Explore 500+ verified boutiques across India — from bridal couture houses to sustainable fashion studios</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search boutiques by name, style, or specialty..."
            className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-white border border-gray-200 rounded-xl text-sm hover:border-primary transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Specialty filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {specialtyFilters.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-all ${selectedSpecialty === spec ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"}`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} boutiques found</p>

      {!loaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <BoutiqueSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((boutique, i) => (
            <Link
              key={boutique.id}
              href={`/boutiques/${boutique.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-36 sm:h-44 overflow-hidden">
                <Image src={boutique.coverImage} alt={boutique.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {boutique.isPremium && (
                  <span className="absolute top-3 right-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <Crown size={10} /> Premium
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <Image src={boutique.image} alt={boutique.name} width={52} height={52} className="rounded-full border-2 border-white shadow-md -mt-10 relative z-10" />
                  <div className="pt-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                      {boutique.name}
                      {boutique.isVerified && (
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                      )}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} /> {boutique.location}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{boutique.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {boutique.specialties.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-primary/5 text-primary text-[11px] font-medium rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-accent text-accent" />
                    <span className="font-semibold text-gray-700">{boutique.rating}</span>
                    <span>({boutique.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span>{boutique.productCount} products</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
