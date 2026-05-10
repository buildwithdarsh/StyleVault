"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, Heart, ShoppingBag, SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";
import { products } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

const categoryFilters = ["All", "Sarees", "Lehengas", "Kurtas", "Gowns", "Jackets", "Saree Gowns"];
const occasionFilters = ["All", "Wedding", "Festive", "Party", "Casual", "Office", "Bridal"];
const fabricFilters = ["All", "Silk", "Cotton", "Georgette", "Velvet", "Crepe", "Lycra"];
const priceRanges = ["All", "Under ₹3,000", "₹3,000 - ₹10,000", "₹10,000 - ₹50,000", "Above ₹50,000"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest", "Popularity", "Rating", "Discount"];

export default function CatalogPage() {
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [fabric, setFabric] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.boutiqueName.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchOcc = occasion === "All" || p.occasion.includes(occasion);
    const matchFab = fabric === "All" || p.fabric.toLowerCase().includes(fabric.toLowerCase());
    let matchPrice = true;
    if (priceRange === "Under ₹3,000") matchPrice = p.price < 3000;
    else if (priceRange === "₹3,000 - ₹10,000") matchPrice = p.price >= 3000 && p.price <= 10000;
    else if (priceRange === "₹10,000 - ₹50,000") matchPrice = p.price >= 10000 && p.price <= 50000;
    else if (priceRange === "Above ₹50,000") matchPrice = p.price > 50000;
    return matchSearch && matchCat && matchOcc && matchFab && matchPrice;
  });

  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "Newest") filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  else if (sortBy === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "Discount") filtered = [...filtered].sort((a, b) => b.discount - a.discount);

  const activeFilters = [category, occasion, fabric, priceRange].filter((f) => f !== "All");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
        <p className="text-gray-500">Browse {products.length}+ handpicked products from India&apos;s finest boutiques</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name, boutique, fabric, occasion..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button onClick={() => { setCategory("All"); setOccasion("All"); setFabric("All"); setPriceRange("All"); }} className="text-xs text-primary hover:underline">Clear all</button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="space-y-1">
                {categoryFilters.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${category === c ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Occasion</h4>
              <div className="space-y-1">
                {occasionFilters.map((o) => (
                  <button key={o} onClick={() => setOccasion(o)} className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${occasion === o ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Fabric</h4>
              <div className="space-y-1">
                {fabricFilters.map((f) => (
                  <button key={f} onClick={() => setFabric(f)} className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${fabric === f ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
              <div className="space-y-1">
                {priceRanges.map((pr) => (
                  <button key={pr} onClick={() => setPriceRange(pr)} className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${priceRange === pr ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                    {pr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                <SlidersHorizontal size={16} /> Filters
              </button>
              <span className="text-sm text-gray-500">{filtered.length} products</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {f}
                  <button onClick={() => {
                    if (categoryFilters.includes(f)) setCategory("All");
                    if (occasionFilters.includes(f)) setOccasion("All");
                    if (fabricFilters.includes(f)) setFabric("All");
                    if (priceRanges.includes(f)) setPriceRange("All");
                  }}><X size={12} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!loaded ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-medium text-gray-400">No products match your filters</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((product, i) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="relative overflow-hidden">
                    <Image src={product.images[0]} alt={product.name} width={400} height={500} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button onClick={() => toggleWishlist(product.id)} className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
                      <Heart size={18} className={wishlist.has(product.id) ? "fill-secondary text-secondary" : "text-gray-500"} />
                    </button>
                    {product.isNew && <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg">NEW</span>}
                    {product.isLimitedEdition && <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-lg">LIMITED</span>}
                    {product.discount > 20 && <span className="absolute bottom-3 left-3 bg-error text-white text-[10px] font-bold px-2 py-1 rounded-lg">{product.discount}% OFF</span>}
                  </div>
                  <Link href={`/products/${product.id}`} className="block p-4">
                    <p className="text-xs text-primary font-medium mb-1">{product.boutiqueName}</p>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{product.fabric} • {product.occasion[0]}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                          <span className="text-xs text-success font-semibold">{product.discount}% off</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={12} className="fill-accent text-accent" />
                      <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviewCount})</span>
                    </div>
                    {/* Color swatches */}
                    <div className="flex gap-1.5 mt-2">
                      {product.colors.slice(0, 4).map((c) => (
                        <div key={c.hex} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} title={c.name} />
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
