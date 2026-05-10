// ============================================
// StyleVault - Static Brochure Mock Data
// ============================================

// --- COLLECTIONS (No prices, no "Shop Now") ---
export interface StaticCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  tags: string[];
}

export const staticCollections: StaticCollection[] = [
  {
    id: "womens-ethnic",
    name: "Women's Ethnic",
    description:
      "Handwoven sarees, embroidered salwar suits, regal lehengas, and everyday kurtis — rooted in centuries of Indian textile artistry.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
    itemCount: 240,
    tags: ["Sarees", "Suits", "Lehengas", "Kurtis"],
  },
  {
    id: "womens-western",
    name: "Women's Western",
    description:
      "Contemporary dresses, tailored tops, and flowing skirts crafted from premium fabrics for the modern wardrobe.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    itemCount: 185,
    tags: ["Dresses", "Tops", "Skirts"],
  },
  {
    id: "mens-collection",
    name: "Men's Collection",
    description:
      "From crisp linen shirts to hand-embroidered sherwanis — refined menswear for every occasion, casual to ceremonial.",
    image:
      "https://images.unsplash.com/photo-1576470189712-50fe3ec06b04?w=800&h=1000&fit=crop",
    itemCount: 160,
    tags: ["Shirts", "Kurtas", "Suits", "Sherwanis"],
  },
  {
    id: "bridal-festive",
    name: "Bridal & Festive",
    description:
      "Show-stopping bridal lehengas, reception gowns, and festive ensembles adorned with zardozi, sequins, and heritage embroidery.",
    image:
      "https://images.unsplash.com/photo-1762201698238-bf412e297016?w=800&h=1000&fit=crop",
    itemCount: 120,
    tags: ["Bridal Lehengas", "Reception Wear", "Festive"],
  },
  {
    id: "accessories",
    name: "Accessories",
    description:
      "Handcrafted clutches, pashmina stoles, statement jewelry, and artisanal bags to complete every look.",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=1000&fit=crop",
    itemCount: 95,
    tags: ["Bags", "Stoles", "Jewelry"],
  },
  {
    id: "kids-collection",
    name: "Kids Collection",
    description:
      "Miniature ethnic wear and playful western pieces for little fashionistas — comfortable, colorful, and celebration-ready.",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop",
    itemCount: 75,
    tags: ["Ethnic Kids", "Party Wear", "Casual"],
  },
  {
    id: "custom-tailoring",
    name: "Custom Tailoring",
    description:
      "Bespoke garments made to your measurements — choose your fabric, design, and embroidery for a one-of-a-kind piece.",
    image:
      "https://images.unsplash.com/photo-1745095034955-1019067b7ce4?w=800&h=1000&fit=crop",
    itemCount: 50,
    tags: ["Made-to-Measure", "Bespoke", "Alterations"],
  },
];

// --- LOOKBOOK ---
export interface LookbookItem {
  id: string;
  season: string;
  title: string;
  image: string;
  aspectClass: string; // CSS class for grid spanning
}

export const lookbookItems: LookbookItem[] = [
  {
    id: "lb1",
    season: "Spring/Summer",
    title: "Pastel Bloom",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop",
    aspectClass: "row-span-2",
  },
  {
    id: "lb2",
    season: "Spring/Summer",
    title: "Linen & Light",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop",
    aspectClass: "",
  },
  {
    id: "lb3",
    season: "Festive",
    title: "Golden Hour",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop",
    aspectClass: "",
  },
  {
    id: "lb4",
    season: "Bridal",
    title: "Bridal Reverie",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1200&fit=crop",
    aspectClass: "row-span-2",
  },
  {
    id: "lb5",
    season: "Autumn/Winter",
    title: "Velvet Dusk",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=600&fit=crop",
    aspectClass: "",
  },
  {
    id: "lb6",
    season: "Festive",
    title: "Sangeet Nights",
    image:
      "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&h=600&fit=crop",
    aspectClass: "",
  },
  {
    id: "lb7",
    season: "Spring/Summer",
    title: "Coastal Breeze",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=600&fit=crop",
    aspectClass: "",
  },
  {
    id: "lb8",
    season: "Autumn/Winter",
    title: "Heritage Weave",
    image:
      "https://images.unsplash.com/photo-1669765428675-efd41841bc80?w=800&h=600&fit=crop",
    aspectClass: "",
  },
];

// --- DESIGNER SPOTLIGHT ---
export interface Designer {
  id: string;
  name: string;
  photo: string;
  philosophy: string;
  signatureStyle: string;
  yearsActive: number;
  notableWork: string;
}

export const designers: Designer[] = [
  {
    id: "d1",
    name: "Priya Mehta",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    philosophy:
      "Fashion should honour the hands that create it. Every thread carries a story of the artisan who wove it.",
    signatureStyle: "Contemporary takes on Banarasi weaving with minimalist silhouettes",
    yearsActive: 14,
    notableWork: "Lakme Fashion Week 2024 Closing Collection",
  },
  {
    id: "d2",
    name: "Arjun Kapoor",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    philosophy:
      "Menswear isn't about trends — it's about building a wardrobe that speaks quietly but unmistakably of who you are.",
    signatureStyle: "Structured Indo-Western fusion with heritage textiles",
    yearsActive: 9,
    notableWork: "Bollywood Celebrity Wardrobe — Filmfare Awards 2025",
  },
  {
    id: "d3",
    name: "Zara Sheikh",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    philosophy:
      "Bridal wear should feel like armour and poetry at the same time — powerful yet deeply personal.",
    signatureStyle: "Opulent bridal lehengas with hand-painted motifs and 3D embroidery",
    yearsActive: 11,
    notableWork: "Vogue India Bridal Designer of the Year 2025",
  },
  {
    id: "d4",
    name: "Rohan Desai",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    philosophy:
      "Sustainability isn't a label — it's a practice. We use only organic fabrics and zero-waste pattern-cutting.",
    signatureStyle: "Eco-conscious resort wear with block-printed organic cotton",
    yearsActive: 7,
    notableWork: "GQ India Sustainable Fashion Award 2024",
  },
];

// --- TESTIMONIALS ---
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  purchaseType: string;
  rating: number;
  text: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sneha Raghavan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    location: "Mumbai",
    purchaseType: "Bridal Lehenga",
    rating: 5,
    text: "My bridal lehenga from StyleVault was a dream. The zardozi work was exquisite and it fit perfectly after just one alteration. The team even helped me coordinate my mother's outfit. Truly a once-in-a-lifetime experience.",
    date: "January 2026",
  },
  {
    id: "t2",
    name: "Amit Sharma",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    location: "Delhi",
    purchaseType: "Custom Sherwani",
    rating: 5,
    text: "Got a custom sherwani tailored for my sister's wedding. From fabric selection to final fitting — every step was handled with incredible attention to detail. The embroidery matched exactly what I'd envisioned.",
    date: "December 2025",
  },
  {
    id: "t3",
    name: "Kavya Nair",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    location: "Bengaluru",
    purchaseType: "Silk Saree Collection",
    rating: 4,
    text: "I've ordered three Kanjivaram sarees over the past year and each one has been museum-quality. The silk has that perfect weight and drape. My only wish is they had even more colour options in the temple border range.",
    date: "February 2026",
  },
  {
    id: "t4",
    name: "Rahul Joshi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    location: "Jaipur",
    purchaseType: "Festive Kurta Set",
    rating: 5,
    text: "The Diwali kurta set I picked up was outstanding — hand-block printed Ajrakh on the finest mulmul cotton. I wore it to three functions and got compliments at every single one. Already planning my Holi order.",
    date: "November 2025",
  },
  {
    id: "t5",
    name: "Meera Iyer",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
    location: "Chennai",
    purchaseType: "Western Party Wear",
    rating: 5,
    text: "Found a gorgeous sequin gown for my engagement party. The personal styling session helped me pick accessories too — the stylist really understood my body type and what would photograph well. Felt like a celebrity.",
    date: "March 2026",
  },
  {
    id: "t6",
    name: "Deepak Malhotra",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop",
    location: "Chandigarh",
    purchaseType: "Kids' Wedding Outfit",
    rating: 5,
    text: "Ordered matching ethnic outfits for my twin daughters for a family wedding. The miniature lehengas were just as detailed as the adult versions — tiny gota patti borders and all. The girls absolutely loved twirling in them.",
    date: "January 2026",
  },
];

// --- FAQ ---
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "faq1",
    question: "Do you offer custom tailoring?",
    answer:
      "Yes! We offer full bespoke tailoring services. You can choose from over 200 fabrics, share your design inspiration or sketch, and our master tailors will create a garment made exactly to your measurements. The process typically takes 3–6 weeks depending on complexity.",
  },
  {
    id: "faq2",
    question: "What's the alteration turnaround time?",
    answer:
      "Standard alterations (hemming, taking in/out, sleeve adjustments) are completed within 5–7 business days. Rush alterations are available within 48 hours for an additional fee. Bridal alterations require 2–3 fittings over 2 weeks to ensure perfection.",
  },
  {
    id: "faq3",
    question: "Do you ship outside the city?",
    answer:
      "Absolutely. We ship across India via insured courier with tracking. Metro cities (Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad) receive deliveries in 3–5 business days. Other cities take 5–8 business days. International shipping is available on request for bridal orders.",
  },
  {
    id: "faq4",
    question: "Can I visit for a personal styling session?",
    answer:
      "We'd love that! Book a complimentary 60-minute personal styling session at our boutique. Our in-house stylists will help you explore collections, find the right silhouettes for your body type, and put together complete looks for any occasion. Walk-ins are welcome but appointments are recommended.",
  },
  {
    id: "faq5",
    question: "Do you carry plus sizes?",
    answer:
      "Yes — inclusivity is core to our philosophy. Our ready-to-wear range is available in sizes XS through 4XL. For custom tailoring, there are no size limitations whatsoever — every piece is made to your exact measurements regardless of body type.",
  },
  {
    id: "faq6",
    question: "Do you have a bridal collection?",
    answer:
      "Our bridal collection is one of our proudest offerings. We feature heritage lehengas, contemporary bridal gowns, reception sarees, and trousseau packages. Brides can book a private bridal consultation where we curate looks for every wedding event — from mehendi to reception.",
  },
];

// --- STORE INFO ---
export const storeInfo = {
  name: "StyleVault Flagship Boutique",
  address: "42, MG Road, C-Scheme",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302001",
  phone: "+91 141 400 8899",
  email: "hello@stylevault.in",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.654!2d75.7872!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTMuOSJF!5e0!3m2!1sen!2sin!4v1",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 9:00 PM" },
    { day: "Sunday", time: "11:00 AM – 6:00 PM" },
    { day: "Public Holidays", time: "11:00 AM – 5:00 PM" },
  ],
  instagram: "https://instagram.com/stylevault",
  pinterest: "https://pinterest.com/stylevault",
};

// --- ABOUT STATS ---
export const aboutStats = [
  { label: "Years of Excellence", value: "10+" },
  { label: "Exclusive Designers", value: "45+" },
  { label: "Custom Tailoring Orders", value: "8,000+" },
  { label: "Handpicked Collections", value: "120+" },
];
