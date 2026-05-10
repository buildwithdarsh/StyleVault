"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, Share2, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Check, Ruler, Camera } from "lucide-react";
import { products, reviews, boutiques } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id) || products[0];
  const boutique = boutiques.find((b) => b.id === product.boutiqueId);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.occasion.some((o) => product.occasion.includes(o))).slice(0, 4);

  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "size">("details");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const handleAddToCart = async () => {
    await actionDelay();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!loaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <Skeleton className="w-full h-[500px] rounded-2xl" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-20 h-20 rounded-xl" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={14} />
        <Link href="/catalog" className="hover:text-primary">Catalog</Link>
        <ChevronRight size={14} />
        <Link href={`/catalog?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 animate-fade-in">
        {/* Images */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={800}
              height={1000}
              className="w-full h-[320px] sm:h-[400px] md:h-[500px] object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 min-h-[44px] rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-white">
              <Camera size={16} /> AR Try-On
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImage === i ? "border-primary" : "border-transparent"}`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <Link href={`/boutiques/${product.boutiqueId}`} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mb-2">
            {boutique && <Image src={boutique.image} alt="" width={24} height={24} className="rounded-full" />}
            {product.boutiqueName}
            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-gray-200"} />
              ))}
              <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            {product.isLimitedEdition && <span className="text-xs bg-secondary/10 text-secondary font-semibold px-2 py-0.5 rounded-full">Limited Edition</span>}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                <span className="text-sm bg-success/10 text-success font-semibold px-2 py-0.5 rounded-lg">{product.discount}% off</span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-4">Inclusive of all taxes. Free shipping on orders above ₹999.</p>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Color: <span className="text-gray-900">{selectedColor}</span></h3>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-11 h-11 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === c.name ? "border-primary scale-110" : "border-gray-200"}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <Check size={16} className="text-white drop-shadow-md" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Size</h3>
              <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => s.available && setSelectedSize(s.label)}
                  disabled={!s.available}
                  className={`min-w-[48px] min-h-[44px] px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    !s.available ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through" :
                    selectedSize === s.label ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {!product.sizes.some(s => s.label === selectedSize && s.available) && selectedSize === "" && (
              <p className="text-xs text-gray-500 mt-1">Select a size to continue</p>
            )}

            {showSizeGuide && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Size Guide — {product.category}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="text-gray-500"><th className="text-left py-1">Size</th><th>Bust (in)</th><th>Waist (in)</th><th>Hip (in)</th></tr></thead>
                    <tbody>
                      <tr><td className="py-1 font-medium">XS</td><td className="text-center">32</td><td className="text-center">24</td><td className="text-center">34</td></tr>
                      <tr><td className="py-1 font-medium">S</td><td className="text-center">34</td><td className="text-center">26</td><td className="text-center">36</td></tr>
                      <tr><td className="py-1 font-medium">M</td><td className="text-center">36</td><td className="text-center">28</td><td className="text-center">38</td></tr>
                      <tr><td className="py-1 font-medium">L</td><td className="text-center">38</td><td className="text-center">30</td><td className="text-center">40</td></tr>
                      <tr><td className="py-1 font-medium">XL</td><td className="text-center">40</td><td className="text-center">32</td><td className="text-center">42</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-gray-500">Fit: {product.fitType}</p>
              </div>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 min-h-[44px] hover:bg-gray-50"><Minus size={16} /></button>
              <span className="px-4 py-2.5 text-sm font-medium border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 min-h-[44px] hover:bg-gray-50"><Plus size={16} /></button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 min-h-[44px] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                addedToCart ? "bg-success text-white" : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {addedToCart ? <><Check size={18} /> Added to Cart!</> : <><ShoppingBag size={18} /> Add to Cart</>}
            </button>
            <button onClick={() => setWishlisted(!wishlisted)} className={`p-3 min-h-[44px] min-w-[44px] rounded-xl border transition-all ${wishlisted ? "border-secondary bg-secondary/5" : "border-gray-200 hover:border-primary"}`}>
              <Heart size={20} className={wishlisted ? "fill-secondary text-secondary" : "text-gray-500"} />
            </button>
            <button className="p-3 min-h-[44px] min-w-[44px] rounded-xl border border-gray-200 hover:border-primary transition-colors">
              <Share2 size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Delivery info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: Truck, label: "Free Delivery", sub: product.deliveryEstimate },
              { icon: RotateCcw, label: "Easy Returns", sub: "7-15 day policy" },
              { icon: Shield, label: "Authentic", sub: "100% genuine" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                <Icon size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs font-medium text-gray-900">{label}</p>
                  <p className="text-[10px] text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex gap-6 mb-4">
              {(["details", "reviews", "size"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 min-h-[44px] text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab === "size" ? "Size & Fit" : "Product Details"}
                </button>
              ))}
            </div>

            {activeTab === "details" && (
              <div className="space-y-4 text-sm animate-fade-in">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-gray-500">Fabric:</span> <span className="font-medium">{product.fabric}</span></div>
                  <div><span className="text-gray-500">Composition:</span> <span className="font-medium">{product.fabricComposition}</span></div>
                  <div><span className="text-gray-500">Fit Type:</span> <span className="font-medium">{product.fitType}</span></div>
                  <div><span className="text-gray-500">Weight:</span> <span className="font-medium">{product.weight}</span></div>
                  <div><span className="text-gray-500">SKU:</span> <span className="font-medium">{product.sku}</span></div>
                  <div><span className="text-gray-500">Origin:</span> <span className="font-medium">{product.countryOfOrigin}</span></div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Care Instructions</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                    {product.careInstructions.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 animate-fade-in">
                {productReviews.length === 0 ? (
                  <p className="text-gray-500 text-sm py-8 text-center">No reviews yet for this product. Be the first to review!</p>
                ) : (
                  productReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Image src={review.userAvatar} alt={review.userName} width={36} height={36} className="rounded-full" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{review.userName}</span>
                            {review.isVerified && <span className="text-[10px] bg-success/10 text-success font-medium px-1.5 py-0.5 rounded">Verified</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={12} className={i < review.rating ? "fill-accent text-accent" : "text-gray-200"} />
                            ))}
                            <span className="text-xs text-gray-400 ml-1">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{review.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                      <div className="flex gap-2 mt-2 text-xs text-gray-500">
                        <span>Size: {review.sizePurchased}</span>
                        <span>•</span>
                        <span>Body Type: {review.bodyType}</span>
                      </div>
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {review.images.map((img, i) => (
                            <Image key={i} src={img} alt="" width={80} height={80} className="rounded-lg object-cover" />
                          ))}
                        </div>
                      )}
                      {review.boutiqueResponse && (
                        <div className="mt-3 bg-primary/5 rounded-lg p-3 text-sm">
                          <p className="text-xs font-medium text-primary mb-1">Response from {product.boutiqueName}</p>
                          <p className="text-gray-600">{review.boutiqueResponse}</p>
                        </div>
                      )}
                      <button className="mt-2 min-h-[44px] text-xs text-gray-500 hover:text-primary">Helpful ({review.helpfulCount})</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "size" && (
              <div className="animate-fade-in text-sm space-y-4">
                <p className="text-gray-600">This garment is a <strong>{product.fitType}</strong>. We recommend ordering your usual size.</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Regional Size Mapping</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="text-gray-500 border-b"><th className="text-left py-2">India</th><th>US</th><th>UK</th><th>EU</th></tr></thead>
                      <tbody>
                        <tr><td className="py-1.5">XS</td><td className="text-center">0-2</td><td className="text-center">4-6</td><td className="text-center">32-34</td></tr>
                        <tr><td className="py-1.5">S</td><td className="text-center">4-6</td><td className="text-center">8-10</td><td className="text-center">36-38</td></tr>
                        <tr><td className="py-1.5">M</td><td className="text-center">8-10</td><td className="text-center">12-14</td><td className="text-center">40-42</td></tr>
                        <tr><td className="py-1.5">L</td><td className="text-center">12-14</td><td className="text-center">16-18</td><td className="text-center">44-46</td></tr>
                        <tr><td className="py-1.5">XL</td><td className="text-center">16-18</td><td className="text-center">20-22</td><td className="text-center">48-50</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complete the Look / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rp) => (
              <Link key={rp.id} href={`/products/${rp.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="relative overflow-hidden">
                  <Image src={rp.images[0]} alt={rp.name} width={400} height={500} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-primary font-medium">{rp.boutiqueName}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{rp.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(rp.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
