"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Truck, Check, Clock, ChevronRight, MapPin, RotateCcw, Star } from "lucide-react";
import { orders } from "@/lib/mock-data";
import { pageLoadDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

const statusIcons: Record<string, typeof Package> = {
  "Order Placed": Clock,
  "Payment Confirmed": Check,
  "Processing": Package,
  "Shipped": Truck,
  "In Transit": Truck,
  "Out for Delivery": MapPin,
  "Delivered": Check,
};

export default function OrdersPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-40 mb-6" />
        {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-2xl mb-4" />)}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order, i) => {
          const isExpanded = selectedOrder === order.id;
          const StatusIcon = statusIcons[order.status] || Package;
          const isDelivered = order.status === "Delivered";

          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isDelivered ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Placed on {order.date} • {formatPrice(order.total)}</p>
                  </div>
                  <div className="flex gap-2">
                    {isDelivered && (
                      <button className="text-xs font-medium text-primary bg-primary/5 px-3 py-2 min-h-[44px] rounded-lg hover:bg-primary/10 flex items-center gap-1">
                        <RotateCcw size={12} /> Return/Exchange
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                      className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-2 min-h-[44px] rounded-lg hover:bg-gray-200"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Items preview */}
              <div className="p-5">
                <div className="flex gap-4 overflow-x-auto">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex gap-3 shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} width={60} height={80} className="w-14 h-18 sm:w-15 sm:h-20 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">{item.size} • {item.color} • Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold mt-1">{formatPrice(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking timeline */}
              {!isDelivered && (
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-1 overflow-x-auto snap-x">
                    {order.statusHistory.map((sh, si) => {
                      const Icon = statusIcons[sh.status] || Package;
                      const isLast = si === order.statusHistory.length - 1;
                      return (
                        <div key={si} className="flex items-center shrink-0">
                          <div className={`flex items-center gap-1.5 px-2 py-1.5 min-h-[36px] sm:min-h-[44px] rounded-lg text-xs ${isLast ? "bg-primary/10 text-primary font-medium" : "text-gray-500"}`}>
                            <Icon size={14} />
                            <span>{sh.status}</span>
                          </div>
                          {si < order.statusHistory.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Estimated delivery: <strong className="text-gray-900">{order.estimatedDelivery}</strong></p>
                  {order.trackingId && <p className="text-xs text-gray-500">Tracking ID: {order.trackingId}</p>}
                </div>
              )}

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-100 mt-2 animate-fade-in">
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Payment</h4>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                      <div className="text-gray-600 space-y-1 text-xs">
                        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span></div>
                        <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>
                        <div className="flex justify-between font-bold text-gray-900 pt-1 border-t"><span>Total</span><span>{formatPrice(order.total)}</span></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                      <div className="space-y-2">
                        {order.statusHistory.map((sh, si) => (
                          <div key={si} className="flex items-start gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                            <div>
                              <p className="font-medium text-gray-700">{sh.status}</p>
                              <p className="text-gray-400">{sh.date} at {sh.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {isDelivered && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700 font-medium mb-2 flex items-center gap-1"><Star size={14} className="text-accent" /> Rate your experience</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button key={i} className="p-1 min-h-[44px] min-w-[44px]"><Star size={24} className="text-gray-200 hover:text-accent hover:fill-accent transition-colors" /></button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
