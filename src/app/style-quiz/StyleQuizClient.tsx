"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import { styleQuizQuestions } from "@/lib/mock-data";
import { pageLoadDelay, actionDelay } from "@/lib/delay";
import { Skeleton } from "@/components/ui/Skeleton";

const styleResults: Record<string, { name: string; desc: string; image: string; recommendations: string[] }> = {
  ethnic: { name: "Classic Ethnic", desc: "You gravitate towards timeless Indian silhouettes — rich fabrics, traditional embroidery, and jewel tones. Think handwoven sarees, embroidered anarkalis, and statement ethnic jewelry.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop", recommendations: ["Banarasi Silk Sarees", "Chikankari Kurta Sets", "Zardozi Lehengas", "Kundan Jewelry"] },
  boho: { name: "Boho Free-Spirit", desc: "Your style is effortless and earthy — flowing silhouettes, natural fabrics, and eclectic prints. You mix handloom with modern, and every outfit tells a story of global artisan craft.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop", recommendations: ["Block Print Dresses", "Handloom Cotton Sarees", "Oxidized Silver Jewelry", "Ikat Jackets"] },
  minimalist: { name: "Modern Minimalist", desc: "Less is more for you — clean lines, neutral palettes, structured silhouettes. You invest in quality over quantity and your wardrobe is a masterclass in understated elegance.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop", recommendations: ["Tailored Blazers", "Silk Slip Dresses", "Monochrome Kurtas", "Capsule Wardrobe Sets"] },
  streetwear: { name: "Street Style Maven", desc: "You blend global street culture with Indian craftsmanship — block-printed bombers, ikat sneakers, fusion hoodies. You're the trendsetter in your crew, always one step ahead.", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&h=400&fit=crop", recommendations: ["Block Print Bomber Jackets", "Fusion Sneaker Accessories", "Graphic Tee Kurtas", "Tie-Dye Joggers"] },
  "indo-western": { name: "Indo-Western Fusion", desc: "You seamlessly blend East and West — cape gowns, dhoti pants with crop tops, saree gowns. You're the life of the party and your style defies categorization.", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=600&h=400&fit=crop", recommendations: ["Cape Gowns", "Saree Gowns", "Dhoti Pants Sets", "Fusion Lehengas"] },
};

export default function StyleQuizPage() {
  const [loaded, setLoaded] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    pageLoadDelay().then(() => setLoaded(true));
  }, []);

  const handleAnswer = async (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQ < styleQuizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCalculating(true);
      await actionDelay();
      await actionDelay();
      setCalculating(false);
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "ethnic";
    return styleResults[top] || styleResults.ethnic;
  };

  if (!loaded) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-5 w-96 mx-auto mb-12" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (calculating) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <Sparkles size={48} className="mx-auto text-primary mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Style...</h2>
        <p className="text-gray-500">Our AI is studying your preferences to find your perfect style profile</p>
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = getResult();
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Style: {result.name}</h1>
        </div>
        <div className="relative rounded-2xl overflow-hidden h-64 mb-6">
          <Image src={result.image} alt={result.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <p className="text-gray-600 leading-relaxed mb-8">{result.desc}</p>

        <h3 className="font-semibold text-gray-900 mb-4">Recommended For You</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {result.recommendations.map((r) => (
            <div key={r} className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm">
              <Check size={16} className="text-success" />
              <span className="text-sm font-medium text-gray-700">{r}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/catalog" className="bg-primary text-white font-semibold px-6 py-3 min-h-[44px] rounded-xl hover:bg-primary-dark flex items-center gap-2">
            Shop Your Style <ArrowRight size={16} />
          </Link>
          <button onClick={() => { setCurrentQ(0); setAnswers([]); setShowResult(false); }} className="border border-gray-200 text-gray-600 font-medium px-6 py-3 min-h-[44px] rounded-xl hover:border-primary hover:text-primary">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = styleQuizQuestions[currentQ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Your Style</h1>
        <p className="text-gray-500">Answer {styleQuizQuestions.length} quick questions and we&apos;ll curate your perfect wardrobe</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {styleQuizQuestions.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentQ ? "bg-primary" : "bg-gray-200"}`} />
        ))}
      </div>

      {/* Question */}
      <div className="animate-fade-in" key={currentQ}>
        <p className="text-xs text-primary font-medium mb-2">Question {currentQ + 1} of {styleQuizQuestions.length}</p>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h2>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="group relative rounded-2xl overflow-hidden h-40 sm:h-48 md:h-56 text-left hover:ring-2 hover:ring-primary transition-all active-press"
            >
              <Image src={opt.image} alt={opt.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-sm">{opt.label}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentQ > 0 && (
        <button onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); }} className="mt-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 min-h-[44px] p-2">
          <ArrowLeft size={16} /> Previous question
        </button>
      )}
    </div>
  );
}
