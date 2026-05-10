"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Scissors, Clock, Calendar, DollarSign, AlertTriangle, Check, ChevronRight, Camera, Upload, MessageSquare, TrendingUp } from "lucide-react";
import { tailorOrders } from "@/lib/mock-data";
import { pageLoadDelay, lazyLoadDelay } from "@/lib/delay";
import { Skeleton, StatCardSkeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

const stages = ["Fabric Sourced", "Cutting", "Stitching", "Embellishment", "Trial Ready", "Finishing"];

export default function TailorPage() {
  const [loaded, setLoaded] = useState(false);
  const [earningsLoaded, setEarningsLoaded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "calendar" | "earnings">("queue");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
    lazyLoadDelay().then(() => setEarningsLoaded(true));
  }, []);

  const totalEarnings = tailorOrders.reduce((s, o) => s + o.earnings, 0);
  const completedOrders = 12;
  const pendingPayout = 23000;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tailor Panel</h1>
          <p className="text-sm text-gray-500">Masterji Ramesh Kumar — Bridal, Formal, Embroidery Specialist</p>
        </div>
        <div className="flex items-center gap-3">
          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="" width={40} height={40} className="rounded-full" />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">4.8 ★ Rating</p>
            <p className="text-xs text-gray-500">156 orders completed</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
        {[
          { key: "queue" as const, label: "Order Queue", icon: Scissors },
          { key: "calendar" as const, label: "Calendar", icon: Calendar },
          { key: "earnings" as const, label: "Earnings", icon: DollarSign },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)} className={`flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all ${activeTab === key ? "bg-white text-primary shadow-sm" : "text-gray-500"}`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {!loaded ? (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Orders", value: tailorOrders.filter((o) => o.status === "In Progress").length.toString(), color: "text-primary" },
            { label: "Due This Week", value: "2", color: "text-error" },
            { label: "This Month Earnings", value: formatPrice(totalEarnings), color: "text-success" },
            { label: "Pending Payout", value: formatPrice(pendingPayout), color: "text-accent" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">{label}</p>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "queue" && (
        <div className="space-y-4 animate-fade-in">
          {tailorOrders.map((order, i) => (
            <div key={order.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in ${order.priority === "urgent" ? "border-l-4 border-error" : order.priority === "high" ? "border-l-4 border-accent" : ""}`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="p-5 cursor-pointer" onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{order.garmentType}</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${
                          order.priority === "urgent" ? "bg-error/10 text-error" : order.priority === "high" ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-500"
                        }`}>{order.priority}</span>
                      </div>
                      <p className="text-xs text-gray-500">{order.orderNumber} • {order.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">{order.currentStage}</span>
                    <p className="text-xs text-gray-500 mt-1">Due: {order.dueDate}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-1 mt-4">
                  {stages.map((stage, si) => {
                    const currentIdx = stages.indexOf(order.currentStage);
                    const isDone = si < currentIdx;
                    const isCurrent = si === currentIdx;
                    return (
                      <div key={stage} className="flex items-center flex-1">
                        <div className={`h-1.5 flex-1 rounded-full ${isDone ? "bg-success" : isCurrent ? "bg-primary" : "bg-gray-200"}`} />
                      </div>
                    );
                  })}
                </div>
                <div className="hidden sm:flex justify-between mt-1 text-[9px] text-gray-400">
                  {stages.map((s) => <span key={s} className="truncate">{s}</span>)}
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="px-5 pb-5 border-t border-gray-100 animate-fade-in">
                  <div className="grid md:grid-cols-3 gap-6 pt-4">
                    {/* Measurements */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Measurements</h4>
                      <div className="space-y-1.5">
                        {order.measurements.map((m) => (
                          <div key={m.label} className="flex justify-between text-xs">
                            <span className="text-gray-500">{m.label}</span>
                            <span className="font-medium text-gray-900">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Specs */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Design Specs</h4>
                      <p className="text-xs text-gray-600">{order.designSpecs}</p>
                      <div className="mt-2 text-xs">
                        <span className="text-gray-500">Fabric: </span>
                        <span className="font-medium">{order.fabricAllocated}</span>
                      </div>
                      <div className="text-xs mt-1">
                        <span className="text-gray-500">Est. Hours: </span>
                        <span className="font-medium">{order.estimatedHours}h</span>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full bg-primary text-white text-xs font-medium py-3 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5">
                        <Check size={14} /> Update Stage
                      </button>
                      <button className="w-full bg-white border border-gray-200 text-xs font-medium py-3 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5 hover:border-primary">
                        <Camera size={14} /> Upload Progress Photo
                      </button>
                      <button className="w-full bg-white border border-gray-200 text-xs font-medium py-3 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5 hover:border-primary">
                        <MessageSquare size={14} /> Message Customer
                      </button>
                      {order.priority === "urgent" && (
                        <button className="w-full bg-error/10 text-error text-xs font-medium py-3 min-h-[44px] rounded-lg flex items-center justify-center gap-1.5">
                          <AlertTriangle size={14} /> Flag Delay
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="animate-fade-in bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">This Week&apos;s Schedule</h2>
          <div className="space-y-3">
            {[
              { day: "Mon, Mar 30", tasks: ["Bridal Lehenga - Stitching (Priya)", "Anarkali Suit - Cutting (Anita)"] },
              { day: "Tue, Mar 31", tasks: ["Jodhpuri Suit - Stitching (Rahul)", "Reception Gown - Embellishment (Kavya)"] },
              { day: "Wed, Apr 1", tasks: ["Bridal Lehenga - Continue stitching", "Silk Blouse - Cutting (Meera)"] },
              { day: "Thu, Apr 2", tasks: ["Trial Fitting - Rahul Mehra (11 AM)", "Jodhpuri Suit - Finishing"] },
              { day: "Fri, Apr 3", tasks: ["Reception Gown - Quality Check", "Bridal Lehenga - Embellishment start"] },
            ].map(({ day, tasks }) => (
              <div key={day} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-28 shrink-0">
                  <p className="text-sm font-medium text-gray-900">{day}</p>
                </div>
                <div className="space-y-1">
                  {tasks.map((t, i) => (
                    <p key={i} className="text-xs text-gray-600">• {t}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "earnings" && (
        <div className="animate-fade-in space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-success">{formatPrice(totalEarnings)}</p>
              <p className="text-xs text-gray-400 mt-1">From {tailorOrders.length} orders</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">Pending Payout</p>
              <p className="text-2xl font-bold text-accent">{formatPrice(pendingPayout)}</p>
              <p className="text-xs text-gray-400 mt-1">Next payout: Apr 1</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500">Total Earned (FY26)</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(425000)}</p>
              <p className="text-xs text-success mt-1 flex items-center gap-1"><TrendingUp size={10} /> +18% vs last year</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Payout History</h3>
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 border-b"><tr><th className="text-left pb-2">Date</th><th className="text-left pb-2">Orders</th><th className="text-left pb-2">Amount</th><th className="text-left pb-2">Status</th></tr></thead>
              <tbody>
                {[
                  { date: "Mar 15, 2026", orders: 4, amount: 35000, status: "Paid" },
                  { date: "Mar 1, 2026", orders: 3, amount: 28000, status: "Paid" },
                  { date: "Feb 15, 2026", orders: 5, amount: 42000, status: "Paid" },
                  { date: "Feb 1, 2026", orders: 3, amount: 24000, status: "Paid" },
                ].map((p, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-2.5 text-gray-600">{p.date}</td>
                    <td className="py-2.5">{p.orders} orders</td>
                    <td className="py-2.5 font-medium">{formatPrice(p.amount)}</td>
                    <td className="py-2.5"><span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
