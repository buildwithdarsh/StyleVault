"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Star, Heart, ShoppingBag, ChevronRight, Sparkles,
  Clock, TrendingUp, Zap, Crown, Scissors, Eye
} from "lucide-react";
import { products, boutiques, occasions, styleCategories, collections } from "@/lib/mock-data";
import { pageLoadDelay, lazyLoadDelay, slowResponseDelay } from "@/lib/delay";
import { ProductCardSkeleton, BoutiqueSkeleton, Skeleton } from "@/components/ui/Skeleton";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="relative overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={500}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={18} className={wishlisted ? "fill-secondary text-secondary" : "text-gray-500"} />
        </button>
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg">NEW</span>
        )}
        {product.isLimitedEdition && (
          <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-lg">LIMITED</span>
        )}
        {product.discount > 20 && (
          <span className="absolute bottom-3 left-3 bg-error text-white text-[10px] font-bold px-2 py-1 rounded-lg">{product.discount}% OFF</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all">
          <button className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
      <Link href={`/products/${product.id}`} className="block p-4">
        <p className="text-xs text-primary font-medium mb-1">{product.boutiqueName}</p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.fabric} • {product.occasion[0]}</p>
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
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [boutiquesLoaded, setBoutiquesLoaded] = useState(false);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 5, minutes: 42, seconds: 18 });

  useEffect(() => {
    pageLoadDelay().then(() => {
      setHeroLoaded(true);
      lazyLoadDelay().then(() => setProductsLoaded(true));
    });
    slowResponseDelay().then(() => setBoutiquesLoaded(true));
    lazyLoadDelay().then(() => setCollectionsLoaded(true));

    const timer = setInterval(() => {
      setFlashSaleTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trendingProducts = products.filter((p) => p.isTrending);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-purple-900 overflow-hidden">
        {!heroLoaded ? (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Skeleton dark className="h-10 w-3/4" />
                <Skeleton dark className="h-6 w-full" />
                <Skeleton dark className="h-6 w-2/3" />
                <Skeleton dark className="h-12 w-40" />
              </div>
              <Skeleton dark className="h-80 w-full rounded-2xl" />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="text-white space-y-6 col-span-full md:col-span-1">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm">
                  <Sparkles size={14} /> New: Spring/Summer 2026 Collections Live
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Discover India&apos;s Curated <span className="text-accent">Boutique</span> Fashion
                </h1>
                <p className="text-lg text-white/80 max-w-lg">
                  From handwoven silk sarees to custom bridal lehengas — 500+ curated boutiques, one platform. Shop, customize, and get styled.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/catalog" className="bg-white text-primary font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                    Explore Collections <ArrowRight size={18} />
                  </Link>
                  <Link href="/custom-tailoring" className="border-2 border-white/30 text-white font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Scissors size={18} /> Custom Tailoring
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70 pt-2">
                  <span className="flex items-center gap-1"><Star size={14} className="text-accent" /> 4.8 App Rating</span>
                  <span>500+ Boutiques</span>
                  <span>50+ Cities</span>
                </div>
              </div>
              <div className="relative hidden md:block md:col-span-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop" alt="Bridal lehenga" width={400} height={300} className="rounded-2xl shadow-2xl" />
                    <Image src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=200&fit=crop" alt="Ethnic wear" width={400} height={200} className="rounded-2xl shadow-2xl" />
                  </div>
                  <div className="space-y-3 pt-8">
                    <Image src="https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=200&fit=crop" alt="Party wear" width={400} height={200} className="rounded-2xl shadow-2xl" />
                    <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop" alt="Western fashion" width={400} height={300} className="rounded-2xl shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-gradient-to-r from-secondary to-pink-600 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <Zap size={28} className="text-accent" />
            <div>
              <h3 className="font-bold text-lg">Holi Flash Sale — Up to 50% Off!</h3>
              <p className="text-sm text-white/80">Ethnic wear, festive collections & more</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[
                { val: flashSaleTime.hours, label: "HRS" },
                { val: flashSaleTime.minutes, label: "MIN" },
                { val: flashSaleTime.seconds, label: "SEC" },
              ].map((t) => (
                <div key={t.label} className="bg-white/20 backdrop-blur rounded-lg px-2 sm:px-3 py-2 text-center min-w-[44px] sm:min-w-[52px]">
                  <div className="text-base sm:text-xl font-bold">{String(t.val).padStart(2, "0")}</div>
                  <div className="text-[10px] text-white/70">{t.label}</div>
                </div>
              ))}
            </div>
            <Link href="/catalog?sale=true" className="bg-white text-secondary font-semibold px-5 py-2.5 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors text-sm whitespace-nowrap flex items-center">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Occasion</h2>
            <p className="text-sm text-gray-500 mt-1">Find the perfect outfit for every event</p>
          </div>
          <Link href="/catalog" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {occasions.slice(0, 8).map((occ, i) => (
            <Link
              key={occ.id}
              href={`/catalog?occasion=${occ.id}`}
              className="group relative rounded-2xl overflow-hidden h-36 sm:h-48 md:h-56 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image src={occ.image} alt={occ.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{occ.name}</h3>
                <p className="text-xs text-white/70">{occ.productCount.toLocaleString()} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              <p className="text-sm text-gray-500 mt-0.5">What everyone is loving this week</p>
            </div>
          </div>
          <Link href="/catalog?sort=trending" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        {!productsLoaded ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Browse by Style */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse by Style</h2>
        <p className="text-sm text-gray-500 mb-6">Find your aesthetic</p>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {styleCategories.map((style, i) => (
            <Link
              key={style.id}
              href={`/catalog?style=${style.id}`}
              className="group text-center animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 border-3 border-transparent group-hover:border-primary transition-all">
                <Image src={style.image} alt={style.name} fill className="object-cover" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{style.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent" size={24} />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fresh drops from your favorite boutiques</p>
              </div>
            </div>
            <Link href="/catalog?sort=newest" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          {!productsLoaded ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Tailoring CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&h=500&fit=crop"
            alt="Custom tailoring workshop"
            width={1200}
            height={500}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="relative py-10 sm:py-14 md:py-16">
            <div className="max-w-lg px-5 sm:px-8 md:px-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-medium mb-4">
                <Scissors size={12} /> Made to Measure
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Get It Custom-Made, Just for You</h2>
              <p className="text-white/80 mb-6 text-sm md:text-base">
                Share your measurements, pick your fabric, choose your design — and our master tailors will bring your vision to life. Track every stitch in real-time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/custom-tailoring" className="bg-white text-primary font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
                  Start Customizing <ArrowRight size={16} />
                </Link>
                <Link href="/appointments" className="border-2 border-white/30 text-white font-medium px-6 py-3 min-h-[44px] rounded-xl hover:bg-white/10 transition-colors text-sm flex items-center">
                  Book Measurement
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-white/70">
                <span>45+ Day Artisan Work</span>
                <span>100+ Master Tailors</span>
                <span>95% First-Fit Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Boutiques */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Boutiques</h2>
              <p className="text-sm text-gray-500 mt-1">Handpicked stores curated for you</p>
            </div>
            <Link href="/boutiques" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          {!boutiquesLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <BoutiqueSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {boutiques.slice(0, 3).map((boutique, i) => (
                <Link
                  key={boutique.id}
                  href={`/boutiques/${boutique.id}`}
                  className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image src={boutique.coverImage} alt={boutique.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {boutique.isPremium && (
                      <span className="absolute top-3 right-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        <Crown size={10} /> Premium
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Image src={boutique.image} alt={boutique.name} width={48} height={48} className="rounded-full border-2 border-white shadow-sm" />
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                          {boutique.name}
                          {boutique.isVerified && (
                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          )}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{boutique.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{boutique.tagline}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-accent text-accent" />
                        <span className="font-medium text-gray-700">{boutique.rating}</span>
                        <span>({boutique.reviewCount})</span>
                      </div>
                      <span>{boutique.productCount} products</span>
                      <span>{boutique.priceRange}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Collections</h2>
            <p className="text-sm text-gray-500 mt-1">Curated seasonal drops from top boutiques</p>
          </div>
        </div>
        {!collectionsLoaded ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="w-full h-64" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {collections.filter((c) => c.isLive).map((collection, i) => (
              <Link
                key={collection.id}
                href={`/catalog?collection=${collection.id}`}
                className="group relative rounded-2xl overflow-hidden h-64 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image src={collection.image} alt={collection.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs text-white/70 mb-1">{collection.boutiqueName}</p>
                  <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{collection.description}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-accent">
                    Explore {collection.productCount} pieces <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Style Inspiration / Lookbook Feed */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Style Inspiration</h2>
              <p className="text-sm text-gray-500 mt-1">Curated looks from stylists and real customers</p>
            </div>
            <Link href="/style-quiz" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              Take Style Quiz <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop", label: "Bridal Elegance", by: "Rhea Malhotra" },
              { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop", label: "Boho Beach Vibes", by: "Nandini Iyer" },
              { img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop", label: "Office Power Look", by: "Karan Oberoi" },
              { img: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=500&fit=crop", label: "Sangeet Sparkle", by: "Rhea Malhotra" },
            ].map((look, i) => (
              <Link key={i} href={`/catalog?style=${encodeURIComponent(look.label)}`} className="group relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72 block animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <Image src={look.img} alt={look.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-semibold">{look.label}</p>
                  <p className="text-xs text-white/70">Styled by {look.by}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <Heart size={14} className="text-white" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explore All Products</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked from India&apos;s finest boutiques</p>
          </div>
          <Link href="/catalog" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-primary/5 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[
              { icon: Scissors, title: "Custom Tailoring", desc: "Made to your measurements" },
              { icon: Eye, title: "AR Virtual Try-On", desc: "See before you buy" },
              { icon: Clock, title: "Express Delivery", desc: "Same-day in metro cities" },
              { icon: Crown, title: "Authentic Boutiques", desc: "500+ verified stores" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl px-5 sm:px-8 md:px-16 py-10 sm:py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay in Style</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Get exclusive early access to new collections, flash sales, and styling tips from top boutiques.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 min-h-[44px] rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button type="submit" className="bg-accent text-gray-900 font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-yellow-400 transition-colors text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
