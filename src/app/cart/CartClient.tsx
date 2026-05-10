"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, Tag, Truck, Shield, ChevronRight, Gift, CreditCard } from "lucide-react";
import { cartItems as initialCart, products } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

export default function CartPage() {
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState(initialCart);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const discount = cart.reduce((sum, item) => sum + (item.product.mrp - item.product.price) * item.quantity, 0);
  const total = subtotal + shipping - couponDiscount;

  const applyCoupon = async () => {
    await actionDelay();
    if (couponCode.toLowerCase() === "style20") {
      setCouponDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    }
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => prev.map((item, i) => i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  if (!loaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
          </div>
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items yet.</p>
        <Link href="/catalog" className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cart.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <Link href={`/products/${item.product.id}`} className="shrink-0">
                <Image src={item.product.images[0]} alt={item.product.name} width={120} height={150} className="w-24 sm:w-28 h-32 sm:h-36 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-primary font-medium">{item.product.boutiqueName}</p>
                    <Link href={`/products/${item.product.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary line-clamp-1">{item.product.name}</Link>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize} • Color: {item.selectedColor}</p>
                  </div>
                  <button onClick={() => removeItem(i)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-error transition-colors">
                    <X size={22} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(i, -1)} className="px-3 py-2.5 min-h-[44px] hover:bg-gray-50"><Minus size={14} /></button>
                    <span className="px-3 py-2.5 min-h-[44px] text-sm font-medium border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(i, 1)} className="px-3 py-2.5 min-h-[44px] hover:bg-gray-50"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">{formatPrice(item.product.price * item.quantity)}</p>
                    {item.product.discount > 0 && (
                      <p className="text-xs text-gray-400 line-through">{formatPrice(item.product.mrp * item.quantity)}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-success mt-2 flex items-center gap-1"><Truck size={12} /> {item.product.deliveryEstimate}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Tag size={16} /> Apply Coupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 min-h-[44px] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button onClick={applyCoupon} className="px-4 py-2 min-h-[44px] bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                Apply
              </button>
            </div>
            {couponApplied && <p className="text-xs text-success mt-2">Coupon STYLE20 applied! You saved {formatPrice(couponDiscount)}</p>}
            <p className="text-[10px] text-gray-400 mt-2">Try: STYLE20 for 10% off</p>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-success">
                  <span>Coupon (STYLE20)</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={shipping === 0 ? "text-success font-medium" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] text-gray-400">You save {formatPrice(discount + couponDiscount)} on this order</p>
            </div>
            <Link
              href="/checkout"
              className="block w-full mt-4 bg-primary text-white text-center font-semibold py-3 min-h-[44px] rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={18} /> Proceed to Checkout
            </Link>
          </div>

          {/* Trust badges */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {[
              { icon: Shield, text: "100% Secure Payments" },
              { icon: Truck, text: "Free delivery above ₹999" },
              { icon: Gift, text: "Gift wrapping available" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                <Icon size={16} className="text-primary" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
