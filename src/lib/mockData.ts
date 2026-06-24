// Premium Luxury Headless eCommerce Mock Database

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface ProductVariation {
  id: number;
  attributes: Record<string, string>;
  price: number;
  regularPrice?: number;
  sku: string;
  stockQuantity: number;
  image?: string;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  regularPrice?: number;
  onSale: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  sku: string;
  stockStatus: 'instock' | 'outofstock' | 'onbackorder';
  stockQuantity: number;
  category: string;
  categorySlug: string;
  images: string[]; // gallery containing 10+ premium images
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  specifications: Record<string, string>;
  reviews: Review[];
  faqs: FAQItem[];
  relatedIds: number[];
  frequentlyBoughtTogetherIds: number[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  trending: boolean;
}

// 1. Categories
export const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "/images/categories/electronics.png",
    count: 142,
    description: "Apple-level high-performance personal tech and smart acoustics."
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    image: "/images/categories/fashion.png",
    count: 320,
    description: "Premium editorial tailoring, luxurious fabrics, and iconic fits."
  },
  {
    id: 3,
    name: "Beauty",
    slug: "beauty",
    image: "/images/categories/beauty.png",
    count: 85,
    description: "Luxury organic skincare, designer fragrances, and cosmetics."
  },
  {
    id: 4,
    name: "Furniture",
    slug: "furniture",
    image: "/images/hero/sofa.png",
    count: 64,
    description: "Architectural minimalism for modern, refined living spaces."
  },
  {
    id: 5,
    name: "Home Decor",
    slug: "home-decor",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    count: 98,
    description: "Premium designer objects, lighting, and artistic accents."
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    count: 110,
    description: "Luxury leather goods, timeless timepieces, and travel cases."
  }
];

// Helper to generate dynamic product galleries with highly realistic Unsplash premium links
const techImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", // Headphone main
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop", // Side
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop", // Angle
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop", // Lifestyle
  "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop", // Desktop setup
  "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop", // Closeup detail
  "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&auto=format&fit=crop", // White headphone
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=800&auto=format&fit=crop", // Studio angle
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop", // Ear detail
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
];

// 2. Comprehensive Products
export const products: Product[] = [
  {
    id: 101,
    name: "AeroSound Pro Max ANC Headphones",
    slug: "aerosound-pro-max-anc-headphones",
    price: 399,
    regularPrice: 449,
    onSale: true,
    rating: 4.9,
    reviewCount: 124,
    description: "Engineered for pure acoustics and absolute isolation. The AeroSound Pro Max features custom-tuned dynamic drivers, Hybrid Active Noise Cancellation (ANC), Transparency Mode, and spatial audio tracking that adapts dynamically to your surroundings. Handcrafted aluminum shell with Italian Nappa leather headband ensures ultimate comfort.",
    shortDescription: "Studio-grade wireless acoustics with custom titanium drivers and hybrid noise cancellation.",
    sku: "AUDIO-AS-PRO-MX",
    stockStatus: "instock",
    stockQuantity: 42,
    category: "Electronics",
    categorySlug: "electronics",
    images: [
      "/images/categories/electronics.png", // our premium generated black headphones
      ...techImages.slice(1)
    ],
    attributes: [
      { name: "Color", options: ["Space Gray", "Silver Silver", "Obsidian Black"] },
      { name: "Connectivity", options: ["Bluetooth 5.3", "Ultra-Low Latency Wireless"] }
    ],
    variations: [
      { id: 1011, attributes: { "Color": "Space Gray" }, price: 399, regularPrice: 449, sku: "AUDIO-AS-PRO-SG", stockQuantity: 15 },
      { id: 1012, attributes: { "Color": "Silver Silver" }, price: 399, regularPrice: 449, sku: "AUDIO-AS-PRO-SL", stockQuantity: 20 },
      { id: 1013, attributes: { "Color": "Obsidian Black" }, price: 419, regularPrice: 469, sku: "AUDIO-AS-PRO-OB", stockQuantity: 7 }
    ],
    specifications: {
      "Driver Unit": "40mm Custom Titanium Dynamic",
      "Frequency Response": "5Hz - 40,000Hz",
      "Battery Life": "Up to 45 Hours (ANC On)",
      "Charging": "USB-C Quick Charge (10 mins = 5 hours play)",
      "Weight": "285 grams",
      "Microphones": "6 Beamforming High-Definition Mics"
    },
    reviews: [
      {
        id: 1,
        author: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-05-12",
        title: "Absolute sonic perfection",
        content: "I have used Sennheiser and Sony flagships for years. The sound signature of these headphones is completely on another level. Very precise, fast transients, and the luxury finish is superb.",
        verified: true
      },
      {
        id: 2,
        author: "Eleanor Sterling",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-06-02",
        title: "Gorgeous design and extremely comfortable",
        content: "It feels like a high-end luxury accessory. The leather padding does not pressure my ears at all, and it fits comfortably for 8-hour flights. ANC completely removes aircraft hum.",
        verified: true
      }
    ],
    faqs: [
      { question: "Is spatial audio compatible with all devices?", answer: "Yes, the spatial audio algorithm runs directly on the headphones' internal DSP, rendering immersive 3D audio from any standard stereo source." },
      { question: "Does it support passive wired listening?", answer: "Yes, it includes a premium gold-plated USB-C to 3.5mm analog audio cable for lag-free wired listening even when the battery is completely depleted." }
    ],
    relatedIds: [102, 103],
    frequentlyBoughtTogetherIds: [102],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 102,
    name: "Chronos Titanium Smartwatch v4",
    slug: "chronos-titanium-smartwatch-v4",
    price: 749,
    regularPrice: 799,
    onSale: true,
    rating: 4.8,
    reviewCount: 96,
    description: "The peak of luxury wearables. Sculpted from Aerospace-grade Grade 5 Titanium with a premium sapphire crystal dome, the Chronos Smartwatch merges traditional horological design with cutting-edge health telemetry. Features an custom LTPO OLED screen, offline GPS maps, ECG monitor, blood oxygen tracker, and up to 7 days of power on a single charge.",
    shortDescription: "Aerospace-grade titanium chassis, sapphire crystal display, and advanced biometric analytics.",
    sku: "WEAR-CH-TITAN-4",
    stockStatus: "instock",
    stockQuantity: 18,
    category: "Electronics",
    categorySlug: "electronics",
    images: [
      "/images/hero/watch.png", // our premium generated titanium smartwatch
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Strap", options: ["Titanium Link", "Sleek Sport Loop", "Florentine Leather"] }
    ],
    variations: [
      { id: 1021, attributes: { "Strap": "Titanium Link" }, price: 799, sku: "WEAR-CH-TITAN-TL", stockQuantity: 5 },
      { id: 1022, attributes: { "Strap": "Sleek Sport Loop" }, price: 749, sku: "WEAR-CH-TITAN-SL", stockQuantity: 10 },
      { id: 1023, attributes: { "Strap": "Florentine Leather" }, price: 779, sku: "WEAR-CH-TITAN-FL", stockQuantity: 3 }
    ],
    specifications: {
      "Chassis Material": "Grade 5 Titanium & Ceramic Backing",
      "Glass": "Pure Curved Synthetic Sapphire Crystal",
      "Water Resistance": "100m (10 ATM) / Diver Standard",
      "Sensors": "Optical Heart Rate, SpO2, ECG, Barometric Altimeter, Gyroscope",
      "Battery": "380mAh Lithium-Cobalt (Fast charge 0-80% in 35 mins)"
    },
    reviews: [
      {
        id: 3,
        author: "Julian Thorne",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-04-18",
        title: "Elite luxury timepiece",
        content: "This makes the Apple Watch Ultra look like a children's toy. The titanium link strap feels incredibly premium. Watch faces are very elegant and it integrates perfectly with iOS/Android.",
        verified: true
      }
    ],
    faqs: [
      { question: "Is the battery replaceable?", answer: "Yes, the battery can be replaced at any authorized boutique store to prolong the life of your premium luxury hardware." }
    ],
    relatedIds: [101, 103],
    frequentlyBoughtTogetherIds: [101],
    featured: true,
    bestSeller: false,
    newArrival: true,
    trending: true
  },
  {
    id: 103,
    name: "Helix Stream 8K Home Cinema Projector",
    slug: "helix-stream-8k-home-cinema-projector",
    price: 2499,
    onSale: false,
    rating: 5.0,
    reviewCount: 38,
    description: "Transform your architectural interior into an ultra-high-definition cinema. The Helix Stream features true native 8K resolution, 3200 ANSI Lumens, and an ultra-short-throw laser system capable of projecting a stunning 150-inch screen from just inches away. Equipped with a custom Harman Kardon glass-molded acoustic bar.",
    shortDescription: "Ultra-short-throw 8K laser projector with built-in Harman Kardon acoustics.",
    sku: "VIDEO-HX-8K-UST",
    stockStatus: "instock",
    stockQuantity: 8,
    category: "Electronics",
    categorySlug: "electronics",
    images: [
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [],
    variations: [],
    specifications: {
      "Resolution": "Real Native 8K UHD",
      "Brightness": "3,200 ANSI Lumens",
      "Contrast Ratio": "2,000,000:1 Dynamic",
      "Projection Size": "80\" to 150\" Diagonal",
      "Sound System": "60W Dolby Atmos Soundbar built-in"
    },
    reviews: [],
    faqs: [],
    relatedIds: [101, 102],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: true,
    trending: false
  },
  {
    id: 201,
    name: "Atelier Minimal Cashmere Trench Coat",
    slug: "atelier-minimal-cashmere-trench-coat",
    price: 899,
    regularPrice: 999,
    onSale: true,
    rating: 4.8,
    reviewCount: 64,
    description: "The ultimate wardrobe investment. Tailored by hand in our Florence atelier, this trench coat is cut from a luxurious blend of 80% Virgin Wool and 20% Mongolian Cashmere. Styled with structured shoulders, dynamic double-breasted closure, and a premium storm flap. Designed to drape elegantly, offering unparalleled warmth and fluid movement.",
    shortDescription: "Hand-tailored Florentine double-breasted trench in wool-cashmere blend.",
    sku: "CLOTH-AT-TRENCH-COAT",
    stockStatus: "instock",
    stockQuantity: 12,
    category: "Fashion",
    categorySlug: "fashion",
    images: [
      "/images/categories/fashion.png", // our premium generated minimal trench coat
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { name: "Color", options: ["Camel Sand", "Midnight Navy", "Noir Black"] }
    ],
    variations: [
      { id: 2011, attributes: { "Size": "S", "Color": "Camel Sand" }, price: 899, sku: "CLOTH-AT-T-CS-S", stockQuantity: 3 },
      { id: 2012, attributes: { "Size": "M", "Color": "Camel Sand" }, price: 899, sku: "CLOTH-AT-T-CS-M", stockQuantity: 4 },
      { id: 2013, attributes: { "Size": "L", "Color": "Camel Sand" }, price: 899, sku: "CLOTH-AT-T-CS-L", stockQuantity: 2 },
      { id: 2014, attributes: { "Size": "M", "Color": "Midnight Navy" }, price: 899, sku: "CLOTH-AT-T-MN-M", stockQuantity: 3 }
    ],
    specifications: {
      "Fabric Composition": "80% Virgin Wool, 20% Mongolian Cashmere",
      "Lining": "100% Cupro Silk Lining (Anti-static)",
      "Fit": "Tailored Oversized Drape",
      "Origin": "Hand-stitched in Florence, Italy",
      "Dry Clean": "Professional dry clean only"
    },
    reviews: [
      {
        id: 4,
        author: "Sofia Loren",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-05-20",
        title: "Magnificent drape and texture",
        content: "This coat is absolutely flawless. The wool-cashmere blend feels like butter, and the camel sand color is deep and rich. It sits perfectly on the shoulders.",
        verified: true
      }
    ],
    faqs: [
      { question: "Is this coat warm enough for harsh winters?", answer: "Yes, the dense weave of virgin wool and cashmere provides natural thermal insulation down to -5°C (23°F), especially when layered." }
    ],
    relatedIds: [202, 203],
    frequentlyBoughtTogetherIds: [203],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: false
  },
  {
    id: 202,
    name: "Luxe Calfskin Saddle Bag",
    slug: "luxe-calfskin-saddle-bag",
    price: 1200,
    onSale: false,
    rating: 4.9,
    reviewCount: 42,
    description: "Crafted in small batches from full-grain French box calfskin, this saddle bag exhibits structured elegance. It features hand-painted raw edges, micro-suede lining, custom solid brass hardware in a matte gold finish, and an adjustable shoulder strap for shoulder or crossbody carry.",
    shortDescription: "Full-grain French calfskin saddle bag with matte gold brass hardware.",
    sku: "ACC-L-SADDLE-BAG",
    stockStatus: "instock",
    stockQuantity: 5,
    category: "Fashion",
    categorySlug: "fashion",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Color", options: ["Amber Gold", "Burgundy Cherry", "Classic Black"] }
    ],
    variations: [],
    specifications: {
      "Material": "French Box Calfskin Leather",
      "Hardware": "Matte Solid Brass",
      "Internal Slots": "1 Zipper Pocket, 2 Card Slots",
      "Dimensions": "22cm x 18cm x 7cm"
    },
    reviews: [],
    faqs: [],
    relatedIds: [201, 203],
    frequentlyBoughtTogetherIds: [201],
    featured: false,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 301,
    name: "Nectar Infusion Cellular Serum",
    slug: "nectar-infusion-cellular-serum",
    price: 185,
    regularPrice: 210,
    onSale: true,
    rating: 4.95,
    reviewCount: 215,
    description: "An advanced cellular renewing elixir. Combining plant-derived stem cells, pure multi-weight hyaluronic acid, and white truffle extract, Nectar Infusion acts on a deep cellular level to plump wrinkles, restore elasticity, and stimulate collagen production. Radiance is visibly restored in just 7 days of night application.",
    shortDescription: "Stem-cell cellular renewing serum with organic white truffle extract.",
    sku: "BEAUTY-NC-SERUM",
    stockStatus: "instock",
    stockQuantity: 120,
    category: "Beauty",
    categorySlug: "beauty",
    images: [
      "/images/categories/beauty.png", // our premium generated perfume/serum bottle
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Volume", options: ["30ml", "50ml"] }
    ],
    variations: [
      { id: 3011, attributes: { "Volume": "30ml" }, price: 185, regularPrice: 210, sku: "BEAUTY-NC-S-30", stockQuantity: 80 },
      { id: 3012, attributes: { "Volume": "50ml" }, price: 245, regularPrice: 275, sku: "BEAUTY-NC-S-50", stockQuantity: 40 }
    ],
    specifications: {
      "Skin Type": "Suitable for all skin types, including highly sensitive skin",
      "Application Time": "Evening, post-cleansing",
      "Key Actives": "Swiss Alpine Stem Cells, White Truffle, Triple Hyaluronic Acid",
      "Formulation": "98.4% Natural Origin ingredients, Vegan, Cruelty-free"
    },
    reviews: [
      {
        id: 5,
        author: "Isabella Cruz",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-06-11",
        title: "Pure botanical luxury",
        content: "This serum literally erased my stress lines in a week. It absorbs immediately and does not leave a greasy layer. The scent of white rose is divine.",
        verified: true
      }
    ],
    faqs: [],
    relatedIds: [302],
    frequentlyBoughtTogetherIds: [302],
    featured: true,
    bestSeller: true,
    newArrival: true,
    trending: false
  },
  {
    id: 401,
    name: "Soren Bauhaus Leather Lounge Chair",
    slug: "soren-bauhaus-leather-lounge-chair",
    price: 1850,
    onSale: false,
    rating: 4.85,
    reviewCount: 29,
    description: "An architectural icon. Soren is an homage to mid-century Scandinavian design, meticulously crafted from solid kiln-dried American walnut and upholstered in premium aniline pull-up leather. The chair features a suspended leather sling that contours dynamically to your body, offering suspended floating comfort.",
    shortDescription: "Solid American walnut frame lounge chair in premium full-aniline leather.",
    sku: "FURN-SR-CHAIR",
    stockStatus: "instock",
    stockQuantity: 4,
    category: "Furniture",
    categorySlug: "furniture",
    images: [
      "/images/hero/sofa.png", // our premium generated interior sofa/chair environment
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Leather", options: ["Tan Aniline", "Cognac Brown", "Soot Black"] }
    ],
    variations: [
      { id: 4011, attributes: { "Leather": "Tan Aniline" }, price: 1850, sku: "FURN-SR-TAN", stockQuantity: 2 },
      { id: 4012, attributes: { "Leather": "Cognac Brown" }, price: 1850, sku: "FURN-SR-COG", stockQuantity: 1 },
      { id: 4013, attributes: { "Leather": "Soot Black" }, price: 1900, sku: "FURN-SR-BLK", stockQuantity: 1 }
    ],
    specifications: {
      "Frame": "Kiln-dried Solid American Walnut",
      "Upholstery": "100% Full-grain Aniline Pull-up Leather (Italian)",
      "Foam": "High-resiliency multi-density foam",
      "Dimensions": "84cm Height x 72cm Width x 80cm Depth"
    },
    reviews: [
      {
        id: 6,
        author: "Arthur Pendelton",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2026-05-14",
        title: "Architectural masterpiece",
        content: "The wood joinery is completely seamless. The leather smells beautiful and has already developed a wonderful rich patina in two months of sitting in my library.",
        verified: true
      }
    ],
    faqs: [],
    relatedIds: [402],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: false,
    newArrival: false,
    trending: true
  },
  {
    id: 203,
    name: "Classic Silk Oxford Button-Down",
    slug: "classic-silk-oxford-button-down",
    price: 245,
    onSale: false,
    rating: 4.75,
    reviewCount: 22,
    description: "An understated luxury essential. Cut from a heavy Mulberry silk-cotton blend fabric, this button-down features a relaxed tailored fit, mother-of-pearl buttons, and structured single-needle stitching.",
    shortDescription: "Heavy Mulberry silk-cotton blend Oxford shirt with mother-of-pearl buttons.",
    sku: "CLOTH-AT-OXFORD",
    stockStatus: "instock",
    stockQuantity: 24,
    category: "Fashion",
    categorySlug: "fashion",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [
      { name: "Size", options: ["S", "M", "L"] }
    ],
    variations: [],
    specifications: {
      "Material": "70% Organic Cotton, 30% Mulberry Silk",
      "Tailoring": "Single-needle flat felled seams",
      "Origin": "Florence, Italy"
    },
    reviews: [],
    faqs: [],
    relatedIds: [201, 202],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: true,
    trending: false
  },
  {
    id: 302,
    name: "Radiant Rose Hydrating Mist",
    slug: "radiant-rose-hydrating-mist",
    price: 65,
    onSale: false,
    rating: 4.8,
    reviewCount: 48,
    description: "A refreshing botanical hydration boost. Formulated with organic Damask rose hydrosol, aloe leaf juice, and active niacinamide to calm skin irritation, hydrate parched layers, and restore pH balances instantly.",
    shortDescription: "Damask rose hydrosol mist with calming active niacinamide.",
    sku: "BEAUTY-ROSE-MIST",
    stockStatus: "instock",
    stockQuantity: 75,
    category: "Beauty",
    categorySlug: "beauty",
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [],
    variations: [],
    specifications: {
      "Scent": "Natural Bulgarian Damask Rose",
      "Volume": "100ml",
      "Key Actives": "Rose Hydrosol, Niacinamide, Glycerin"
    },
    reviews: [],
    faqs: [],
    relatedIds: [301],
    frequentlyBoughtTogetherIds: [301],
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: true
  },
  {
    id: 303,
    name: "Squalane Active Renewal Cream",
    slug: "squalane-active-renewal-cream",
    price: 115,
    onSale: false,
    rating: 4.9,
    reviewCount: 34,
    description: "A luxurious nourishing daily cream. Infused with sugarcane-derived squalane oil, peptides, and botanical antioxidants to seal hydration, smooth skin texture, and restore firmness.",
    shortDescription: "Sugarcane squalane daily skin cream with firming peptide chains.",
    sku: "BEAUTY-SQ-CREAM",
    stockStatus: "instock",
    stockQuantity: 50,
    category: "Beauty",
    categorySlug: "beauty",
    images: [
      "/images/products/cream.png"
    ],
    attributes: [],
    variations: [],
    specifications: {
      "Key Actives": "Organic Squalane, Peptide Complex",
      "Volume": "50ml",
      "Skin Concern": "Fine lines, dryness, loss of elasticity"
    },
    reviews: [],
    faqs: [],
    relatedIds: [301, 302],
    frequentlyBoughtTogetherIds: [301],
    featured: true,
    bestSeller: false,
    newArrival: true,
    trending: false
  },
  {
    id: 402,
    name: "Travertine Minimal Coffee Table",
    slug: "travertine-minimal-coffee-table",
    price: 1450,
    onSale: false,
    rating: 4.9,
    reviewCount: 15,
    description: "An architectural center point for refined living rooms. Sculpted from premium Italian cream-toned travertine stone, this block features honed surfaces and organic raw edges that highlight natural textures.",
    shortDescription: "Cream Italian honed travertine coffee table block with natural textured base.",
    sku: "FURN-TRAV-TABLE",
    stockStatus: "instock",
    stockQuantity: 2,
    category: "Furniture",
    categorySlug: "furniture",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [],
    variations: [],
    specifications: {
      "Stone": "Italian Classico Travertine",
      "Finish": "Honed, semi-sealed matte protective coating",
      "Dimensions": "100cm Length x 100cm Width x 32cm Height",
      "Weight": "72kg (Heavy Freight delivery required)"
    },
    reviews: [],
    faqs: [],
    relatedIds: [401],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: false,
    newArrival: false,
    trending: true
  },
  {
    id: 403,
    name: "Soren Walnut Dining Chair",
    slug: "soren-walnut-dining-chair",
    price: 499,
    onSale: true,
    regularPrice: 549,
    rating: 4.8,
    reviewCount: 19,
    description: "Sculpted dining seating matching the Soren series. Made of solid kiln-dried American walnut with curved backrest support and a charcoal grey wool felt seat cushion.",
    shortDescription: "Solid American walnut dining chair with grey wool felt seat pad.",
    sku: "FURN-SR-DINING",
    stockStatus: "instock",
    stockQuantity: 16,
    category: "Furniture",
    categorySlug: "furniture",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop"
    ],
    attributes: [],
    variations: [],
    specifications: {
      "Frame": "Kiln-dried Solid American Walnut",
      "Cushion Upholstery": "80% Wool, 20% Nylon felt",
      "Seat Height": "45cm"
    },
    reviews: [],
    faqs: [],
    relatedIds: [401, 402],
    frequentlyBoughtTogetherIds: [401],
    featured: false,
    bestSeller: true,
    newArrival: true,
    trending: false
  }
];

// 3. Hero Slides
export const heroSlides = [
  {
    id: 1,
    tagline: "The Future of Aesthetics",
    title: "AeroSound ANC v4",
    description: "Experience absolute acoustic isolation wrapped in aerospace titanium and fine Italian leather.",
    primaryCta: "Pre-order Now",
    primaryUrl: "/product/aerosound-pro-max-anc-headphones",
    secondaryCta: "Discover Sound",
    secondaryUrl: "/shop",
    image: "/images/categories/electronics.png"
  },
  {
    id: 2,
    tagline: "Precision Engineering",
    title: "Chronos Wearables",
    description: "Luxury mechanical-level health telemetry forged in Grade 5 titanium and synthetic sapphire crystal.",
    primaryCta: "Shop Chronos",
    primaryUrl: "/product/chronos-titanium-smartwatch-v4",
    secondaryCta: "Watch Campaign",
    secondaryUrl: "/shop",
    image: "/images/hero/watch.png"
  },
  {
    id: 3,
    tagline: "Architectural Living",
    title: "Minimal Soren Sofa",
    description: "Floating comfort suspended in solid kiln-dried American walnut. Timeless Scandinavian minimalism.",
    primaryCta: "View Collection",
    primaryUrl: "/product/soren-bauhaus-leather-lounge-chair",
    secondaryCta: "About Soren",
    secondaryUrl: "/shop",
    image: "/images/hero/sofa.png"
  }
];

// 4. Promo Banners
export const promoBanners = {
  summerSale: {
    title: "The Autumnal Equinox",
    subtitle: "Up to 30% Off Essential Collections",
    desc: "Luxury is in the details. Discover premium, hand-picked garments, acoustics, and furniture designed to elevate your everyday routines.",
    ctaText: "Shop The Sale",
    ctaUrl: "/shop",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
  },
  blackFriday: {
    title: "Black Friday Private Salon",
    subtitle: "VIP Access: Code VIP25 for 25% Off Storewide",
    desc: "A singular annual event. Hand-tailored cashmeres, titanium timepieces, and acoustic sound systems at unmatched VIP discounts.",
    ctaText: "Unlock Access",
    ctaUrl: "/shop",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
  }
};

// 5. Why Choose Us
export const whyChooseUs = [
  {
    title: "White Glove Delivery",
    description: "Complimentary global shipping. Real-time temperature-controlled courier routing with full insurance coverage.",
    icon: "Truck"
  },
  {
    title: "Secure Solid Payment",
    description: "State-of-the-art tokenized cryptographic payments. Supports Apple Pay, Bitcoin, and secure global wire transfers.",
    icon: "ShieldCheck"
  },
  {
    title: "Complimentary Return Concierge",
    description: "30-day effortless returns. We schedule a local courier to pick up return shipments directly from your home or office.",
    icon: "ArrowRightLeft"
  },
  {
    title: "Bespoke Customer Care",
    description: "A dedicated concierge assigned to your account. Available 24/7/365 via encrypted direct WhatsApp or hotline.",
    icon: "Headphones"
  }
];

// 6. Blog Articles
export const blogArticles = [
  {
    id: 1,
    title: "The Architecture of Silence: Designing Acoustic Spaces",
    slug: "the-architecture-of-silence-designing-acoustic-spaces",
    excerpt: "How modern isolation systems and premium materials shape the physical sensation of silence in structural residential design.",
    content: "<p>Silence is no longer the absence of sound; it is a meticulously engineered environment. In modern architecture, the integration of acoustics has shifted from auditoriums to residential suites. We explore the materials that make isolation feel premium: micro-perforated wood, Nappa leather linings, and copper-shielded signal pipelines. High-end headphones leverage these same physical properties to create a personal sanctuary.</p><p>By surrounding drivers in aerospace aluminum shells, soundwaves are isolated, ensuring zero vibration color. In this article, our design team dissects the science of hybrid active cancellations and how it interfaces with natural sound dampening.</p>",
    category: "Design & Sound",
    date: "June 14, 2026",
    author: "Elena Rostov",
    authorRole: "Principal Acoustic Lead",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    readTime: "6 min read",
    tags: ["Acoustics", "Minimalism", "Tech Design"]
  },
  {
    id: 2,
    title: "Florentine Tailoring: The Lifecycle of Italian Cashmere",
    slug: "florentine-tailoring-the-lifecycle-of-italian-cashmere",
    excerpt: "An inside look at our organic combing, washing, and stitching processes in Italy's most storied fabric mills.",
    content: "<p>The story of cashmere begins on the high plateaus of Inner Mongolia, where extreme temperatures prompt Capra Hircus goats to grow a double-layered fleece of incredibly fine, soft fibers. Combed gently by hand in the spring, only the longest fibers are selected for our garments.</p><p>These fibers are transported to Prato, Italy, where mills utilizing volcanic mineral spring water wash, spin, and dye the cashmere with organic botanical pigments. The result is a thread that is five times lighter and warmer than wool, yet breathes naturally. Our master tailors in Florence then shape these panels, hand-stitching buttons and raw hems to create coats that last generations.</p>",
    category: "Heritage & Craft",
    date: "May 28, 2026",
    author: "Mateo Rossi",
    authorRole: "Head of Atelier Design",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    readTime: "8 min read",
    tags: ["Cashmere", "Heritage", "Fashion Mill"]
  }
];

// 7. General FAQs
export const generalFAQs = [
  {
    question: "Do you ship internationally?",
    answer: "Yes. We offer complimentary global express shipping to over 140 countries. All customs declarations, import duties, and local delivery fees are calculated and fully pre-paid at checkout, ensuring no unexpected border charges."
  },
  {
    question: "How can I track my courier?",
    answer: "Once your order is dispatched, you will receive an encrypted SMS link containing real-time GPS tracking of the courier vehicle, along with contact details for your delivery representative."
  },
  {
    question: "What is your return policy?",
    answer: "We offer complimentary concierge pickup for returns within 30 days of delivery. The item must be in original unworn, uninstalled condition with all security tags intact. Simply tap 'Request Return' in your user dashboard, and a courier will arrive at your door."
  },
  {
    question: "How do I care for my aniline leather?",
    answer: "Full-aniline leather is a natural material that breathes. Clean it with a soft, dry cotton cloth. Avoid chemical detergents. We include a complimentary organic beeswax conditioner with every leather purchase; apply it once every six months."
  }
];

// 8. Navigation Menus
export const navigationMenu = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "New Arrivals", href: "/shop?sort=newest" },
    { name: "Bestsellers", href: "/shop?filter=bestseller" }
  ],
  categories: [
    { name: "Electronics & Tech", href: "/shop/category/electronics", slug: "electronics" },
    { name: "High Fashion", href: "/shop/category/fashion", slug: "fashion" },
    { name: "Beauty & Skincare", href: "/shop/category/beauty", slug: "beauty" },
    { name: "Minimal Furniture", href: "/shop/category/furniture", slug: "furniture" }
  ],
  support: [
    { name: "Concierge FAQ", href: "/faq" },
    { name: "Contact Support", href: "/contact" },
    { name: "Return Center", href: "/dashboard/orders" }
  ],
  company: [
    { name: "Our Story", href: "/about" },
    { name: "Heritage Atelier", href: "/about" },
    { name: "Journal", href: "/blog" }
  ],
  policies: [
    { name: "Privacy Protocol", href: "/policies/privacy" },
    { name: "Terms of Engagement", href: "/policies/terms" },
    { name: "Shipping Service", href: "/policies/shipping" },
    { name: "Refund Guideline", href: "/policies/refund" }
  ]
};
