"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CreditCard, Truck, Shield, Check, ChevronRight, Plus } from "lucide-react";
import { cartItems } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

const savedAddresses = [
  { id: "a1", name: "Home", address: "42, Whitefield Road, Bengaluru, Karnataka - 560066", phone: "+91 98765 43210", isDefault: true },
  { id: "a2", name: "Office", address: "Floor 12, Prestige Tech Park, Outer Ring Road, Bengaluru - 560103", phone: "+91 98765 43210", isDefault: false },
];

const paymentMethods = [
  { id: "upi", name: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: "📱" },
  { id: "card", name: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay", icon: "💳" },
  { id: "netbanking", name: "Net Banking", desc: "All major banks", icon: "🏦" },
  { id: "cod", name: "Cash on Delivery", desc: "Pay when you receive (+₹49 COD fee)", icon: "💵" },
  { id: "emi", name: "EMI", desc: "No-cost EMI available on orders above ₹3,000", icon: "📅" },
  { id: "wallet", name: "StyleVault Wallet", desc: "Balance: ₹500", icon: "👛" },
];

const deliveryOptions = [
  { id: "standard", name: "Standard Delivery", days: "3-5 business days", price: 0 },
  { id: "express", name: "Express Delivery", days: "1-2 business days", price: 149 },
  { id: "sameday", name: "Same-Day (Metro Only)", days: "Today by 9 PM", price: 299 },
  { id: "pickup", name: "Store Pickup", days: "Ready in 2 hours", price: 0 },
];

export default function CheckoutPage() {
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState("a1");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const deliveryFee = deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
  const giftFee = giftWrap ? 99 : 0;
  const codFee = selectedPayment === "cod" ? 49 : 0;
  const total = subtotal + deliveryFee + giftFee + codFee;

  const handlePlaceOrder = async () => {
    await actionDelay();
    await actionDelay();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-success" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2">Order #SV-2026-78560</p>
        <p className="text-gray-500 mb-6">You&apos;ll receive a confirmation via email, SMS, and WhatsApp.</p>
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Total:</span> <span className="font-bold">{formatPrice(total)}</span></div>
            <div><span className="text-gray-500">Payment:</span> <span className="font-medium">{paymentMethods.find((p) => p.id === selectedPayment)?.name || "UPI"}</span></div>
            <div><span className="text-gray-500">Delivery:</span> <span className="font-medium">{deliveryOptions.find((d) => d.id === selectedDelivery)?.days}</span></div>
            <div><span className="text-gray-500">Items:</span> <span className="font-medium">{cartItems.length} products</span></div>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/orders" className="bg-primary text-white font-semibold px-6 py-3 rounded-xl">Track Order</Link>
          <Link href="/" className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Address */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={18} /> Delivery Address</h2>
            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${selectedAddress === addr.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${selectedAddress === addr.id ? "border-primary" : "border-gray-300"}`}>
                    {selectedAddress === addr.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{addr.name} {addr.isDefault && <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1">Default</span>}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{addr.address}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                  </div>
                </button>
              ))}
              <div><button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline min-h-[44px] py-2"><Plus size={14} /> Add New Address</button></div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Truck size={18} /> Delivery Option</h2>
            <div className="space-y-2">
              {deliveryOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDelivery(opt.id)}
                  className={`w-full flex items-center justify-between p-3 min-h-[48px] rounded-xl border-2 transition-all ${selectedDelivery === opt.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedDelivery === opt.id ? "border-primary" : "border-gray-300"}`}>
                      {selectedDelivery === opt.id && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{opt.name}</p>
                      <p className="text-xs text-gray-500">{opt.days}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${opt.price === 0 ? "text-success" : "text-gray-900"}`}>{opt.price === 0 ? "FREE" : formatPrice(opt.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><CreditCard size={18} /> Payment Method</h2>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`flex items-center gap-3 p-3 min-h-[56px] rounded-xl border-2 text-left transition-all ${selectedPayment === pm.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                >
                  <span className="text-xl">{pm.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pm.name}</p>
                    <p className="text-[10px] text-gray-500">{pm.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="w-5 h-5 text-primary rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Gift Wrapping (+₹99)</p>
                <p className="text-xs text-gray-500">Beautiful gift packaging with personalized note</p>
              </div>
            </label>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Order Notes (optional)</label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Any special instructions for the boutique..."
                className="w-full px-3 py-2 min-h-[44px] border border-gray-200 rounded-lg text-base h-20 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <Image src={item.product.images[0]} alt="" width={56} height={72} className="w-14 h-18 sm:w-12 sm:h-15 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-gray-500">{item.selectedSize} • {item.selectedColor} × {item.quantity}</p>
                    <p className="text-xs font-bold mt-0.5">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-3" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className={deliveryFee === 0 ? "text-success" : ""}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span></div>
              {giftWrap && <div className="flex justify-between"><span className="text-gray-500">Gift Wrap</span><span>{formatPrice(giftFee)}</span></div>}
              {codFee > 0 && <div className="flex justify-between"><span className="text-gray-500">COD Fee</span><span>{formatPrice(codFee)}</span></div>}
              <hr />
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={!selectedPayment}
              className={`w-full mt-4 py-3 min-h-[48px] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                selectedPayment ? "bg-primary text-white hover:bg-primary-dark" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Shield size={16} /> Place Order — {formatPrice(total)}
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <Shield size={10} /> 100% Secure Payment • SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
