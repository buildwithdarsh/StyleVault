// ============================================
// StyleVault - Comprehensive Mock Data
// ============================================

// --- BOUTIQUES ---
export interface Boutique {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  coverImage: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  priceRange: string;
  isVerified: boolean;
  isPremium: boolean;
  productCount: number;
  foundedYear: number;
  deliveryTime: string;
  categories: string[];
}

export const boutiques: Boutique[] = [
  {
    id: "b1",
    name: "Ananya Couture",
    tagline: "Where tradition meets contemporary elegance",
    description: "A luxury bridal and ethnic wear boutique in Jaipur, known for handcrafted lehengas with intricate zardozi and gota patti work. Each piece is a testament to Rajasthani artisanal heritage.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
    location: "C-Scheme, Jaipur",
    city: "Jaipur",
    rating: 4.8,
    reviewCount: 1247,
    specialties: ["Bridal Lehengas", "Zardozi Work", "Gota Patti", "Trousseau"],
    priceRange: "₹5,000 - ₹2,50,000",
    isVerified: true,
    isPremium: true,
    productCount: 342,
    foundedYear: 2012,
    deliveryTime: "3-7 days",
    categories: ["Bridal", "Ethnic", "Festive"]
  },
  {
    id: "b2",
    name: "The Loom Studio",
    tagline: "Sustainably woven, consciously designed",
    description: "An eco-conscious fashion studio in Bengaluru specializing in handloom sarees and organic cotton wear. Every garment tells a story of Indian weaving traditions and environmental responsibility.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop",
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    rating: 4.6,
    reviewCount: 856,
    specialties: ["Handloom Sarees", "Organic Cotton", "Sustainable Fashion"],
    priceRange: "₹1,200 - ₹35,000",
    isVerified: true,
    isPremium: false,
    productCount: 478,
    foundedYear: 2018,
    deliveryTime: "2-5 days",
    categories: ["Sarees", "Casual", "Sustainable"]
  },
  {
    id: "b3",
    name: "Maison de Luxe",
    tagline: "Indo-western fusion at its finest",
    description: "A high-end boutique in South Mumbai crafting contemporary Indo-Western silhouettes. Popular among Bollywood stylists for red carpet and cocktail looks with a distinctly modern Indian twist.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    rating: 4.9,
    reviewCount: 2103,
    specialties: ["Indo-Western", "Cocktail Wear", "Red Carpet", "Designer"],
    priceRange: "₹8,000 - ₹1,50,000",
    isVerified: true,
    isPremium: true,
    productCount: 256,
    foundedYear: 2015,
    deliveryTime: "2-4 days",
    categories: ["Indo-Western", "Party", "Designer"]
  },
  {
    id: "b4",
    name: "Silk Route Boutique",
    tagline: "The finest silks from across India",
    description: "Curating the best silks from Kanchipuram, Banaras, Mysore, and Assam. Each saree is sourced directly from master weavers, ensuring authenticity and fair trade practices.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=400&fit=crop",
    location: "T. Nagar, Chennai",
    city: "Chennai",
    rating: 4.7,
    reviewCount: 1589,
    specialties: ["Kanchipuram Silk", "Banarasi", "Bridal Sarees"],
    priceRange: "₹3,000 - ₹1,80,000",
    isVerified: true,
    isPremium: true,
    productCount: 623,
    foundedYear: 2008,
    deliveryTime: "3-6 days",
    categories: ["Sarees", "Bridal", "Ethnic"]
  },
  {
    id: "b5",
    name: "Urban Thread Co.",
    tagline: "Street style meets Indian craft",
    description: "A Gen-Z focused brand in Delhi blending streetwear aesthetics with Indian craftsmanship. Known for block-printed hoodies, chikankari sneaker accessories, and ikat bomber jackets.",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    rating: 4.5,
    reviewCount: 743,
    specialties: ["Streetwear", "Block Print", "Fusion Casual"],
    priceRange: "₹800 - ₹8,000",
    isVerified: true,
    isPremium: false,
    productCount: 389,
    foundedYear: 2021,
    deliveryTime: "2-4 days",
    categories: ["Casual", "Streetwear", "Unisex"]
  },
  {
    id: "b6",
    name: "Vasansi Jaipur",
    tagline: "Royal Rajasthani heritage in every stitch",
    description: "A 30-year-old family-run boutique specializing in traditional Rajasthani attire: bandhani dupattas, leheriya sarees, and royal Jodhpuri suits with meenakari buttons.",
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1614093302611-8efc4de12964?w=1200&h=400&fit=crop",
    location: "MI Road, Jaipur",
    city: "Jaipur",
    rating: 4.4,
    reviewCount: 2341,
    specialties: ["Bandhani", "Leheriya", "Jodhpuri Suits", "Rajasthani"],
    priceRange: "₹1,500 - ₹45,000",
    isVerified: true,
    isPremium: false,
    productCount: 512,
    foundedYear: 1994,
    deliveryTime: "3-5 days",
    categories: ["Ethnic", "Traditional", "Festive"]
  }
];

// --- PRODUCTS ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  images: string[];
  boutiqueId: string;
  boutiqueName: string;
  category: string;
  subCategory: string;
  occasion: string[];
  colors: { name: string; hex: string }[];
  sizes: { label: string; available: boolean }[];
  fabric: string;
  fabricComposition: string;
  careInstructions: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isTrending: boolean;
  isLimitedEdition: boolean;
  tags: string[];
  sku: string;
  countryOfOrigin: string;
  deliveryEstimate: string;
  fitType: string;
  weight: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Royal Zardozi Bridal Lehenga Set",
    description: "An exquisite bridal lehenga featuring hand-embroidered zardozi work on rich maroon velvet. The set includes a heavily embellished blouse, a voluminous lehenga with a 4-meter flare, and a net dupatta with scalloped borders. Each piece takes 45+ days of meticulous handwork by master artisans.",
    price: 185000,
    mrp: 225000,
    discount: 18,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b1",
    boutiqueName: "Ananya Couture",
    category: "Lehengas",
    subCategory: "Bridal Lehengas",
    occasion: ["Wedding", "Bridal"],
    colors: [
      { name: "Maroon", hex: "#800020" },
      { name: "Royal Red", hex: "#C41E3A" },
      { name: "Deep Wine", hex: "#722F37" }
    ],
    sizes: [
      { label: "XS", available: false },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "Custom", available: true }
    ],
    fabric: "Velvet & Net",
    fabricComposition: "100% Pure Velvet with Net Dupatta, Silk Lining",
    careInstructions: ["Dry clean only", "Store in muslin cloth", "Avoid direct sunlight", "Handle embroidery with care"],
    rating: 4.9,
    reviewCount: 89,
    isNew: false,
    isTrending: true,
    isLimitedEdition: false,
    tags: ["Bridal", "Zardozi", "Handcrafted", "Premium"],
    sku: "AC-BL-001",
    countryOfOrigin: "India",
    deliveryEstimate: "7-10 days (Custom: 45+ days)",
    fitType: "Semi-fitted bodice, Flared lehenga",
    weight: "4.5 kg"
  },
  {
    id: "p2",
    name: "Handloom Chanderi Silk Saree - Jade Green",
    description: "A lightweight Chanderi silk saree in a refreshing jade green with delicate gold zari butis woven throughout. The pallu features traditional Chanderi motifs including peacocks and lotuses. Perfect for festive occasions and elegant gatherings.",
    price: 8500,
    mrp: 12000,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b2",
    boutiqueName: "The Loom Studio",
    category: "Sarees",
    subCategory: "Chanderi Silk",
    occasion: ["Festive", "Party", "Office"],
    colors: [
      { name: "Jade Green", hex: "#00A86B" },
      { name: "Dusty Rose", hex: "#DCAE96" },
      { name: "Midnight Blue", hex: "#191970" }
    ],
    sizes: [
      { label: "Free Size (5.5m)", available: true }
    ],
    fabric: "Chanderi Silk",
    fabricComposition: "60% Silk, 40% Cotton with Zari",
    careInstructions: ["Dry clean recommended", "Iron on low heat with cloth", "Store folded with silica gel"],
    rating: 4.7,
    reviewCount: 234,
    isNew: true,
    isTrending: true,
    isLimitedEdition: false,
    tags: ["Handloom", "Sustainable", "Silk", "Festive"],
    sku: "TLS-CS-042",
    countryOfOrigin: "India",
    deliveryEstimate: "3-5 days",
    fitType: "Drape style (unstitched blouse included)",
    weight: "0.6 kg"
  },
  {
    id: "p3",
    name: "Structured Indo-Western Cape Gown",
    description: "A showstopping floor-length gown with an attached cape in midnight black crepe. Features a fitted bodice with geometric gold hand-embroidery inspired by Art Deco motifs. The flowing cape adds drama while the thigh-high slit keeps it modern.",
    price: 32000,
    mrp: 42000,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b3",
    boutiqueName: "Maison de Luxe",
    category: "Gowns",
    subCategory: "Indo-Western Gowns",
    occasion: ["Cocktail Party", "Reception", "Award Night"],
    colors: [
      { name: "Midnight Black", hex: "#0C0C0C" },
      { name: "Champagne Gold", hex: "#F7E7CE" },
      { name: "Emerald", hex: "#046307" }
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
      { label: "XL", available: true }
    ],
    fabric: "Italian Crepe",
    fabricComposition: "100% Polyester Crepe with Organza Cape",
    careInstructions: ["Dry clean only", "Hang on padded hanger", "Steam to remove wrinkles"],
    rating: 4.8,
    reviewCount: 67,
    isNew: true,
    isTrending: true,
    isLimitedEdition: true,
    tags: ["Designer", "Indo-Western", "Red Carpet", "Limited Edition"],
    sku: "MDL-CG-007",
    countryOfOrigin: "India",
    deliveryEstimate: "3-5 days",
    fitType: "Fitted bodice, Flowy cape",
    weight: "1.2 kg"
  },
  {
    id: "p4",
    name: "Banarasi Silk Saree - Temple Border",
    description: "A classic Banarasi silk saree handwoven in Varanasi with a rich temple border motif in contrasting gold. The body features intricate jangla pattern with small butas. Comes with unstitched blouse piece.",
    price: 24500,
    mrp: 28000,
    discount: 13,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b4",
    boutiqueName: "Silk Route Boutique",
    category: "Sarees",
    subCategory: "Banarasi Silk",
    occasion: ["Wedding", "Festive", "Puja"],
    colors: [
      { name: "Royal Purple", hex: "#6A0DAD" },
      { name: "Bridal Red", hex: "#CC0000" },
      { name: "Peacock Blue", hex: "#005F69" }
    ],
    sizes: [
      { label: "Free Size (6.3m with blouse)", available: true }
    ],
    fabric: "Pure Banarasi Silk",
    fabricComposition: "100% Mulberry Silk, Real Gold Zari",
    careInstructions: ["Dry clean only", "Store in muslin wrap", "Refold periodically to avoid crease lines", "Keep away from moisture"],
    rating: 4.8,
    reviewCount: 412,
    isNew: false,
    isTrending: true,
    isLimitedEdition: false,
    tags: ["Handwoven", "Banarasi", "Silk", "Traditional", "Bridal"],
    sku: "SRB-BS-108",
    countryOfOrigin: "India",
    deliveryEstimate: "4-6 days",
    fitType: "Drape style",
    weight: "0.9 kg"
  },
  {
    id: "p5",
    name: "Block-Printed Ikat Bomber Jacket",
    description: "A unisex bomber jacket in hand block-printed ikat cotton, lined with organic cotton. Features ribbed cuffs, vintage brass zip, and two side pockets. Perfect for layering over plain tees or kurtas for a fusion street look.",
    price: 3200,
    mrp: 4500,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b5",
    boutiqueName: "Urban Thread Co.",
    category: "Jackets",
    subCategory: "Bomber Jackets",
    occasion: ["Casual", "Street Style", "College"],
    colors: [
      { name: "Indigo Ikat", hex: "#3F51B5" },
      { name: "Rust Ikat", hex: "#B7410E" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: false }
    ],
    fabric: "Block-Printed Cotton",
    fabricComposition: "100% Organic Cotton, Cotton Lining",
    careInstructions: ["Machine wash cold", "Do not bleach", "Hang dry", "Iron on medium heat"],
    rating: 4.5,
    reviewCount: 187,
    isNew: true,
    isTrending: false,
    isLimitedEdition: false,
    tags: ["Unisex", "Streetwear", "Handblock", "Sustainable"],
    sku: "UTC-BJ-023",
    countryOfOrigin: "India",
    deliveryEstimate: "2-4 days",
    fitType: "Relaxed fit",
    weight: "0.4 kg"
  },
  {
    id: "p6",
    name: "Chikankari Anarkali Kurta Set",
    description: "An ethereal white-on-white Lucknowi chikankari Anarkali kurta with matching palazzo pants and dupatta. Features shadow work (tepchi) and jaali detailing across the bodice. 8-panel flare for graceful movement.",
    price: 6800,
    mrp: 8500,
    discount: 20,
    images: [
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b6",
    boutiqueName: "Vasansi Jaipur",
    category: "Kurtas",
    subCategory: "Anarkali",
    occasion: ["Festive", "Eid", "Casual Ethnic"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Pastel Pink", hex: "#FFD1DC" },
      { name: "Powder Blue", hex: "#B0E0E6" }
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: true }
    ],
    fabric: "Georgette with Cotton Lining",
    fabricComposition: "100% Faux Georgette, Cotton Slip",
    careInstructions: ["Hand wash in cold water", "Do not wring", "Dry in shade", "Light iron on reverse side"],
    rating: 4.6,
    reviewCount: 328,
    isNew: false,
    isTrending: true,
    isLimitedEdition: false,
    tags: ["Chikankari", "Lucknowi", "Ethnic", "Handcrafted"],
    sku: "VJ-AK-056",
    countryOfOrigin: "India",
    deliveryEstimate: "3-5 days",
    fitType: "Fitted bodice, Flared skirt",
    weight: "0.7 kg"
  },
  {
    id: "p7",
    name: "Contemporary Draped Saree Gown",
    description: "A pre-stitched saree gown in dusty lavender lycra with a sheer embroidered cape. No pinning or pleating required — simply step in and zip. Ideal for those who love the saree silhouette without the hassle.",
    price: 14500,
    mrp: 18000,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b3",
    boutiqueName: "Maison de Luxe",
    category: "Saree Gowns",
    subCategory: "Pre-Stitched",
    occasion: ["Party", "Reception", "Sangeet"],
    colors: [
      { name: "Dusty Lavender", hex: "#B4A7D6" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Teal", hex: "#008080" }
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false }
    ],
    fabric: "Lycra with Net Cape",
    fabricComposition: "92% Polyester, 8% Spandex; Net Cape: 100% Nylon",
    careInstructions: ["Dry clean recommended", "Do not iron directly on embroidery", "Store on padded hanger"],
    rating: 4.7,
    reviewCount: 156,
    isNew: true,
    isTrending: true,
    isLimitedEdition: false,
    tags: ["Modern", "Pre-Stitched", "Party Wear", "Easy Drape"],
    sku: "MDL-SG-019",
    countryOfOrigin: "India",
    deliveryEstimate: "2-4 days",
    fitType: "Body-hugging with pre-set pleats",
    weight: "0.8 kg"
  },
  {
    id: "p8",
    name: "Organic Cotton Kurta - Ajrakh Print",
    description: "A relaxed-fit kurta in hand block-printed Ajrakh fabric from Kutch. The natural indigo and madder dyes create the signature geometric patterns of this 4000-year-old printing tradition. Pairs beautifully with white palazzos or jeans.",
    price: 2200,
    mrp: 2800,
    discount: 21,
    images: [
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&h=1000&fit=crop"
    ],
    boutiqueId: "b2",
    boutiqueName: "The Loom Studio",
    category: "Kurtas",
    subCategory: "Straight Kurta",
    occasion: ["Casual", "Office", "Daily Wear"],
    colors: [
      { name: "Indigo", hex: "#3F51B5" },
      { name: "Madder Red", hex: "#A52A2A" },
      { name: "Natural", hex: "#F5F5DC" }
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true }
    ],
    fabric: "Organic Cotton",
    fabricComposition: "100% GOTS Certified Organic Cotton",
    careInstructions: ["Hand wash separately (initial dye bleed expected)", "Do not bleach", "Dry in shade", "Warm iron"],
    rating: 4.4,
    reviewCount: 543,
    isNew: false,
    isTrending: false,
    isLimitedEdition: false,
    tags: ["Sustainable", "Ajrakh", "Handblock", "Organic"],
    sku: "TLS-AK-031",
    countryOfOrigin: "India",
    deliveryEstimate: "2-4 days",
    fitType: "Relaxed fit",
    weight: "0.3 kg"
  }
];

// --- OCCASIONS ---
export interface OccasionCategory {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const occasions: OccasionCategory[] = [
  { id: "wedding", name: "Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop", productCount: 2340 },
  { id: "festive", name: "Festive", image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=500&fit=crop", productCount: 3120 },
  { id: "office", name: "Office", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=500&fit=crop", productCount: 1890 },
  { id: "casual", name: "Casual", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop", productCount: 4560 },
  { id: "party", name: "Party", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=500&fit=crop", productCount: 1670 },
  { id: "beach", name: "Beach & Travel", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop", productCount: 890 },
  { id: "bridal", name: "Bridal", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop", productCount: 1240 },
  { id: "mehendi", name: "Mehendi", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=500&fit=crop", productCount: 780 }
];

// --- STYLE CATEGORIES ---
export interface StyleCategory {
  id: string;
  name: string;
  image: string;
}

export const styleCategories: StyleCategory[] = [
  { id: "ethnic", name: "Ethnic", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=300&h=300&fit=crop" },
  { id: "western", name: "Western", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=300&h=300&fit=crop" },
  { id: "indo-western", name: "Indo-Western", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=300&h=300&fit=crop" },
  { id: "boho", name: "Boho", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop" },
  { id: "minimalist", name: "Minimalist", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop" },
  { id: "streetwear", name: "Streetwear", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300&h=300&fit=crop" }
];

// --- REVIEWS ---
export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  text: string;
  images: string[];
  date: string;
  isVerified: boolean;
  sizePurchased: string;
  bodyType: string;
  helpfulCount: number;
  boutiqueResponse?: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userName: "Sneha Kapoor",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    rating: 5,
    title: "Absolutely breathtaking bridal lehenga!",
    text: "I wore this for my wedding reception and received non-stop compliments. The zardozi work is even more stunning in person — the photos don't do it justice. The team at Ananya Couture customized the blouse perfectly to my measurements. Worth every rupee for the most important day of your life.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop"
    ],
    date: "2026-03-15",
    isVerified: true,
    sizePurchased: "M (Custom)",
    bodyType: "Hourglass",
    helpfulCount: 47,
    boutiqueResponse: "Thank you so much, Sneha! It was an honour to be a part of your special day. We loved creating this piece for you! 💕"
  },
  {
    id: "r2",
    productId: "p2",
    userName: "Deepa Menon",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    rating: 4,
    title: "Beautiful saree, slight color difference",
    text: "The craftsmanship is beautiful and the fabric feels luxurious. The jade green is slightly more muted in person compared to the photos — it's a bit more sage than jade. Still gorgeous though, and I wore it to a Ganesh Chaturthi celebration and got many compliments. The pallu drapes beautifully.",
    images: [],
    date: "2026-03-10",
    isVerified: true,
    sizePurchased: "Free Size",
    bodyType: "Pear",
    helpfulCount: 23
  },
  {
    id: "r3",
    productId: "p5",
    userName: "Arjun Reddy",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    rating: 5,
    title: "Best fusion piece I own",
    text: "This bomber is fire. The block print is unique and I get asked about it everywhere I go. Fits true to size — I'm 5'11 and the L is perfect. The quality is insane for this price. Already planning to get the rust colorway too.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    ],
    date: "2026-03-08",
    isVerified: true,
    sizePurchased: "L",
    bodyType: "Athletic",
    helpfulCount: 31
  },
  {
    id: "r4",
    productId: "p6",
    userName: "Fatima Sheikh",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    rating: 5,
    title: "Chikankari perfection",
    text: "I've been looking for an authentic chikankari Anarkali for ages and this is exactly what I wanted. The shadow work is intricate and the fabric flows like a dream. I wore it for Eid and the 8-panel flare looked absolutely royal. Sizing was accurate — the M fit me perfectly at 5'4.",
    images: [],
    date: "2026-02-28",
    isVerified: true,
    sizePurchased: "M",
    bodyType: "Apple",
    helpfulCount: 18
  }
];

// --- ORDERS ---
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  statusHistory: { status: string; date: string; time: string }[];
  items: { product: Product; quantity: number; size: string; color: string }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
  estimatedDelivery: string;
  trackingId?: string;
  isCustomOrder: boolean;
}

export const orders: Order[] = [
  {
    id: "o1",
    orderNumber: "SV-2026-78432",
    date: "2026-03-20",
    status: "In Transit",
    statusHistory: [
      { status: "Order Placed", date: "2026-03-20", time: "10:30 AM" },
      { status: "Payment Confirmed", date: "2026-03-20", time: "10:31 AM" },
      { status: "Processing", date: "2026-03-20", time: "02:15 PM" },
      { status: "Shipped", date: "2026-03-22", time: "11:00 AM" },
      { status: "In Transit", date: "2026-03-24", time: "08:45 AM" }
    ],
    items: [
      { product: products[1], quantity: 1, size: "Free Size", color: "Jade Green" },
      { product: products[5], quantity: 1, size: "M", color: "White" }
    ],
    subtotal: 15300,
    shipping: 0,
    discount: 1530,
    total: 13770,
    paymentMethod: "UPI - Google Pay",
    deliveryAddress: "42, Whitefield Road, Bengaluru, Karnataka - 560066",
    estimatedDelivery: "March 28, 2026",
    trackingId: "DLVR-987654321",
    isCustomOrder: false
  },
  {
    id: "o2",
    orderNumber: "SV-2026-78501",
    date: "2026-03-10",
    status: "Delivered",
    statusHistory: [
      { status: "Order Placed", date: "2026-03-10", time: "04:20 PM" },
      { status: "Payment Confirmed", date: "2026-03-10", time: "04:21 PM" },
      { status: "Processing", date: "2026-03-11", time: "09:00 AM" },
      { status: "Shipped", date: "2026-03-12", time: "01:30 PM" },
      { status: "In Transit", date: "2026-03-13", time: "07:00 AM" },
      { status: "Out for Delivery", date: "2026-03-14", time: "09:15 AM" },
      { status: "Delivered", date: "2026-03-14", time: "02:45 PM" }
    ],
    items: [
      { product: products[4], quantity: 2, size: "L", color: "Indigo Ikat" }
    ],
    subtotal: 6400,
    shipping: 99,
    discount: 640,
    total: 5859,
    paymentMethod: "Credit Card - ****4521",
    deliveryAddress: "15, Hauz Khas Village, New Delhi - 110016",
    estimatedDelivery: "March 14, 2026",
    trackingId: "DLVR-123456789",
    isCustomOrder: false
  }
];

// --- CUSTOM TAILORING ---
export interface CustomOrder {
  id: string;
  orderNumber: string;
  garmentType: string;
  customerName: string;
  status: string;
  stages: { name: string; status: "completed" | "active" | "pending"; date?: string }[];
  measurements: { label: string; value: string }[];
  designSpecs: { label: string; value: string }[];
  fabricName: string;
  fabricImage: string;
  dueDate: string;
  price: number;
  advancePaid: number;
  tailorName: string;
  tailorAvatar: string;
  referenceImages: string[];
  notes: string;
}

export const customOrders: CustomOrder[] = [
  {
    id: "co1",
    orderNumber: "SV-CUS-2026-341",
    garmentType: "Bridal Lehenga",
    customerName: "Priya Sharma",
    status: "Stitching In Progress",
    stages: [
      { name: "Order Confirmed", status: "completed", date: "2026-02-15" },
      { name: "Fabric Sourced", status: "completed", date: "2026-02-20" },
      { name: "Cutting", status: "completed", date: "2026-02-25" },
      { name: "Stitching", status: "active", date: "2026-03-01" },
      { name: "Embellishment", status: "pending" },
      { name: "Trial Ready", status: "pending" },
      { name: "Final Delivery", status: "pending" }
    ],
    measurements: [
      { label: "Bust", value: "36 inches" },
      { label: "Waist", value: "28 inches" },
      { label: "Hips", value: "38 inches" },
      { label: "Shoulder", value: "14 inches" },
      { label: "Blouse Length", value: "15 inches" },
      { label: "Lehenga Length", value: "42 inches" },
      { label: "Lehenga Waist", value: "28 inches" }
    ],
    designSpecs: [
      { label: "Neckline", value: "Sweetheart" },
      { label: "Sleeve Type", value: "Elbow-length with scallop edge" },
      { label: "Lehenga Flare", value: "5 meters (Bridal circle)" },
      { label: "Embroidery", value: "Heavy zardozi with stone work" },
      { label: "Dupatta", value: "Net with matching border" }
    ],
    fabricName: "Raw Silk - Deep Maroon",
    fabricImage: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&h=200&fit=crop",
    dueDate: "2026-04-10",
    price: 175000,
    advancePaid: 87500,
    tailorName: "Masterji Ramesh Kumar",
    tailorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    referenceImages: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=400&h=400&fit=crop"
    ],
    notes: "Customer wants heavy work on bodice but minimal on lehenga below knee. Dupatta border should match blouse embroidery exactly."
  }
];

// --- FABRICS ---
export interface Fabric {
  id: string;
  name: string;
  type: string;
  image: string;
  pricePerMeter: number;
  composition: string;
  weight: string;
  weave: string;
  colors: string[];
  season: string[];
  available: boolean;
  sustainabilityInfo?: string;
}

export const fabrics: Fabric[] = [
  { id: "f1", name: "Pure Banarasi Silk - Gold Jangla", type: "Silk", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=300&fit=crop", pricePerMeter: 4500, composition: "100% Mulberry Silk", weight: "180 GSM", weave: "Jacquard", colors: ["Red", "Maroon", "Purple", "Green", "Blue"], season: ["All Season", "Festive"], available: true },
  { id: "f2", name: "Chanderi Cotton Silk", type: "Cotton Silk Blend", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop", pricePerMeter: 1200, composition: "60% Silk, 40% Cotton", weight: "80 GSM", weave: "Plain with Zari", colors: ["Green", "Pink", "Blue", "Yellow"], season: ["Summer", "Spring"], available: true },
  { id: "f3", name: "Italian Crepe - Premium", type: "Crepe", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop", pricePerMeter: 800, composition: "100% Polyester", weight: "150 GSM", weave: "Crepe", colors: ["Black", "Navy", "White", "Champagne", "Emerald"], season: ["All Season"], available: true },
  { id: "f4", name: "GOTS Organic Cotton - Ajrakh Block Print", type: "Organic Cotton", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop", pricePerMeter: 650, composition: "100% GOTS Certified Organic Cotton", weight: "120 GSM", weave: "Plain", colors: ["Indigo", "Madder", "Natural"], season: ["Summer", "All Season"], available: true, sustainabilityInfo: "GOTS certified, natural dyes, fair trade" },
  { id: "f5", name: "Raw Silk Dupion", type: "Raw Silk", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=300&fit=crop", pricePerMeter: 2200, composition: "100% Raw Silk", weight: "200 GSM", weave: "Plain Dupion", colors: ["Maroon", "Gold", "Ivory", "Peach", "Teal"], season: ["Winter", "Festive"], available: true },
  { id: "f6", name: "Georgette - Lightweight", type: "Georgette", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=300&h=300&fit=crop", pricePerMeter: 450, composition: "100% Polyester Georgette", weight: "60 GSM", weave: "Crepe", colors: ["White", "Pink", "Blue", "Lilac", "Peach", "Black"], season: ["Summer", "All Season"], available: true }
];

// --- TAILOR PANEL DATA ---
export interface TailorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  garmentType: string;
  priority: "urgent" | "high" | "normal";
  dueDate: string;
  status: string;
  currentStage: string;
  measurements: { label: string; value: string }[];
  designSpecs: string;
  fabricAllocated: string;
  estimatedHours: number;
  earnings: number;
}

export const tailorOrders: TailorOrder[] = [
  { id: "to1", orderNumber: "SV-CUS-2026-341", customerName: "Priya Sharma", garmentType: "Bridal Lehenga", priority: "urgent", dueDate: "2026-04-10", status: "In Progress", currentStage: "Stitching", measurements: [{ label: "Bust", value: "36\"" }, { label: "Waist", value: "28\"" }, { label: "Hips", value: "38\"" }], designSpecs: "Heavy zardozi bridal lehenga with sweetheart neckline", fabricAllocated: "Raw Silk - Deep Maroon (12m)", estimatedHours: 120, earnings: 35000 },
  { id: "to2", orderNumber: "SV-CUS-2026-355", customerName: "Anita Desai", garmentType: "Anarkali Suit", priority: "normal", dueDate: "2026-04-18", status: "In Progress", currentStage: "Cutting", measurements: [{ label: "Bust", value: "34\"" }, { label: "Waist", value: "30\"" }, { label: "Hips", value: "36\"" }], designSpecs: "Floor-length Anarkali with threadwork on bodice", fabricAllocated: "Georgette - Powder Blue (8m)", estimatedHours: 24, earnings: 8000 },
  { id: "to3", orderNumber: "SV-CUS-2026-362", customerName: "Rahul Mehra", garmentType: "Jodhpuri Suit", priority: "high", dueDate: "2026-04-05", status: "In Progress", currentStage: "Stitching", measurements: [{ label: "Chest", value: "40\"" }, { label: "Waist", value: "34\"" }, { label: "Shoulder", value: "18\"" }], designSpecs: "Navy Jodhpuri bandgala with gold buttons, slim fit", fabricAllocated: "Terry Wool - Navy Blue (4m)", estimatedHours: 32, earnings: 12000 },
  { id: "to4", orderNumber: "SV-CUS-2026-370", customerName: "Meera Krishnan", garmentType: "Silk Blouse", priority: "normal", dueDate: "2026-04-20", status: "Pending", currentStage: "Fabric Sourced", measurements: [{ label: "Bust", value: "38\"" }, { label: "Waist", value: "32\"" }, { label: "Shoulder", value: "15\"" }], designSpecs: "Princess cut blouse with boat neck and elbow sleeves", fabricAllocated: "Raw Silk - Teal (2m)", estimatedHours: 8, earnings: 3000 },
  { id: "to5", orderNumber: "SV-CUS-2026-378", customerName: "Kavya Reddy", garmentType: "Reception Gown", priority: "high", dueDate: "2026-04-12", status: "In Progress", currentStage: "Embellishment", measurements: [{ label: "Bust", value: "34\"" }, { label: "Waist", value: "26\"" }, { label: "Hips", value: "36\"" }], designSpecs: "Mermaid silhouette with crystal beadwork on bodice", fabricAllocated: "Satin Crepe - Champagne (6m)", estimatedHours: 48, earnings: 18000 }
];

// --- DASHBOARD ANALYTICS ---
export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  avgOrderValue: number;
  aovChange: number;
  newCustomers: number;
  customersChange: number;
  conversionRate: number;
  returnRate: number;
  activeProducts: number;
  lowStockItems: number;
}

export const dashboardStats: DashboardStats = {
  totalRevenue: 847500,
  revenueChange: 12.5,
  totalOrders: 156,
  ordersChange: 8.3,
  avgOrderValue: 5432,
  aovChange: 3.7,
  newCustomers: 89,
  customersChange: 15.2,
  conversionRate: 3.8,
  returnRate: 4.2,
  activeProducts: 342,
  lowStockItems: 23
};

export const revenueData = [
  { month: "Oct", revenue: 520000, orders: 98 },
  { month: "Nov", revenue: 680000, orders: 124 },
  { month: "Dec", revenue: 920000, orders: 168 },
  { month: "Jan", revenue: 610000, orders: 112 },
  { month: "Feb", revenue: 750000, orders: 138 },
  { month: "Mar", revenue: 847500, orders: 156 }
];

export const topProducts = [
  { name: "Banarasi Silk Saree - Temple Border", units: 47, revenue: 1151500 },
  { name: "Chikankari Anarkali Kurta Set", units: 62, revenue: 421600 },
  { name: "Handloom Chanderi Silk Saree", units: 38, revenue: 323000 },
  { name: "Block-Printed Ikat Bomber", units: 55, revenue: 176000 },
  { name: "Indo-Western Cape Gown", units: 12, revenue: 384000 }
];

// --- CART ---
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export const cartItems: CartItem[] = [
  { product: products[2], quantity: 1, selectedSize: "M", selectedColor: "Midnight Black" },
  { product: products[5], quantity: 2, selectedSize: "S", selectedColor: "White" },
  { product: products[7], quantity: 1, selectedSize: "L", selectedColor: "Indigo" }
];

// --- WISHLISTS ---
export const wishlistItems = [products[0], products[3], products[6], products[1]];

// --- SUBSCRIPTION PLANS ---
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  itemCount: number;
  features: string[];
  isPopular: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: "basic", name: "Basic Box", price: 2499, period: "month", itemCount: 3, features: ["3 curated pieces", "Style profile matching", "Free shipping", "Easy returns"], isPopular: false },
  { id: "premium", name: "Premium Box", price: 4999, period: "month", itemCount: 5, features: ["5 curated pieces", "Personal stylist curation", "Priority shipping", "Keep or return", "Style consultation"], isPopular: true },
  { id: "luxe", name: "Luxe Box", price: 7999, period: "month", itemCount: 7, features: ["7 curated pieces", "Dedicated stylist", "Designer exclusives", "Same-day shipping", "Free alterations", "VIP event access"], isPopular: false }
];

// --- MEMBERSHIP TIERS ---
export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  color: string;
  benefits: string[];
}

export const membershipTiers: MembershipTier[] = [
  { id: "free", name: "Free", price: 0, color: "#9CA3AF", benefits: ["Browse & shop", "Basic size guide", "Standard shipping", "Loyalty points earning"] },
  { id: "silver", name: "Silver", price: 499, color: "#94A3B8", benefits: ["All Free benefits", "Early access (24hr)", "10% off first order monthly", "Priority customer support", "Free shipping over ₹999"] },
  { id: "gold", name: "Gold", price: 1499, color: "#F59E0B", benefits: ["All Silver benefits", "Early access (48hr)", "Free shipping on all orders", "Monthly stylist credit", "Birthday surprise box", "Exclusive member sales"] },
  { id: "platinum", name: "Platinum", price: 4999, color: "#7C3AED", benefits: ["All Gold benefits", "Dedicated personal stylist", "Free minor alterations", "VIP event invitations", "Exclusive designer collabs", "Complimentary gift wrapping", "Quarterly luxury box"] }
];

// --- STYLISTS ---
export interface Stylist {
  id: string;
  name: string;
  avatar: string;
  specialty: string[];
  rating: number;
  sessionsCompleted: number;
  price: number;
  bio: string;
  availability: string[];
}

export const stylists: Stylist[] = [
  { id: "st1", name: "Rhea Malhotra", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", specialty: ["Bridal", "Festive", "Red Carpet"], rating: 4.9, sessionsCompleted: 342, price: 1999, bio: "Former Vogue stylist with 8 years of experience in bridal and occasion dressing. Specializes in blending tradition with contemporary elegance.", availability: ["Mon", "Wed", "Fri", "Sat"] },
  { id: "st2", name: "Karan Oberoi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", specialty: ["Casual", "Streetwear", "Menswear"], rating: 4.7, sessionsCompleted: 198, price: 1499, bio: "Street style maven and GQ contributor. Expert in building capsule wardrobes and fusion casual looks for the modern Indian man and woman.", availability: ["Tue", "Thu", "Sat", "Sun"] },
  { id: "st3", name: "Nandini Iyer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop", specialty: ["Office Wear", "Minimalist", "Sustainable"], rating: 4.8, sessionsCompleted: 267, price: 1499, bio: "Sustainability advocate and corporate styling expert. Helps professionals build eco-conscious, versatile workwear wardrobes without compromising on style.", availability: ["Mon", "Tue", "Wed", "Thu", "Fri"] }
];

// --- NOTIFICATIONS ---
export interface Notification {
  id: string;
  type: "order" | "promo" | "price_drop" | "delivery" | "review" | "loyalty";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
}

export const notifications: Notification[] = [
  { id: "n1", type: "delivery", title: "Out for Delivery", message: "Your order SV-2026-78432 is out for delivery! Expected by 6 PM today.", time: "2 hours ago", isRead: false, actionUrl: "/orders/o1" },
  { id: "n2", type: "price_drop", title: "Price Drop Alert!", message: "Banarasi Silk Saree you wishlisted is now ₹24,500 (was ₹28,000)", time: "5 hours ago", isRead: false, actionUrl: "/products/p4" },
  { id: "n3", type: "promo", title: "Flash Sale: 40% Off!", message: "Holi Special! Up to 40% off on ethnic wear. Ends in 24 hours.", time: "1 day ago", isRead: true },
  { id: "n4", type: "loyalty", title: "Points Earned!", message: "You earned 150 Style Points from your last order. Total: 2,340 points.", time: "2 days ago", isRead: true },
  { id: "n5", type: "review", title: "Share Your Experience", message: "How's your Block-Printed Ikat Bomber? Write a review and earn 50 points.", time: "3 days ago", isRead: true }
];

// --- CRM CUSTOMERS ---
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  loyaltyTier: string;
  loyaltyPoints: number;
  tags: string[];
  measurements?: { label: string; value: string }[];
  preferredCategories: string[];
  joinDate: string;
}

export const customers: Customer[] = [
  { id: "c1", name: "Priya Sharma", email: "priya.sharma@email.com", phone: "+91 98765 43210", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", totalOrders: 12, totalSpent: 287400, lastOrderDate: "2026-03-20", loyaltyTier: "Gold", loyaltyPoints: 4280, tags: ["Bridal", "High-Value", "Custom Orders"], measurements: [{ label: "Bust", value: "36\"" }, { label: "Waist", value: "28\"" }, { label: "Hips", value: "38\"" }], preferredCategories: ["Bridal", "Ethnic", "Festive"], joinDate: "2025-06-15" },
  { id: "c2", name: "Ananya Gupta", email: "ananya.g@email.com", phone: "+91 87654 32109", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", totalOrders: 8, totalSpent: 42600, lastOrderDate: "2026-03-18", loyaltyTier: "Silver", loyaltyPoints: 1890, tags: ["Trendsetter", "Instagram Sharer"], preferredCategories: ["Indo-Western", "Party", "Designer"], joinDate: "2025-09-02" },
  { id: "c3", name: "Deepa Menon", email: "deepa.menon@email.com", phone: "+91 76543 21098", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", totalOrders: 23, totalSpent: 156800, lastOrderDate: "2026-03-22", loyaltyTier: "Platinum", loyaltyPoints: 8920, tags: ["VIP", "Repeat Buyer", "Saree Lover"], preferredCategories: ["Sarees", "Ethnic", "Sustainable"], joinDate: "2024-11-30" },
  { id: "c4", name: "Rahul Mehra", email: "rahul.m@email.com", phone: "+91 65432 10987", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", totalOrders: 5, totalSpent: 28500, lastOrderDate: "2026-03-05", loyaltyTier: "Silver", loyaltyPoints: 1240, tags: ["Custom Orders", "Menswear"], measurements: [{ label: "Chest", value: "40\"" }, { label: "Waist", value: "34\"" }], preferredCategories: ["Formal", "Suits", "Ethnic Men"], joinDate: "2025-12-10" },
  { id: "c5", name: "Kavya Reddy", email: "kavya.r@email.com", phone: "+91 54321 09876", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop", totalOrders: 3, totalSpent: 67500, lastOrderDate: "2026-02-28", loyaltyTier: "Gold", loyaltyPoints: 2100, tags: ["Bridal", "New Customer"], preferredCategories: ["Bridal", "Reception", "Party"], joinDate: "2026-01-15" }
];

// --- APPOINTMENT SLOTS ---
export interface AppointmentSlot {
  date: string;
  time: string;
  type: string;
  boutiqueName: string;
  isAvailable: boolean;
}

export const appointmentSlots: AppointmentSlot[] = [
  { date: "2026-03-29", time: "10:00 AM", type: "Bridal Consultation", boutiqueName: "Ananya Couture", isAvailable: true },
  { date: "2026-03-29", time: "11:30 AM", type: "Measurement Session", boutiqueName: "Ananya Couture", isAvailable: true },
  { date: "2026-03-29", time: "02:00 PM", type: "Video Consultation", boutiqueName: "Maison de Luxe", isAvailable: false },
  { date: "2026-03-29", time: "03:30 PM", type: "In-Store Try-On", boutiqueName: "Silk Route Boutique", isAvailable: true },
  { date: "2026-03-30", time: "10:00 AM", type: "Bridal Consultation", boutiqueName: "Ananya Couture", isAvailable: true },
  { date: "2026-03-30", time: "12:00 PM", type: "Personal Styling", boutiqueName: "Maison de Luxe", isAvailable: true },
  { date: "2026-03-30", time: "04:00 PM", type: "Trial Fitting", boutiqueName: "Vasansi Jaipur", isAvailable: true }
];

// --- STYLE QUIZ ---
export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; image: string; value: string }[];
}

export const styleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which outfit would you reach for on a Saturday brunch?",
    options: [
      { label: "Flowy maxi dress", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=350&fit=crop", value: "boho" },
      { label: "Tailored blazer & trousers", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=250&h=350&fit=crop", value: "minimalist" },
      { label: "Embroidered kurta set", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=250&h=350&fit=crop", value: "ethnic" },
      { label: "Graphic tee & cargo pants", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=250&h=350&fit=crop", value: "streetwear" }
    ]
  },
  {
    id: 2,
    question: "Your go-to color palette?",
    options: [
      { label: "Earthy tones (terracotta, olive, rust)", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=250&h=350&fit=crop", value: "boho" },
      { label: "Neutrals (black, white, beige, navy)", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=250&h=350&fit=crop", value: "minimalist" },
      { label: "Rich jewel tones (ruby, emerald, sapphire)", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=250&h=350&fit=crop", value: "ethnic" },
      { label: "Bold pops (neon, tie-dye, color block)", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&h=350&fit=crop", value: "streetwear" }
    ]
  },
  {
    id: 3,
    question: "Pick a wedding guest outfit:",
    options: [
      { label: "Draped saree with statement jewelry", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=250&h=350&fit=crop", value: "ethnic" },
      { label: "Sleek jumpsuit with a cape", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=250&h=350&fit=crop", value: "indo-western" },
      { label: "Printed lehenga with oxidized jewelry", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=250&h=350&fit=crop", value: "boho" },
      { label: "Sharp suit with pocket square", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop", value: "minimalist" }
    ]
  }
];

// --- BRIDAL DATA ---
export interface BridalCollection {
  id: string;
  event: string;
  image: string;
  description: string;
  priceRange: string;
  productCount: number;
}

export const bridalCollections: BridalCollection[] = [
  { id: "bc1", event: "Mehendi", image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&h=400&fit=crop", description: "Playful, colorful outfits for the mehendi ceremony — think vibrant yellows, greens, and floral prints", priceRange: "₹5,000 - ₹35,000", productCount: 124 },
  { id: "bc2", event: "Sangeet", image: "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=600&h=400&fit=crop", description: "Dance-ready glamour — sequined lehengas, shimmer gowns, and fusion outfits that move with you", priceRange: "₹8,000 - ₹65,000", productCount: 98 },
  { id: "bc3", event: "Wedding Day", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop", description: "The centerpiece of your trousseau — traditional bridal lehengas, sarees, and custom ensembles", priceRange: "₹25,000 - ₹3,00,000", productCount: 156 },
  { id: "bc4", event: "Reception", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop", description: "Sophisticated cocktail and reception wear — gowns, saree gowns, and contemporary lehengas", priceRange: "₹12,000 - ₹1,50,000", productCount: 87 }
];

// --- COLLECTIONS (SEASONAL) ---
export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  boutiqueName: string;
  launchDate: string;
  isLive: boolean;
}

export const collections: Collection[] = [
  { id: "col1", name: "Monsoon Melodies 2026", description: "Rain-ready fabrics meet vibrant prints — a collection celebrating India's most romantic season", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop", productCount: 32, boutiqueName: "The Loom Studio", launchDate: "2026-06-01", isLive: false },
  { id: "col2", name: "Festive Grandeur", description: "Our most luxurious festive collection featuring hand-embroidered silks and heritage textiles", image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&h=400&fit=crop", productCount: 48, boutiqueName: "Ananya Couture", launchDate: "2026-03-01", isLive: true },
  { id: "col3", name: "Neo Bombay", description: "Where Mumbai street culture collides with artisan craftsmanship — limited edition drops", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop", productCount: 18, boutiqueName: "Urban Thread Co.", launchDate: "2026-03-15", isLive: true },
  { id: "col4", name: "Summer Whites", description: "Minimalist summer staples in organic cotton and linen — the art of simple dressing", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop", productCount: 24, boutiqueName: "Maison de Luxe", launchDate: "2026-04-15", isLive: false }
];
