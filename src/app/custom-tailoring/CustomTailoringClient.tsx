"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors, Ruler, Palette, Camera, Clock, Check, ArrowRight, ArrowLeft, Upload, ChevronRight } from "lucide-react";
import { fabrics, customOrders } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

function formatPrice(p: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);
}

const garmentTypes = [
  { name: "Lehenga", sub: "Bridal, Festive, Party", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=200&fit=crop" },
  { name: "Saree Blouse", sub: "Designer, Classic", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=300&h=200&fit=crop" },
  { name: "Kurta Set", sub: "Anarkali, Straight, A-line", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop" },
  { name: "Suit / Sherwani", sub: "Jodhpuri, Bandhgala, Western", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" },
  { name: "Gown", sub: "Cocktail, Reception, Evening", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=300&h=200&fit=crop" },
  { name: "Dress", sub: "Casual, Formal, Party", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop" },
];

const necklines = ["Round", "V-Neck", "Sweetheart", "Boat Neck", "Mandarin", "Off-Shoulder", "Halter"];
const sleeves = ["Sleeveless", "Cap Sleeve", "Short", "Elbow", "3/4 Length", "Full", "Bell Sleeve", "Puff"];
const timelines = [
  { name: "Standard", days: "3-4 weeks", multiplier: 1 },
  { name: "Express", days: "2 weeks", multiplier: 1.3 },
  { name: "Rush", days: "1 week", multiplier: 1.6 },
];

export default function CustomTailoringPage() {
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedGarment, setSelectedGarment] = useState("");
  const [measurements, setMeasurements] = useState({ bust: "", waist: "", hips: "", shoulder: "", length: "" });
  const [selectedNeckline, setSelectedNeckline] = useState("");
  const [selectedSleeve, setSelectedSleeve] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("Standard");
  const [embellishments, setEmbellishments] = useState("");

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const selectedFabricData = fabrics.find((f) => f.id === selectedFabric);
  const basePrice = selectedGarment === "Lehenga" ? 15000 : selectedGarment === "Suit / Sherwani" ? 12000 : selectedGarment === "Gown" ? 10000 : 5000;
  const fabricCost = selectedFabricData ? selectedFabricData.pricePerMeter * 5 : 0;
  const timelineMultiplier = timelines.find((t) => t.name === selectedTimeline)?.multiplier || 1;
  const estimatedPrice = Math.round((basePrice + fabricCost) * timelineMultiplier);

  // Show existing custom order tracking
  const existingOrder = customOrders[0];

  if (!loaded) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-full max-w-lg mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Tailoring</h1>
        <p className="text-gray-500">Design your dream outfit from scratch — choose garment, measurements, fabric, and design specifications.</p>
      </div>

      {/* Existing Custom Order Tracking */}
      {existingOrder && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Active Custom Order: {existingOrder.orderNumber}</h3>
              <p className="text-sm text-gray-500">{existingOrder.garmentType} — Due: {existingOrder.dueDate}</p>
            </div>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{existingOrder.status}</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {existingOrder.stages.map((stage, i) => (
              <div key={i} className="flex items-center shrink-0">
                <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 min-h-[32px] sm:min-h-[36px] rounded-lg text-[10px] sm:text-xs font-medium ${
                  stage.status === "completed" ? "bg-success/10 text-success" :
                  stage.status === "active" ? "bg-primary text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {stage.status === "completed" && <Check size={12} />}
                  {stage.name}
                </div>
                {i < existingOrder.stages.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>Tailor: {existingOrder.tailorName}</span>
            <span>Advance paid: {formatPrice(existingOrder.advancePaid)}</span>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {["Garment", "Measurements", "Design", "Fabric", "Timeline & Quote"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step > i + 1 ? "bg-success text-white" : step === i + 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </div>
            <span className={`hidden md:block text-xs font-medium ${step === i + 1 ? "text-primary" : "text-gray-400"}`}>{s}</span>
            {i < 4 && <div className={`w-8 h-0.5 ${step > i + 1 ? "bg-success" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Garment Type */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Garment Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {garmentTypes.map((g) => (
              <button
                key={g.name}
                onClick={() => { setSelectedGarment(g.name); setStep(2); }}
                className={`group relative rounded-2xl overflow-hidden h-32 sm:h-40 text-left ${selectedGarment === g.name ? "ring-2 ring-primary" : ""}`}
              >
                <Image src={g.image} alt={g.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{g.name}</h3>
                  <p className="text-xs text-white/70">{g.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Measurements */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Enter Measurements</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your body measurements in inches. Need help? Follow our video guide or book an in-store measurement session.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { key: "bust", label: "Bust / Chest", hint: "Measure around the fullest part" },
                { key: "waist", label: "Waist", hint: "Measure at your natural waistline" },
                { key: "hips", label: "Hips", hint: "Measure around the fullest part" },
                { key: "shoulder", label: "Shoulder Width", hint: "Seam to seam across the back" },
                { key: "length", label: "Garment Length", hint: "From shoulder to desired hemline" },
              ].map(({ key, label, hint }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
                  <input
                    type="text"
                    value={measurements[key as keyof typeof measurements]}
                    onChange={(e) => setMeasurements({ ...measurements, [key]: e.target.value })}
                    placeholder={`e.g., 36`}
                    className="w-full px-4 py-2.5 min-h-[44px] border border-gray-200 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Ruler size={18} /> Measurement Options</h3>
              <div className="space-y-3">
                {[
                  { icon: Ruler, title: "Enter Manually", desc: "Use our guided form with visual instructions" },
                  { icon: Camera, title: "AR Body Scan", desc: "Use your phone camera for precise measurements" },
                  { icon: Clock, title: "Book In-Store Session", desc: "Visit a boutique for professional measurement" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Icon size={18} className="text-primary" /></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{title}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(1)} className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Back</button>
            <button onClick={() => setStep(3)} className="bg-primary text-white font-semibold px-6 py-2.5 min-h-[44px] rounded-xl hover:bg-primary-dark flex items-center gap-2">Next: Design <ArrowRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 3: Design */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Design Specifications</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Neckline</h3>
              <div className="flex flex-wrap gap-2">
                {necklines.map((n) => (
                  <button key={n} onClick={() => setSelectedNeckline(n)} className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-medium border transition-all ${selectedNeckline === n ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"}`}>{n}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sleeve Style</h3>
              <div className="flex flex-wrap gap-2">
                {sleeves.map((s) => (
                  <button key={s} onClick={() => setSelectedSleeve(s)} className={`px-4 py-2 min-h-[44px] rounded-xl text-sm font-medium border transition-all ${selectedSleeve === s ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Embellishments</h3>
              <textarea
                value={embellishments}
                onChange={(e) => setEmbellishments(e.target.value)}
                placeholder="Describe any embroidery, beadwork, or other embellishments you'd like..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-24 resize-none"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Reference Images (optional)</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">Drag & drop or click to upload inspiration images</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Back</button>
            <button onClick={() => setStep(4)} className="bg-primary text-white font-semibold px-6 py-2.5 min-h-[44px] rounded-xl hover:bg-primary-dark flex items-center gap-2">Next: Fabric <ArrowRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 4: Fabric */}
      {step === 4 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Select Fabric</h2>
          <p className="text-sm text-gray-500 mb-6">Browse our fabric library. Physical swatches available for ₹49 each (refundable on order).</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fabrics.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFabric(f.id)}
                className={`bg-white rounded-2xl overflow-hidden text-left border-2 transition-all ${selectedFabric === f.id ? "border-primary shadow-lg" : "border-transparent shadow-sm hover:shadow-md"}`}
              >
                <Image src={f.image} alt={f.name} width={300} height={200} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-gray-900">{f.name}</h4>
                  <p className="text-xs text-gray-500">{f.composition}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-primary">{formatPrice(f.pricePerMeter)}/m</span>
                    <span className="text-xs text-gray-400">{f.weight}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {f.colors.slice(0, 5).map((c) => (
                      <span key={c} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                  {f.sustainabilityInfo && <p className="text-[10px] text-success mt-1">{f.sustainabilityInfo}</p>}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(3)} className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Back</button>
            <button onClick={() => setStep(5)} className="bg-primary text-white font-semibold px-6 py-2.5 min-h-[44px] rounded-xl hover:bg-primary-dark flex items-center gap-2">Next: Quote <ArrowRight size={16} /></button>
          </div>
        </div>
      )}

      {/* Step 5: Timeline & Quote */}
      {step === 5 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Timeline & Quotation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Delivery Timeline</h3>
              <div className="space-y-3">
                {timelines.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTimeline(t.name)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${selectedTimeline === t.name ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"}`}
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.days}</p>
                    </div>
                    {t.multiplier > 1 && <span className="text-xs text-accent font-medium">+{Math.round((t.multiplier - 1) * 100)}%</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quotation Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Garment Type</span><span className="font-medium">{selectedGarment || "—"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Design</span><span className="font-medium">{selectedNeckline || "—"} / {selectedSleeve || "—"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Fabric</span><span className="font-medium">{selectedFabricData?.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tailoring Charges</span><span>{formatPrice(basePrice)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Fabric Cost (est. 5m)</span><span>{formatPrice(fabricCost)}</span></div>
                {timelineMultiplier > 1 && (
                  <div className="flex justify-between text-accent"><span>Rush Fee</span><span>+{Math.round((timelineMultiplier - 1) * 100)}%</span></div>
                )}
                <hr />
                <div className="flex justify-between text-lg font-bold"><span>Estimated Total</span><span className="text-primary">{formatPrice(estimatedPrice)}</span></div>
                <p className="text-xs text-gray-400">Advance payment: {formatPrice(Math.round(estimatedPrice * 0.4))} (40%)</p>
              </div>
              <button className="w-full mt-6 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors">
                Confirm & Pay Advance
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-2">Final price confirmed after designer review</p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(4)} className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-gray-600 hover:text-gray-900"><ArrowLeft size={16} /> Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
