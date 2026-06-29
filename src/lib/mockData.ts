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
  images: string[];
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

export const categories = [
  { id: 1, name: "Herbal Care", slug: "herbal-care", image: "/images/kerala_spices.png", count: 12, description: "Traditional herbal remedies and care products." },
  { id: 2, name: "Skin Care", slug: "skin-care", image: "/images/kerala_coconut_oil.png", count: 8, description: "Natural skincare solutions for a glowing complexion." },
  { id: 3, name: "Baby Care", slug: "baby-care", image: "/images/ayurvedic_cream.png", count: 5, description: "Gentle and pure care products for your little ones." },
  { id: 4, name: "Wellness Products", slug: "wellness-products", image: "/images/kerala_vibe.png", count: 15, description: "Enhance your daily vitality with Ayurvedic wellness." },
  { id: 5, name: "Traditional Foods", slug: "traditional-foods", image: "/images/kerala_herbs.png", count: 20, description: "Authentic and healthy traditional food products." },
  { id: 6, name: "Oils & Ghee", slug: "oils-ghee", image: "/images/kerala_handloom.png", count: 10, description: "Pure, homemade oils and fresh cow ghee." },
  { id: 7, name: "Garments", slug: "garments", image: "/images/kerala_spices.png", count: 25, description: "Traditional and modern ethnic wear." },
  { id: 8, name: "Handloom Products", slug: "handloom-products", image: "/images/kerala_coconut_oil.png", count: 18, description: "Authentic handcrafted Kerala handloom textiles." }
];

export const products: Product[] = [
  {
    id: 101,
    name: "PULARI Herbal Hair Growth Oil",
    slug: "pulari-herbal-hair-growth-oil",
    price: 350,
    regularPrice: 400,
    onSale: true,
    rating: 4.9,
    reviewCount: 152,
    description: "Herbal hair nourishment for hair strengthening and growth support. Made with natural ingredients including curry leaves, coconut, hibiscus flowers, and herbs. Formulated based on traditional Kerala practices to restore natural hair vitality.",
    shortDescription: "Premium herbal hair growth oil with hibiscus and curry leaves.",
    sku: "HERB-PULARI-OIL",
    stockStatus: "instock",
    stockQuantity: 100,
    category: "Herbal Care",
    categorySlug: "herbal-care",
    images: ["/images/ayurvedic_cream.png"],
    attributes: [],
    variations: [],
    specifications: {
      "Ingredients": "Coconut Oil, Hibiscus, Curry Leaves, Amla, Bringaraj",
      "Usage": "Apply thrice a week before bath"
    },
    reviews: [
      { id: 1, author: "Aisha M.", avatar: "/images/kerala_vibe.png", rating: 5, date: "2026-05-12", title: "Amazing Results", content: "I've been using this for a month and can see baby hairs growing. The smell is very herbal and natural.", verified: true }
    ],
    faqs: [],
    relatedIds: [102],
    frequentlyBoughtTogetherIds: [102],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 102,
    name: "Glow Plus Fairness Powder",
    slug: "glow-plus-fairness-powder",
    price: 250,
    regularPrice: 300,
    onSale: true,
    rating: 4.8,
    reviewCount: 89,
    description: "Herbal beauty powder crafted from natural ingredients to enhance skin glow and texture. Ideal for daily use.",
    shortDescription: "Herbal beauty powder in a wooden bowl with natural ingredients.",
    sku: "SKIN-GLOW-PWDR",
    stockStatus: "instock",
    stockQuantity: 150,
    category: "Skin Care",
    categorySlug: "skin-care",
    images: ["/images/kerala_herbs.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [103],
    frequentlyBoughtTogetherIds: [103],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: false
  },
  {
    id: 103,
    name: "Glow Plus Skin Brightening Moisturising Cream",
    slug: "glow-plus-skin-brightening-moisturising-cream",
    price: 450,
    regularPrice: 450,
    onSale: false,
    rating: 4.9,
    reviewCount: 110,
    description: "Premium skincare cream jar infused with Manjistha and other herbal ingredients. Deeply moisturises and brightens the skin naturally.",
    shortDescription: "Skin brightening cream with Manjistha.",
    sku: "SKIN-GLOW-CRM",
    stockStatus: "instock",
    stockQuantity: 60,
    category: "Skin Care",
    categorySlug: "skin-care",
    images: ["/images/kerala_handloom.png"],
    attributes: [],
    variations: [],
    specifications: { "Key Ingredient": "Manjistha" },
    reviews: [],
    faqs: [],
    relatedIds: [102],
    frequentlyBoughtTogetherIds: [102],
    featured: false,
    bestSeller: true,
    newArrival: true,
    trending: true
  },
  {
    id: 104,
    name: "Glow Plus Lip Care Cream",
    slug: "glow-plus-lip-care-cream",
    price: 150,
    regularPrice: 150,
    onSale: false,
    rating: 4.7,
    reviewCount: 45,
    description: "Lip care cream with natural herbs and moisturising ingredients for soft, healthy lips.",
    shortDescription: "Herbal lip care cream.",
    sku: "SKIN-GLOW-LIP",
    stockStatus: "instock",
    stockQuantity: 200,
    category: "Skin Care",
    categorySlug: "skin-care",
    images: ["/images/kerala_spices.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [103],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: false
  },
  {
    id: 105,
    name: "BabyGlow Baby Massage Oil",
    slug: "babyglow-baby-massage-oil",
    price: 300,
    regularPrice: 350,
    onSale: true,
    rating: 5.0,
    reviewCount: 230,
    description: "Gentle natural baby oil formulated for regular baby massage. Nourishes delicate skin and supports healthy bone development.",
    shortDescription: "Natural baby massage oil.",
    sku: "BABY-GLOW-OIL",
    stockStatus: "instock",
    stockQuantity: 120,
    category: "Baby Care",
    categorySlug: "baby-care",
    images: ["/images/kerala_coconut_oil.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 106,
    name: "Stretch Ease Stretch Mark Removing Cream",
    slug: "stretch-ease-stretch-mark-removing-cream",
    price: 550,
    regularPrice: 600,
    onSale: true,
    rating: 4.6,
    reviewCount: 65,
    description: "Premium skincare cream formulated to gently fade stretch marks using potent natural Ayurvedic extracts.",
    shortDescription: "Cream for stretch mark care.",
    sku: "SKIN-STRETCH-CRM",
    stockStatus: "instock",
    stockQuantity: 80,
    category: "Skin Care",
    categorySlug: "skin-care",
    images: ["/images/ayurvedic_cream.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: true,
    trending: false
  },
  {
    id: 107,
    name: "Ojas Boost – Ojas Enhancing Powder",
    slug: "ojas-boost-ojas-enhancing-powder",
    price: 400,
    regularPrice: 400,
    onSale: false,
    rating: 4.8,
    reviewCount: 120,
    description: "Ayurvedic wellness powder with herbs and natural ingredients designed to boost energy, vitality (Ojas), and immunity.",
    shortDescription: "Ayurvedic vitality and wellness powder.",
    sku: "WELL-OJAS-PWDR",
    stockStatus: "instock",
    stockQuantity: 90,
    category: "Wellness Products",
    categorySlug: "wellness-products",
    images: ["/images/kerala_vibe.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [108],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: false,
    newArrival: false,
    trending: false
  },
  {
    id: 108,
    name: "Kalonji Oil – Pure Black Seed Oil",
    slug: "kalonji-oil-pure-black-seed-oil",
    price: 320,
    regularPrice: 320,
    onSale: false,
    rating: 4.9,
    reviewCount: 156,
    description: "100% pure black seed (Kalonji) oil cold-pressed for maximum potency. Renowned for its immense health benefits.",
    shortDescription: "Pure Kalonji black seed oil.",
    sku: "OIL-KALONJI",
    stockStatus: "instock",
    stockQuantity: 110,
    category: "Oils & Ghee",
    categorySlug: "oils-ghee",
    images: ["/images/kerala_herbs.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 109,
    name: "PainoPlus Pain Relief Balm",
    slug: "painoplus-pain-relief-balm",
    price: 120,
    regularPrice: 150,
    onSale: true,
    rating: 4.7,
    reviewCount: 92,
    description: "Changalam Parranda Balm - an authentic herbal pain relief balm crafted with powerful medicinal herbs for fast relief.",
    shortDescription: "Herbal pain relief balm.",
    sku: "WELL-PAIN-BALM",
    stockStatus: "instock",
    stockQuantity: 300,
    category: "Wellness Products",
    categorySlug: "wellness-products",
    images: ["/images/kerala_handloom.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: false
  },
  {
    id: 110,
    name: "MOZI OUT Herbal Mosquito Repellent",
    slug: "mozi-out-herbal-mosquito-repellent",
    price: 180,
    regularPrice: 180,
    onSale: false,
    rating: 4.8,
    reviewCount: 77,
    description: "A 100% natural, herbal mosquito repellent that is safe for the whole family and highly effective outdoors.",
    shortDescription: "Natural herbal mosquito repellent.",
    sku: "WELL-MOZI-OUT",
    stockStatus: "instock",
    stockQuantity: 250,
    category: "Wellness Products",
    categorySlug: "wellness-products",
    images: ["/images/kerala_spices.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: true,
    trending: false
  },
  {
    id: 111,
    name: "Home Made Urukku Velichenna (Virgin Coconut Oil)",
    slug: "home-made-urukku-velichenna",
    price: 450,
    regularPrice: 500,
    onSale: true,
    rating: 5.0,
    reviewCount: 310,
    description: "Traditional Kerala virgin coconut oil, hand-crafted from fresh coconut milk (Urukku Velichenna). The purest oil for babies and health.",
    shortDescription: "Traditional handmade virgin coconut oil.",
    sku: "OIL-URUKKU-VELI",
    stockStatus: "instock",
    stockQuantity: 40,
    category: "Oils & Ghee",
    categorySlug: "oils-ghee",
    images: ["/images/kerala_coconut_oil.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [
      { id: 2, author: "Rajiv K.", avatar: "/images/ayurvedic_cream.png", rating: 5, date: "2026-04-10", title: "Purest Oil", content: "Exactly like what my grandmother used to make. Smells heavenly.", verified: true }
    ],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [105],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 112,
    name: "Kannan Kaya Powder",
    slug: "kannan-kaya-powder",
    price: 250,
    regularPrice: 250,
    onSale: false,
    rating: 4.9,
    reviewCount: 200,
    description: "Traditional Kerala raw banana powder, a nutrient-rich first food for babies and a healthy drink for adults.",
    shortDescription: "Kerala banana-based health powder.",
    sku: "FOOD-KANNAN-KAYA",
    stockStatus: "instock",
    stockQuantity: 150,
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    images: ["/images/kerala_vibe.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [113, 114],
    frequentlyBoughtTogetherIds: [113],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: false
  },
  {
    id: 113,
    name: "Banana Powder",
    slug: "banana-powder",
    price: 200,
    regularPrice: 220,
    onSale: true,
    rating: 4.8,
    reviewCount: 110,
    description: "100% natural banana powder, perfect for smoothies, baking, or healthy porridges.",
    shortDescription: "Natural dried banana powder.",
    sku: "FOOD-BANANA-PWDR",
    stockStatus: "instock",
    stockQuantity: 180,
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    images: ["/images/kerala_herbs.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [112],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: false
  },
  {
    id: 114,
    name: "Ragi Powder",
    slug: "ragi-powder",
    price: 150,
    regularPrice: 150,
    onSale: false,
    rating: 4.9,
    reviewCount: 140,
    description: "Sprouted and roasted finger millet (Ragi) powder, rich in calcium and iron.",
    shortDescription: "Healthy ragi powder.",
    sku: "FOOD-RAGI-PWDR",
    stockStatus: "instock",
    stockQuantity: 200,
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    images: ["/images/kerala_handloom.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [112],
    frequentlyBoughtTogetherIds: [],
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: false
  },
  {
    id: 115,
    name: "Beef Idi Irachi (Dried Beef)",
    slug: "beef-idi-irachi",
    price: 650,
    regularPrice: 700,
    onSale: true,
    rating: 4.9,
    reviewCount: 215,
    description: "Authentic Kerala-style dried and pounded beef (Idi Irachi), perfectly spiced and ready to eat or fry.",
    shortDescription: "Traditional Kerala dried beef.",
    sku: "FOOD-IDI-IRACHI",
    stockStatus: "instock",
    stockQuantity: 50,
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    images: ["/images/kerala_spices.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [116],
    frequentlyBoughtTogetherIds: [116],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 116,
    name: "Prawns Pickle",
    slug: "prawns-pickle",
    price: 350,
    regularPrice: 350,
    onSale: false,
    rating: 4.8,
    reviewCount: 180,
    description: "Spicy, tangy, and absolutely delicious Kerala-style prawn pickle made with premium spices and fresh prawns.",
    shortDescription: "Kerala-style prawn pickle.",
    sku: "FOOD-PRAWN-PICKLE",
    stockStatus: "instock",
    stockQuantity: 85,
    category: "Traditional Foods",
    categorySlug: "traditional-foods",
    images: ["/images/kerala_coconut_oil.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [],
    faqs: [],
    relatedIds: [115],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  },
  {
    id: 117,
    name: "Cow Ghee",
    slug: "cow-ghee",
    price: 550,
    regularPrice: 600,
    onSale: true,
    rating: 5.0,
    reviewCount: 290,
    description: "Pure, aromatic cow ghee churned using traditional Bilona methods for the perfect taste and health benefits.",
    shortDescription: "Pure cow ghee in traditional container.",
    sku: "OIL-COW-GHEE",
    stockStatus: "instock",
    stockQuantity: 120,
    category: "Oils & Ghee",
    categorySlug: "oils-ghee",
    images: ["/images/ayurvedic_cream.png"],
    attributes: [],
    variations: [],
    specifications: {},
    reviews: [
      { id: 3, author: "Sneha V.", avatar: "/images/kerala_vibe.png", rating: 5, date: "2026-05-20", title: "Best Ghee", content: "The aroma is fantastic. Reminds me of home.", verified: true }
    ],
    faqs: [],
    relatedIds: [],
    frequentlyBoughtTogetherIds: [],
    featured: true,
    bestSeller: true,
    newArrival: false,
    trending: true
  }
];

export const heroSlides = [
  {
    id: 1,
    tagline: "Pure Kerala Traditions, Naturally Crafted",
    title: "Herbal Wellness",
    description: "Premium herbal wellness products, traditional foods, handloom products, and natural lifestyle essentials made with care.",
    primaryCta: "Shop Now",
    primaryUrl: "/shop",
    secondaryCta: "Explore Products",
    secondaryUrl: "/shop",
    image: "/images/kerala_herbs.png"
  },
  {
    id: 2,
    tagline: "Authentic & Pure",
    title: "Traditional Foods",
    description: "Experience the true taste of Kerala with our home-made pickles, dried beef, and health powders.",
    primaryCta: "View Foods",
    primaryUrl: "/shop/category/traditional-foods",
    secondaryCta: "Shop Now",
    secondaryUrl: "/shop",
    image: "/images/kerala_handloom.png"
  }
];

export const promoBanners = {
  summerSale: {
    title: "Ayurveda Wellness Festival",
    subtitle: "Up to 20% Off Natural Essentials",
    desc: "Discover premium, hand-picked herbal remedies and beauty care rooted in Kerala traditions.",
    ctaText: "Shop The Sale",
    ctaUrl: "/shop",
    image: "/images/kerala_spices.png"
  },
  blackFriday: {
    title: "Traditional Kerala Delights",
    subtitle: "Taste the Heritage",
    desc: "Stock up on authentic Urukku Velichenna, Prawns Pickle, and Idi Irachi made fresh for your family.",
    ctaText: "Explore Now",
    ctaUrl: "/shop",
    image: "/images/kerala_coconut_oil.png"
  }
};

export const whyChooseUs = [
  { title: "Natural Ingredients", description: "100% natural, chemical-free ingredients sourced directly from farmers.", icon: "Leaf" },
  { title: "Traditional Formulations", description: "Authentic Kerala Ayurvedic recipes passed down through generations.", icon: "BookOpen" },
  { title: "Handmade with Care", description: "Crafted in small batches with love and strict hygiene standards.", icon: "Heart" },
  { title: "Trusted by Families", description: "Over thousands of happy families relying on our pure products.", icon: "Users" }
];

export const blogArticles = [
  {
    id: 1,
    title: "The Secret of Urukku Velichenna",
    slug: "secret-of-urukku-velichenna",
    excerpt: "Why traditional virgin coconut oil made from coconut milk is the best choice for babies.",
    content: "<p>Urukku Velichenna is a time-tested Kerala tradition...</p>",
    category: "Wellness",
    date: "June 20, 2026",
    author: "Wellness Team",
    authorRole: "Editor",
    image: "/images/ayurvedic_cream.png",
    readTime: "4 min read",
    tags: ["Coconut Oil", "Baby Care"]
  }
];

export const generalFAQs = [
  { question: "Are your products 100% natural?", answer: "Yes, all our herbal, beauty, and food products are made using 100% natural ingredients without harmful chemicals." },
  { question: "Do you ship across India?", answer: "Yes, we provide pan-India delivery." }
];

export const navigationMenu = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "Herbal Care", href: "/shop/category/herbal-care" },
    { name: "Traditional Foods", href: "/shop/category/traditional-foods" }
  ],
  categories: [
    { name: "Herbal Care", href: "/shop/category/herbal-care", slug: "herbal-care" },
    { name: "Skin Care", href: "/shop/category/skin-care", slug: "skin-care" },
    { name: "Baby Care", href: "/shop/category/baby-care", slug: "baby-care" },
    { name: "Oils & Ghee", href: "/shop/category/oils-ghee", slug: "oils-ghee" }
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" }
  ],
  policies: [
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Terms & Conditions", href: "/policies/terms" },
    { name: "Shipping Policy", href: "/policies/shipping" },
    { name: "Refund Policy", href: "/policies/refund" }
  ]
};
