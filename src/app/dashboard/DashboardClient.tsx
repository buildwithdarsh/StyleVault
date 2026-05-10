"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Package, AlertTriangle, BarChart3, Star, Search, Filter, ChevronDown, ArrowRight, Download, Eye, RotateCcw, Bell, Clock, Scissors, UserCheck } from "lucide-react";
import { dashboardStats, revenueData, topProducts, customers, products, orders, tailorOrders } from "@/lib/mock-data";
import { pageLoadDelay, lazyLoadDelay, slowResponseDelay } from "@/lib/delay";
import { Skeleton, StatCardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}
function formatCompact(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

type Tab = "overview" | "orders" | "inventory" | "customers" | "analytics" | "tailors";

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [customersLoaded, setCustomersLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
    lazyLoadDelay().then(() => setAnalyticsLoaded(true));
    slowResponseDelay().then(() => setCustomersLoaded(true));
  }, []);

  const stats = dashboardStats;

  const tabs: { key: Tab; label: string; icon: typeof BarChart3 }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "orders", label: "Orders", icon: ShoppingBag },
    { key: "inventory", label: "Inventory", icon: Package },
    { key: "customers", label: "Customers", icon: Users },
    { key: "tailors", label: "Tailors", icon: Scissors },
    { key: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-sm text-gray-500">Ananya Couture — Jaipur, Rajasthan</p>
        </div>
        <div className="flex gap-2">
          <select className="min-h-[44px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"><option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>This quarter</option></select>
          <button className="min-h-[44px] flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-primary"><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto scroll-snap-x">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === key ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          {/* Stat Cards */}
          {!loaded ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Revenue", value: formatCompact(stats.totalRevenue), change: stats.revenueChange, icon: DollarSign, color: "text-primary" },
                { label: "Total Orders", value: stats.totalOrders.toString(), change: stats.ordersChange, icon: ShoppingBag, color: "text-secondary" },
                { label: "Avg Order Value", value: formatPrice(stats.avgOrderValue), change: stats.aovChange, icon: TrendingUp, color: "text-accent" },
                { label: "New Customers", value: stats.newCustomers.toString(), change: stats.customersChange, icon: Users, color: "text-success" },
              ].map(({ label, value, change, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500">{label}</span>
                    <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}><Icon size={16} /></div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {change >= 0 ? <TrendingUp size={12} className="text-success" /> : <TrendingDown size={12} className="text-error" />}
                    <span className={`text-xs font-medium ${change >= 0 ? "text-success" : "text-error"}`}>{change >= 0 ? "+" : ""}{change}%</span>
                    <span className="text-xs text-gray-400">vs last period</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Revenue Chart (simplified bar chart) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary rounded-sm" /> Revenue</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary/20 rounded-sm" /> Orders</span>
              </div>
            </div>
            {!analyticsLoaded ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <div className="flex items-end gap-4 h-48 min-w-[480px]">
                {revenueData.map((d) => {
                  const maxRev = Math.max(...revenueData.map((r) => r.revenue));
                  const height = (d.revenue / maxRev) * 100;
                  return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{formatCompact(d.revenue)}</span>
                      <div className="w-full bg-primary/10 rounded-t-lg relative" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 bg-primary rounded-t-lg opacity-80" />
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-500 mt-1">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.units} units sold</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatCompact(p.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Conversion Rate", value: `${stats.conversionRate}%`, status: "good" },
                  { label: "Return Rate", value: `${stats.returnRate}%`, status: stats.returnRate < 5 ? "good" : "warning" },
                  { label: "Active Products", value: stats.activeProducts.toString(), status: "neutral" },
                  { label: "Low Stock Items", value: stats.lowStockItems.toString(), status: stats.lowStockItems > 20 ? "warning" : "good" },
                ].map(({ label, value, status }) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-lg font-bold ${status === "good" ? "text-success" : status === "warning" ? "text-accent" : "text-gray-900"}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-accent/10 rounded-xl flex items-center gap-2">
                <AlertTriangle size={16} className="text-accent shrink-0" />
                <p className="text-xs text-gray-700">{stats.lowStockItems} products are running low on stock. <button className="text-primary font-medium">Review now →</button></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="flex gap-2 flex-wrap">
              {["All", "New", "Processing", "Shipped", "Delivered", "Custom"].map((s) => (
                <button key={s} className={`px-3 py-2 min-h-[36px] sm:min-h-[44px] rounded-lg text-xs font-medium ${s === "All" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
              ))}
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Search orders..." className="pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-48" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr><th className="px-4 py-3 text-left">Order</th><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">Items</th><th className="px-4 py-3 text-left">Total</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3"></th></tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-gray-600">{order.deliveryAddress.split(",")[0]}</td>
                      <td className="px-4 py-3 text-gray-600">{order.items.length} item(s)</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>{order.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{order.date}</td>
                      <td className="px-4 py-3"><button className="text-primary text-xs font-medium hover:underline">View</button></td>
                    </tr>
                  ))}
                  {/* Additional mock orders */}
                  {[
                    { num: "SV-2026-78520", customer: "Fatima Sheikh", items: 3, total: 18500, status: "Processing", date: "2026-03-26" },
                    { num: "SV-2026-78535", customer: "Arjun Reddy", items: 1, total: 3200, status: "New", date: "2026-03-27" },
                    { num: "SV-CUS-2026-341", customer: "Priya Sharma", items: 1, total: 175000, status: "Custom - Stitching", date: "2026-02-15" },
                  ].map((o) => (
                    <tr key={o.num} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{o.num}</td>
                      <td className="px-4 py-3 text-gray-600">{o.customer}</td>
                      <td className="px-4 py-3 text-gray-600">{o.items} item(s)</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(o.total)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          o.status === "New" ? "bg-accent/10 text-accent" : o.status.includes("Custom") ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                        }`}>{o.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{o.date}</td>
                      <td className="px-4 py-3"><button className="text-primary text-xs font-medium hover:underline">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === "inventory" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Product Inventory</h2>
            <div className="flex gap-2">
              <button className="bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg">+ Add Product</button>
              <button className="bg-white border border-gray-200 text-xs font-medium px-3 py-2 rounded-lg">Bulk Upload</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr><th className="px-4 py-3 text-left">Product</th><th className="px-4 py-3 text-left">SKU</th><th className="px-4 py-3 text-left">Category</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-left">Stock</th><th className="px-4 py-3 text-left">Status</th></tr>
                </thead>
                <tbody>
                  {products.slice(0, 6).map((p) => {
                    const totalStock = p.sizes.filter((s) => s.available).length * 15;
                    const stockStatus = totalStock < 10 ? "Low" : totalStock > 50 ? "Good" : "Medium";
                    return (
                      <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image src={p.images[0]} alt="" width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 font-mono">{p.sku}</td>
                        <td className="px-4 py-3 text-gray-600">{p.category}</td>
                        <td className="px-4 py-3 font-medium">{formatPrice(p.price)}</td>
                        <td className="px-4 py-3 font-medium">{totalStock} units</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            stockStatus === "Low" ? "bg-error/10 text-error" : stockStatus === "Good" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                          }`}>{stockStatus}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-bold text-gray-900">Customer Directory</h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Search customers..." className="pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs w-full sm:w-48" />
            </div>
          </div>
          {!customersLoaded ? (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">Orders</th><th className="px-4 py-3 text-left">Total Spent</th><th className="px-4 py-3 text-left">Tier</th><th className="px-4 py-3 text-left">Last Order</th><th className="px-4 py-3 text-left">Tags</th></tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image src={c.avatar} alt="" width={36} height={36} className="rounded-full" />
                            <div>
                              <p className="font-medium text-gray-900">{c.name}</p>
                              <p className="text-xs text-gray-500">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{c.totalOrders}</td>
                        <td className="px-4 py-3 font-medium">{formatPrice(c.totalSpent)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            c.loyaltyTier === "Platinum" ? "bg-primary/10 text-primary" : c.loyaltyTier === "Gold" ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-600"
                          }`}>{c.loyaltyTier}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{c.lastOrderDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {c.tags.slice(0, 2).map((t) => (
                              <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tailors Tab */}
      {activeTab === "tailors" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Tailor & Designer Workload</h2>
            <button className="bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg">+ Add Tailor</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">{tailorOrders.filter((o) => o.status === "In Progress").length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Pending Assignment</p>
              <p className="text-2xl font-bold text-accent">{tailorOrders.filter((o) => o.status === "Pending").length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500">Due This Week</p>
              <p className="text-2xl font-bold text-error">2</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr><th className="px-4 py-3 text-left">Order</th><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">Garment</th><th className="px-4 py-3 text-left">Stage</th><th className="px-4 py-3 text-left">Priority</th><th className="px-4 py-3 text-left">Due Date</th><th className="px-4 py-3 text-left">Earnings</th></tr>
                </thead>
                <tbody>
                  {tailorOrders.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900 text-xs">{o.orderNumber}</td>
                      <td className="px-4 py-3 text-gray-600">{o.customerName}</td>
                      <td className="px-4 py-3 text-gray-600">{o.garmentType}</td>
                      <td className="px-4 py-3"><span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{o.currentStage}</span></td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          o.priority === "urgent" ? "bg-error/10 text-error" : o.priority === "high" ? "bg-accent/10 text-accent" : "bg-gray-100 text-gray-600"
                        }`}>{o.priority}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{o.dueDate}</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(o.earnings)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="animate-fade-in space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Conversion Rate", value: "3.8%", sub: "From 3.2% last month" },
              { label: "Cart Abandonment", value: "62%", sub: "Industry avg: 65%" },
              { label: "Return Rate", value: "4.2%", sub: "Target: <5%" },
              { label: "Customer LTV", value: "₹18,500", sub: "12-month horizon" },
              { label: "Repeat Purchase", value: "42%", sub: "Within 6 months" },
              { label: "NPS Score", value: "67", sub: "Excellent" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Revenue by Category</h3>
            <div className="space-y-3">
              {[
                { cat: "Bridal Lehengas", pct: 38, val: "₹3.2L" },
                { cat: "Sarees", pct: 25, val: "₹2.1L" },
                { cat: "Kurta Sets", pct: 18, val: "₹1.5L" },
                { cat: "Indo-Western", pct: 12, val: "₹1.0L" },
                { cat: "Accessories", pct: 7, val: "₹0.6L" },
              ].map(({ cat, pct, val }) => (
                <div key={cat} className="flex items-center gap-4">
                  <span className="text-xs text-gray-600 w-32 shrink-0">{cat}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-medium text-gray-900 w-16 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
