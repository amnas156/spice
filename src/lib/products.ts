export interface ProductVariant {
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  malayalam: string;
  description: string;
  longDescription: string;
  color: string;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  storage: string;
  shipping: string;
  variants: ProductVariant[];
  reviews: ProductReview[];
  gallery: string[];
  category: 'chilli' | 'coriander' | 'turmeric' | 'others';
  badge: 'featured' | 'bestseller' | 'new' | 'discount' | null;
}

export const productsData: Product[] = [
  // CHILLI PRODUCTS
  {
    id: "mulaku-podi",
    name: "Mulaku Podi",
    subtitle: "Premium Chilli Powder",
    malayalam: "മുളകുപൊടി",
    description: "Made from carefully selected sun-dried premium chillies for rich natural color, bold aroma, and authentic spicy flavor.",
    longDescription: "JADEED Mulaku Podi is crafted from the finest, handpicked sun-dried red chillies sourced directly from traditional farms in Idukki, Kerala. Stemmed, cleaned, and slowly ground to preserve the natural capsaicin oils, color, and fiery aroma, it brings the authentic, rich flavor of traditional Kerala cuisine to your dishes. Absolutely pure with no added color, fillers, or preservatives.",
    color: "#C62828",
    rating: 4.9,
    reviewsCount: 128,
    ingredients: ["100% Sun-Dried Premium Red Chilli"],
    storage: "Store in a cool, dry place in an airtight container. Keep away from moisture and direct sunlight.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India. Free delivery on orders above ₹499.",
    gallery: [
      "/products/chilli-raw.png",
      "/products/chilli-powder-bowl.png"
    ],
    category: "chilli",
    badge: "bestseller",
    variants: [
      {
        weight: "50g",
        price: 45,
        originalPrice: 55,
        image: "/products/mulaku-podi-50g.png",
        features: ["100% Natural", "No Artificial Colors", "Rich Aroma", "Freshly Ground"]
      },
      {
        weight: "100g",
        price: 80,
        originalPrice: 100,
        image: "/products/mulaku-podi-100g.png",
        features: ["100% Natural", "No Artificial Colors", "Rich Aroma", "Freshly Ground"]
      },
      {
        weight: "250g",
        price: 180,
        originalPrice: 220,
        image: "/products/mulaku-podi-250g.png",
        features: ["100% Natural", "No Artificial Colors", "Rich Aroma", "Freshly Ground"]
      },
      {
        weight: "500g",
        price: 340,
        originalPrice: 420,
        image: "/products/mulaku-podi-500g.png",
        features: ["100% Natural", "No Artificial Colors", "Rich Aroma", "Freshly Ground"]
      },
      {
        weight: "1kg",
        price: 650,
        originalPrice: 800,
        image: "/products/mulaku-podi-1kg.png",
        features: ["100% Natural", "No Artificial Colors", "Rich Aroma", "Freshly Ground"]
      }
    ],
    reviews: [
      {
        id: "rev-1",
        userName: "Anjali Nair",
        rating: 5,
        date: "May 12, 2026",
        comment: "Excellent quality! The color is naturally vibrant red and the spice level is just perfect. Reminds me of home-ground chilli powder.",
        verified: true,
        likes: 14
      },
      {
        id: "rev-2",
        userName: "Mathew Joseph",
        rating: 5,
        date: "April 28, 2026",
        comment: "Very authentic aroma. You can tell there are no artificial colors or additives. Will definitely order the 1kg pack next time.",
        verified: true,
        likes: 8
      }
    ]
  },
  {
    id: "crushed-chilli",
    name: "Crushed Chilli",
    subtitle: "Premium Chilli Flakes",
    malayalam: "ചതച്ച മുളക്",
    description: "Flakes of premium red chillies dried and crushed to add a fiery punch and gorgeous texture to your dishes.",
    longDescription: "JADEED Crushed Chilli is made from sun-dried premium hot red peppers, coarsely crushed to preserve the seeds and skins. This delivers a direct burst of heat and beautiful visual appeal, making it perfect for seasoning stir-fries, pizzas, pasta, or traditional Kerala curries.",
    color: "#D32F2F",
    rating: 4.8,
    reviewsCount: 42,
    ingredients: ["100% Coarse Crushed Red Chilli"],
    storage: "Store in a cool, dry place in an airtight jar. Protect from humidity.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "chilli",
    badge: "new",
    variants: [
      {
        weight: "50g",
        price: 50,
        originalPrice: 60,
        image: "css-chilli-pouch",
        features: ["Bold Flakes", "Aromatic Seeds", "High Spicy Kick", "100% Pure"]
      },
      {
        weight: "100g",
        price: 90,
        originalPrice: 110,
        image: "css-chilli-pouch",
        features: ["Bold Flakes", "Aromatic Seeds", "High Spicy Kick", "100% Pure"]
      },
      {
        weight: "250g",
        price: 200,
        originalPrice: 240,
        image: "css-chilli-pouch",
        features: ["Bold Flakes", "Aromatic Seeds", "High Spicy Kick", "100% Pure"]
      },
      {
        weight: "500g",
        price: 380,
        originalPrice: 450,
        image: "css-chilli-pouch",
        features: ["Bold Flakes", "Aromatic Seeds", "High Spicy Kick", "100% Pure"]
      },
      {
        weight: "1kg",
        price: 720,
        originalPrice: 850,
        image: "css-chilli-pouch",
        features: ["Bold Flakes", "Aromatic Seeds", "High Spicy Kick", "100% Pure"]
      }
    ],
    reviews: []
  },
  {
    id: "kashmiri-chilli",
    name: "Kashmiri Chilli Powder",
    subtitle: "Premium Mild Red Chilli",
    malayalam: "കാശ്മീരി മുളകുപൊടി",
    description: "Sought after for its intense crimson color and extremely mild heat, perfect for beautiful curry presentation.",
    longDescription: "JADEED Kashmiri Chilli Powder is sourced from premium selected mild Kashmiri chillies, famous for their unique deep red pigmentation and delicate fruity flavor profile. Ground at low temperatures, it imparts an appetizing color to curries, tandooris, and stews without raising the spice level too high.",
    color: "#B71C1C",
    rating: 4.9,
    reviewsCount: 76,
    ingredients: ["100% Ground Kashmiri Red Chilli"],
    storage: "Store in an airtight container in a dark place to preserve its bright red color from fading.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "chilli",
    badge: "featured",
    variants: [
      {
        weight: "50g",
        price: 60,
        originalPrice: 75,
        image: "css-chilli-pouch",
        features: ["Deep Crimson Color", "Very Mild Heat", "Sweet Fruity Aroma", "100% Natural"]
      },
      {
        weight: "100g",
        price: 110,
        originalPrice: 135,
        image: "css-chilli-pouch",
        features: ["Deep Crimson Color", "Very Mild Heat", "Sweet Fruity Aroma", "100% Natural"]
      },
      {
        weight: "250g",
        price: 250,
        originalPrice: 300,
        image: "css-chilli-pouch",
        features: ["Deep Crimson Color", "Very Mild Heat", "Sweet Fruity Aroma", "100% Natural"]
      },
      {
        weight: "500g",
        price: 480,
        originalPrice: 580,
        image: "css-chilli-pouch",
        features: ["Deep Crimson Color", "Very Mild Heat", "Sweet Fruity Aroma", "100% Natural"]
      },
      {
        weight: "1kg",
        price: 900,
        originalPrice: 1100,
        image: "css-chilli-pouch",
        features: ["Deep Crimson Color", "Very Mild Heat", "Sweet Fruity Aroma", "100% Natural"]
      }
    ],
    reviews: []
  },

  // CORIANDER PRODUCTS
  {
    id: "malli-podi",
    name: "Malli Podi",
    subtitle: "Premium Coriander Powder",
    malayalam: "മല്ലിപ്പൊടി",
    description: "Freshly ground coriander seeds with rich aroma and authentic flavor for traditional Kerala cooking.",
    longDescription: "JADEED Malli Podi is prepared from selected coriander seeds, roasted lightly and ground to perfection. Its warm, mild, sweet-spicy fragrance makes it the soul of traditional Kerala fish curries, sambar, and vegetable dishes.",
    color: "#2E7D32",
    rating: 4.7,
    reviewsCount: 86,
    ingredients: ["100% Roasted Coriander Seeds"],
    storage: "Keep in a cool, airtight container to protect the volatile essential oils that give its fresh aroma.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India. Free delivery on orders above ₹499.",
    gallery: [],
    category: "coriander",
    badge: null,
    variants: [
      {
        weight: "50g",
        price: 20,
        originalPrice: 28,
        image: "css-coriander-pouch",
        features: ["Premium Seeds", "Freshly Ground", "No Additives", "Traditional Taste"]
      },
      {
        weight: "100g",
        price: 30,
        originalPrice: 40,
        image: "css-coriander-pouch",
        features: ["Premium Seeds", "Freshly Ground", "No Additives", "Traditional Taste"]
      },
      {
        weight: "250g",
        price: 75,
        originalPrice: 95,
        image: "css-coriander-pouch",
        features: ["Premium Seeds", "Freshly Ground", "No Additives", "Traditional Taste"]
      },
      {
        weight: "500g",
        price: 145,
        originalPrice: 180,
        image: "css-coriander-pouch",
        features: ["Premium Seeds", "Freshly Ground", "No Additives", "Traditional Taste"]
      },
      {
        weight: "1kg",
        price: 275,
        originalPrice: 350,
        image: "css-coriander-pouch",
        features: ["Premium Seeds", "Freshly Ground", "No Additives", "Traditional Taste"]
      }
    ],
    reviews: []
  },
  {
    id: "roasted-coriander",
    name: "Roasted Coriander Powder",
    subtitle: "Dark Roasted Coriander",
    malayalam: "വറുത്ത മല്ലിപ്പൊടി",
    description: "Deep roasted coriander seeds ground to deliver an intense nutty aroma and rich color to dark gravies.",
    longDescription: "JADEED Roasted Coriander Powder uses premium coriander seeds roasted over slow fire until dark brown, releasing rich caramel-like spicy tones. Excellent for heavy gravies like beef curry, chicken varutharacha curry, or mushroom pepper roast.",
    color: "#1B5E20",
    rating: 4.8,
    reviewsCount: 35,
    ingredients: ["100% Dark Roasted Coriander Seeds"],
    storage: "Store in a cool dry place. Keep sealed tightly to secure the toasted nutty aroma.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "coriander",
    badge: "discount",
    variants: [
      {
        weight: "50g",
        price: 25,
        originalPrice: 35,
        image: "css-coriander-pouch",
        features: ["Intense Nutty Aroma", "Deep Roasting", "Earthy Rich Flavor", "Chemical Free"]
      },
      {
        weight: "100g",
        price: 40,
        originalPrice: 55,
        image: "css-coriander-pouch",
        features: ["Intense Nutty Aroma", "Deep Roasting", "Earthy Rich Flavor", "Chemical Free"]
      },
      {
        weight: "250g",
        price: 95,
        originalPrice: 125,
        image: "css-coriander-pouch",
        features: ["Intense Nutty Aroma", "Deep Roasting", "Earthy Rich Flavor", "Chemical Free"]
      },
      {
        weight: "500g",
        price: 180,
        originalPrice: 240,
        image: "css-coriander-pouch",
        features: ["Intense Nutty Aroma", "Deep Roasting", "Earthy Rich Flavor", "Chemical Free"]
      },
      {
        weight: "1kg",
        price: 340,
        originalPrice: 450,
        image: "css-coriander-pouch",
        features: ["Intense Nutty Aroma", "Deep Roasting", "Earthy Rich Flavor", "Chemical Free"]
      }
    ],
    reviews: []
  },

  // TURMERIC PRODUCTS
  {
    id: "manjal-podi",
    name: "Manjal Podi",
    subtitle: "Premium Turmeric Powder",
    malayalam: "മഞ്ഞൾപൊടി",
    description: "Naturally processed turmeric powder with vibrant golden color, earthy aroma, and traditional purity.",
    longDescription: "JADEED Manjal Podi is milled from premium grade turmeric roots grown organically in Wayanad, Kerala. High in natural curcumin content (above 5%), it offers high therapeutic value along with its intense golden color and deep earthy flavor. Perfect for healthy cooking and traditional remedies.",
    color: "#D4A017",
    rating: 4.8,
    reviewsCount: 94,
    ingredients: ["100% Organic Turmeric Roots"],
    storage: "Store in a dry, cool environment in an airtight container to retain curcumin active ingredients.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India. Free delivery on orders above ₹499.",
    gallery: [],
    category: "turmeric",
    badge: "bestseller",
    variants: [
      {
        weight: "50g",
        price: 22,
        originalPrice: 30,
        image: "css-turmeric-pouch",
        features: ["Premium Roots", "Natural Golden Color", "No Additives", "Rich Curcumin"]
      },
      {
        weight: "100g",
        price: 35,
        originalPrice: 45,
        image: "css-turmeric-pouch",
        features: ["Premium Roots", "Natural Golden Color", "No Additives", "Rich Curcumin"]
      },
      {
        weight: "250g",
        price: 85,
        originalPrice: 110,
        image: "css-turmeric-pouch",
        features: ["Premium Roots", "Natural Golden Color", "No Additives", "Rich Curcumin"]
      },
      {
        weight: "500g",
        price: 160,
        originalPrice: 200,
        image: "css-turmeric-pouch",
        features: ["Premium Roots", "Natural Golden Color", "No Additives", "Rich Curcumin"]
      },
      {
        weight: "1kg",
        price: 299,
        originalPrice: 380,
        image: "css-turmeric-pouch",
        features: ["Premium Roots", "Natural Golden Color", "No Additives", "Rich Curcumin"]
      }
    ],
    reviews: [
      {
        id: "rev-t1",
        userName: "Suresh G.",
        rating: 5,
        date: "May 25, 2026",
        comment: "Excellent quality turmeric! The color is extremely deep yellow-orange, which indicates good curcumin content. Highly recommended.",
        verified: true,
        likes: 12
      }
    ]
  },
  {
    id: "organic-turmeric",
    name: "Organic Turmeric Powder",
    subtitle: "High Curcumin Turmeric",
    malayalam: "ഓർഗാനിക് മഞ്ഞൾപൊടി",
    description: "Certified organic turmeric powder containing over 6% curcumin, ideal for health-boosting turmeric milk and cooking.",
    longDescription: "JADEED Organic Turmeric Powder is sourced from premium organic co-operatives in the Western Ghats of Kerala. Free from synthetic chemical fertilizers and pesticides, this powder undergoes minimal processing, retaining its exceptionally high active curcumin compounds and therapeutic benefits.",
    color: "#FFB300",
    rating: 4.9,
    reviewsCount: 57,
    ingredients: ["100% Certified Organic Turmeric Roots"],
    storage: "Keep in a dark, dry container to shield the sensitive curcumin compounds from light degradation.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "turmeric",
    badge: "featured",
    variants: [
      {
        weight: "50g",
        price: 30,
        originalPrice: 40,
        image: "css-turmeric-pouch",
        features: ["Curcumin Content >6%", "Certified Organic", "Intense Golden Orange", "Superior Health Benefit"]
      },
      {
        weight: "100g",
        price: 55,
        originalPrice: 70,
        image: "css-turmeric-pouch",
        features: ["Curcumin Content >6%", "Certified Organic", "Intense Golden Orange", "Superior Health Benefit"]
      },
      {
        weight: "250g",
        price: 130,
        originalPrice: 165,
        image: "css-turmeric-pouch",
        features: ["Curcumin Content >6%", "Certified Organic", "Intense Golden Orange", "Superior Health Benefit"]
      },
      {
        weight: "500g",
        price: 250,
        originalPrice: 310,
        image: "css-turmeric-pouch",
        features: ["Curcumin Content >6%", "Certified Organic", "Intense Golden Orange", "Superior Health Benefit"]
      },
      {
        weight: "1kg",
        price: 480,
        originalPrice: 590,
        image: "css-turmeric-pouch",
        features: ["Curcumin Content >6%", "Certified Organic", "Intense Golden Orange", "Superior Health Benefit"]
      }
    ],
    reviews: []
  },

  // OTHER SPICE PRODUCTS
  {
    id: "garam-masala",
    name: "Garam Masala",
    subtitle: "Premium Spice Blend",
    malayalam: "ഗരം മസാല",
    description: "A royal aromatic blend of whole spices roasted and ground to add warmth and fragrance to exotic dishes.",
    longDescription: "JADEED Garam Masala is a traditional recipe combining cloves, green cardamom, cinnamon, star anise, nutmeg, mace, fennel, and black pepper. Each spice is dry-roasted slowly to activate essential aromatic oils before being blended, delivering a highly concentrated, rich spice finish.",
    color: "#8D6E63",
    rating: 4.9,
    reviewsCount: 65,
    ingredients: ["Cardamom", "Cloves", "Cinnamon", "Star Anise", "Fennel", "Black Pepper", "Nutmeg", "Mace"],
    storage: "Store in a cool dry place in an airtight glass jar. Close immediately after use to retain spice volatiles.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "others",
    badge: "bestseller",
    variants: [
      {
        weight: "50g",
        price: 25,
        originalPrice: 32,
        image: "css-masala-pouch",
        features: ["Royal Spice Blend", "Intensely Aromatic", "Stone Ground Profile", "No Fillers / Additives"]
      },
      {
        weight: "100g",
        price: 45,
        originalPrice: 60,
        image: "css-masala-pouch",
        features: ["Royal Spice Blend", "Intensely Aromatic", "Stone Ground Profile", "No Fillers / Additives"]
      },
      {
        weight: "250g",
        price: 110,
        originalPrice: 145,
        image: "css-masala-pouch",
        features: ["Royal Spice Blend", "Intensely Aromatic", "Stone Ground Profile", "No Fillers / Additives"]
      },
      {
        weight: "500g",
        price: 210,
        originalPrice: 280,
        image: "css-masala-pouch",
        features: ["Royal Spice Blend", "Intensely Aromatic", "Stone Ground Profile", "No Fillers / Additives"]
      },
      {
        weight: "1kg",
        price: 399,
        originalPrice: 520,
        image: "css-masala-pouch",
        features: ["Royal Spice Blend", "Intensely Aromatic", "Stone Ground Profile", "No Fillers / Additives"]
      }
    ],
    reviews: []
  },
  {
    id: "meat-masala",
    name: "Meat Masala",
    subtitle: "Kerala Beef & Mutton Blend",
    malayalam: "മീറ്റ് മസാല",
    description: "An authentic, spicy blend crafted specifically for traditional Kerala beef, mutton, and lamb curries.",
    longDescription: "JADEED Meat Masala is a signature spice recipe designed to give Kerala style meat curries their unique dark color, thickness, and rich spicy flavors. Specially formulated with slow-roasted spices, dry ginger, and garlic to tenderize meat and boost savory profiles.",
    color: "#795548",
    rating: 4.8,
    reviewsCount: 51,
    ingredients: ["Coriander", "Chilli", "Black Pepper", "Fennel", "Clove", "Cinnamon", "Cardamom", "Ginger", "Garlic", "Turmeric"],
    storage: "Store in a cool dry place away from humidity.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "others",
    badge: null,
    variants: [
      {
        weight: "50g",
        price: 28,
        originalPrice: 38,
        image: "css-masala-pouch",
        features: ["Traditional Meat Blend", "Rich Dark Gravy Color", "Authentic Spicy Taste", "Preservative Free"]
      },
      {
        weight: "100g",
        price: 50,
        originalPrice: 65,
        image: "css-masala-pouch",
        features: ["Traditional Meat Blend", "Rich Dark Gravy Color", "Authentic Spicy Taste", "Preservative Free"]
      },
      {
        weight: "250g",
        price: 120,
        originalPrice: 155,
        image: "css-masala-pouch",
        features: ["Traditional Meat Blend", "Rich Dark Gravy Color", "Authentic Spicy Taste", "Preservative Free"]
      },
      {
        weight: "500g",
        price: 230,
        originalPrice: 299,
        image: "css-masala-pouch",
        features: ["Traditional Meat Blend", "Rich Dark Gravy Color", "Authentic Spicy Taste", "Preservative Free"]
      },
      {
        weight: "1kg",
        price: 440,
        originalPrice: 570,
        image: "css-masala-pouch",
        features: ["Traditional Meat Blend", "Rich Dark Gravy Color", "Authentic Spicy Taste", "Preservative Free"]
      }
    ],
    reviews: []
  },
  {
    id: "chicken-masala",
    name: "Chicken Masala",
    subtitle: "Aromatic Chicken Spice Mix",
    malayalam: "ചിക്കൻ മസാല",
    description: "A balanced mild-spicy blend of roasted spices that brings out the juicy, rich flavors of chicken curry.",
    longDescription: "JADEED Chicken Masala is an aromatic spice mix crafted with roasted coriander, red chillies, turmeric, fennel, and premium whole garam masala. It yields a rich consistency and classic golden-red hue in chicken roasts, stews, and traditional curries.",
    color: "#A1887F",
    rating: 4.7,
    reviewsCount: 48,
    ingredients: ["Coriander", "Red Chilli", "Turmeric", "Fennel", "Garlic", "Ginger", "Pepper", "Cardamom", "Cloves", "Nutmeg"],
    storage: "Store in an airtight container in a dry place.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "others",
    badge: "new",
    variants: [
      {
        weight: "50g",
        price: 26,
        originalPrice: 35,
        image: "css-masala-pouch",
        features: ["Balanced Aroma & Heat", "Traditional Roast Blend", "Rich Golden Red Curries", "No Added Flavorings"]
      },
      {
        weight: "100g",
        price: 48,
        originalPrice: 60,
        image: "css-masala-pouch",
        features: ["Balanced Aroma & Heat", "Traditional Roast Blend", "Rich Golden Red Curries", "No Added Flavorings"]
      },
      {
        weight: "250g",
        price: 115,
        originalPrice: 150,
        image: "css-masala-pouch",
        features: ["Balanced Aroma & Heat", "Traditional Roast Blend", "Rich Golden Red Curries", "No Added Flavorings"]
      },
      {
        weight: "500g",
        price: 220,
        originalPrice: 285,
        image: "css-masala-pouch",
        features: ["Balanced Aroma & Heat", "Traditional Roast Blend", "Rich Golden Red Curries", "No Added Flavorings"]
      },
      {
        weight: "1kg",
        price: 420,
        originalPrice: 550,
        image: "css-masala-pouch",
        features: ["Balanced Aroma & Heat", "Traditional Roast Blend", "Rich Golden Red Curries", "No Added Flavorings"]
      }
    ],
    reviews: []
  },
  {
    id: "pepper-powder",
    name: "Pepper Powder",
    subtitle: "Premium Black Pepper",
    malayalam: "കുരുമുളകുപൊടി",
    description: "Finely ground premium black pepper, selected from Malabar pepper vines, offering a pungent, sharp heat.",
    longDescription: "JADEED Pepper Powder is made from organic Malabar black pepper (often called Black Gold) grown in Wayanad, Kerala. The peppercorns are sun-dried and ground to a medium-fine texture, retaining high piperine oils for that characteristically bold, spicy bite and woody aroma.",
    color: "#37474F",
    rating: 4.9,
    reviewsCount: 72,
    ingredients: ["100% Ground Malabar Black Pepper"],
    storage: "Store in a tightly capped jar. Pepper loses its aroma quickly if exposed to air.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India.",
    gallery: [],
    category: "others",
    badge: "discount",
    variants: [
      {
        weight: "50g",
        price: 35,
        originalPrice: 45,
        image: "css-pepper-pouch",
        features: ["Premium Malabar Pepper", "High Piperine Heat", "Woody Pungent Aroma", "Sun-Dried Purity"]
      },
      {
        weight: "100g",
        price: 60,
        originalPrice: 80,
        image: "css-pepper-pouch",
        features: ["Premium Malabar Pepper", "High Piperine Heat", "Woody Pungent Aroma", "Sun-Dried Purity"]
      },
      {
        weight: "250g",
        price: 145,
        originalPrice: 190,
        image: "css-pepper-pouch",
        features: ["Premium Malabar Pepper", "High Piperine Heat", "Woody Pungent Aroma", "Sun-Dried Purity"]
      },
      {
        weight: "500g",
        price: 280,
        originalPrice: 360,
        image: "css-pepper-pouch",
        features: ["Premium Malabar Pepper", "High Piperine Heat", "Woody Pungent Aroma", "Sun-Dried Purity"]
      },
      {
        weight: "1kg",
        price: 540,
        originalPrice: 700,
        image: "css-pepper-pouch",
        features: ["Premium Malabar Pepper", "High Piperine Heat", "Woody Pungent Aroma", "Sun-Dried Purity"]
      }
    ],
    reviews: []
  },
  {
    id: "velichenna",
    name: "Velichenna",
    subtitle: "Pure Coconut Oil",
    malayalam: "വെളിച്ചെണ്ണ",
    description: "Traditional pure coconut oil with natural aroma, smooth texture, and authentic Kerala cooking quality.",
    longDescription: "JADEED Velichenna is 100% pure, cold-pressed coconut oil manufactured from premium sun-dried copra (coconuts) sourced from local farms in Kerala. Extracted at low temperatures to keep nutrients intact, it retains its natural sweet aroma, crystalline transparency, and rich authentic taste.",
    color: "#8D6E63",
    rating: 4.9,
    reviewsCount: 154,
    ingredients: ["100% Pure Cold-Pressed Coconut Oil"],
    storage: "Store in a dry place. The oil solidifies naturally below 24°C, which is a proof of its 100% purity. Place in warm water to liquefy.",
    shipping: "Orders are processed and dispatched within 24 hours. Delivery takes 3-5 business days across India. Free delivery on orders above ₹499.",
    gallery: [],
    category: "others",
    badge: null,
    variants: [
      {
        weight: "250ml",
        price: 95,
        originalPrice: 120,
        image: "/products/coconut-oil.png",
        features: ["100% Pure Oil", "Natural Aroma", "No Preservatives", "Premium Grade"]
      },
      {
        weight: "500ml",
        price: 185,
        originalPrice: 220,
        image: "/products/coconut-oil.png",
        features: ["100% Pure Oil", "Natural Aroma", "No Preservatives", "Premium Grade"]
      },
      {
        weight: "1L",
        price: 360,
        originalPrice: 440,
        image: "/products/coconut-oil.png",
        features: ["100% Pure Oil", "Natural Aroma", "No Preservatives", "Premium Grade"]
      },
      {
        weight: "2L",
        price: 700,
        originalPrice: 850,
        image: "/products/coconut-oil.png",
        features: ["100% Pure Oil", "Natural Aroma", "No Preservatives", "Premium Grade"]
      },
      {
        weight: "5L",
        price: 1700,
        originalPrice: 2100,
        image: "/products/coconut-oil.png",
        features: ["100% Pure Oil", "Natural Aroma", "No Preservatives", "Premium Grade"]
      }
    ],
    reviews: []
  }
];
