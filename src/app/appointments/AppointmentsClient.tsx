"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, Video, MapPin, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { appointmentSlots, boutiques } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

const appointmentTypes = [
  { id: "bridal", name: "Bridal Consultation", duration: "60 min", desc: "Private bridal viewing with designer", icon: "👰" },
  { id: "measure", name: "Measurement Session", duration: "30 min", desc: "Professional body measurement", icon: "📏" },
  { id: "tryon", name: "In-Store Try-On", duration: "45 min", desc: "Try selected products in store", icon: "👗" },
  { id: "video", name: "Video Consultation", duration: "30 min", desc: "Virtual session with boutique staff", icon: "📹" },
  { id: "styling", name: "Personal Styling", duration: "60 min", desc: "1:1 session with certified stylist", icon: "✨" },
  { id: "trial", name: "Trial Fitting", duration: "30 min", desc: "Custom order trial fitting", icon: "🪡" },
];

const timeSlots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"];
const dates = ["Mar 29", "Mar 30", "Mar 31", "Apr 1", "Apr 2", "Apr 3", "Apr 4"];

export default function AppointmentsPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedBoutique, setSelectedBoutique] = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const handleBook = async () => {
    await actionDelay();
    setBooked(true);
  };

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={40} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
        <p className="text-gray-500 mb-2">{selectedType} at {selectedBoutique || "Ananya Couture"}</p>
        <p className="text-gray-500">{selectedDate} at {selectedTime}</p>
        <p className="text-sm text-gray-400 mt-4">You&apos;ll receive a confirmation via SMS and WhatsApp. Reminder will be sent 24 hours and 2 hours before.</p>
        <button onClick={() => { setBooked(false); setSelectedType(""); setSelectedDate(""); setSelectedTime(""); }} className="mt-6 bg-primary text-white font-semibold px-6 py-3 rounded-xl">Book Another</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
      <p className="text-gray-500 mb-8">Schedule in-store visits, consultations, measurement sessions, and more</p>

      {/* Step 1: Type */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Select Appointment Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {appointmentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.name)}
              className={`p-4 min-h-[44px] rounded-xl border-2 text-left transition-all active-press ${selectedType === type.name ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"}`}
            >
              <span className="text-2xl mb-2 block">{type.icon}</span>
              <h3 className="text-sm font-semibold text-gray-900">{type.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{type.desc}</p>
              <p className="text-xs text-primary font-medium mt-1">{type.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Boutique */}
      {selectedType && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Select Boutique</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {boutiques.slice(0, 3).map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBoutique(b.name)}
                className={`flex items-center gap-3 p-3 min-h-[48px] rounded-xl border-2 transition-all active-press ${selectedBoutique === b.name ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"}`}
              >
                <Image src={b.image} alt={b.name} width={40} height={40} className="rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {selectedBoutique && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Select Date & Time</h2>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`px-4 py-3 min-h-[44px] rounded-xl text-sm font-medium whitespace-nowrap border-2 transition-all active-press ${selectedDate === d ? "border-primary bg-primary text-white" : "border-gray-200 hover:border-primary/30"}`}
              >
                {d}
              </button>
            ))}
          </div>
          {selectedDate && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 animate-fade-in">
              {timeSlots.map((t) => {
                const isAvail = Math.random() > 0.2;
                return (
                  <button
                    key={t}
                    onClick={() => isAvail && setSelectedTime(t)}
                    disabled={!isAvail}
                    className={`px-3 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all active-press ${
                      !isAvail ? "bg-gray-100 text-gray-300 cursor-not-allowed" :
                      selectedTime === t ? "bg-primary text-white" : "bg-white border border-gray-200 hover:border-primary text-gray-700"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Confirm */}
      {selectedTime && (
        <div className="animate-fade-in">
          <div className="bg-primary/5 rounded-2xl p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Type:</span> <span className="font-medium">{selectedType}</span></div>
              <div><span className="text-gray-500">Boutique:</span> <span className="font-medium">{selectedBoutique}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="font-medium">{selectedDate}, 2026</span></div>
              <div><span className="text-gray-500">Time:</span> <span className="font-medium">{selectedTime}</span></div>
            </div>
          </div>
          <button onClick={handleBook} className="w-full sm:w-auto bg-primary text-white font-semibold px-8 py-3 min-h-[48px] rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
            <Calendar size={18} /> Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
