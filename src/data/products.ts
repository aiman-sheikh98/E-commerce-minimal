export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  featured: boolean;
  isNewArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimal Tote Bag",
    price: 59,
    description: "A minimalist canvas tote bag, perfect for everyday use. Features a spacious interior and durable handles.",
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Black", "Natural", "Sage"],
    sizes: ["One Size"],
    featured: true,
  },
  {
    id: "2",
    name: "Essential White T-Shirt",
    price: 35,
    description: "A premium cotton t-shirt with a relaxed fit. Ethically made and designed to last.",
    category: "tshirts",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["White", "Black", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "3",
    name: "Ceramic Coffee Mug",
    price: 28,
    description: "Handcrafted ceramic mug with a minimal design. Perfect for your morning coffee ritual.",
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["White", "Sand", "Terracotta"],
    sizes: ["One Size"],
    featured: false,
  },
  {
    id: "4",
    name: "Linen Throw Pillow",
    price: 45,
    description: "Soft linen pillow cover with subtle texture. Adds warmth and comfort to any space.",
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1584653059740-fb6fb91eeeff?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1619115445677-36b2d1b4335c?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Natural", "Sage", "Terracotta"],
    sizes: ["18×18", "20×20"],
    featured: true,
  },
  {
    id: "5",
    name: "Wool Blend Sweater",
    price: 120,
    description: "Cozy wool-blend sweater with a relaxed silhouette. Perfect for layering during cooler months.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1618355825453-9a8a2a6caa4a?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Cream", "Charcoal", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "6",
    name: "Minimalist Wall Clock",
    price: 65,
    description: "Simple and elegant wall clock with a clean face design and silent movement.",
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1565193299433-bf2e77e582df?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Natural", "Black"],
    sizes: ["One Size"],
    featured: false,
  },
  {
    id: "7",
    name: "Organic Cotton Socks",
    price: 18,
    description: "Comfortable, breathable organic cotton socks. Pack of three pairs.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1631713954537-558f58d7ded5?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Mixed"],
    sizes: ["S/M", "L/XL"],
    featured: false,
  },
  {
    id: "8",
    name: "Leather Card Holder",
    price: 45,
    description: "Slim vegetable-tanned leather card holder with four card slots.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1607287667329-7ef31baa69b5?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Tan", "Black", "Brown"],
    sizes: ["One Size"],
    featured: true,
  },
  {
    id: "9",
    name: "Classic Slim-Fit Jeans",
    price: 85,
    description: "Premium denim jeans with a classic slim fit. Made from sustainable cotton blend.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1604176424472-35819ce67081?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["28", "30", "32", "34", "36"],
    featured: true,
  },
  {
    id: "10",
    name: "Straight-Cut Raw Denim Jeans",
    price: 110,
    description: "Raw denim jeans with a straight-cut silhouette. Features minimal detailing for a clean look.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Dark Blue", "Medium Wash", "Light Wash"],
    sizes: ["28", "30", "32", "34", "36"],
    featured: false,
  },
  {
    id: "11",
    name: "Oxford Button-Down Shirt",
    price: 70,
    description: "Classic oxford cotton button-down shirt. Perfect for both casual and formal occasions.",
    category: "shirts",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "12",
    name: "Linen Summer Shirt",
    price: 65,
    description: "Lightweight linen shirt perfect for summer days. Features a relaxed fit and breathable fabric.",
    category: "shirts",
    images: [
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1578932750356-5a15e1892b92?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Natural", "Sage", "Light Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
  {
    id: "13",
    name: "Striped Cotton T-Shirt",
    price: 35,
    description: "Cotton t-shirt with classic stripe pattern. Features a comfortable fit and durable construction.",
    category: "tshirts",
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Navy/White", "Black/White", "Red/Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
  {
    id: "14",
    name: "Modern Backpack",
    price: 79,
    description: "Minimalist backpack with laptop compartment and multiple pockets. Perfect for everyday use.",
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Black", "Navy", "Gray"],
    sizes: ["One Size"],
    featured: true,
  },
  {
    id: "15",
    name: "Leather Watch",
    price: 120,
    description: "Minimalist quartz watch with leather strap. Features a clean dial and Japanese movement.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    featured: true,
  },
  {
    id: "16",
    name: "Relaxed Fit Jeans",
    price: 95,
    description: "Comfortable relaxed fit jeans with a slightly tapered leg. Perfect for casual everyday wear.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Medium Blue", "Dark Blue", "Black"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    featured: false,
  },
  {
    id: "17",
    name: "Distressed Skinny Jeans",
    price: 90,
    description: "Modern skinny jeans with light distressing for an edgy look. Made with stretch denim for comfort.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1542574271-7f3b92e6c821?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Light Wash", "Medium Wash", "Black"],
    sizes: ["26", "28", "30", "32", "34"],
    featured: true,
  },
  {
    id: "18",
    name: "High-Rise Wide Leg Jeans",
    price: 105,
    description: "Retro-inspired high-rise jeans with a wide leg silhouette. Crafted from premium rigid denim.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Indigo", "Light Blue", "Black"],
    sizes: ["24", "26", "28", "30", "32"],
    featured: false,
  },
  {
    id: "19",
    name: "Vintage Wash Boyfriend Jeans",
    price: 98,
    description: "Relaxed boyfriend jeans with a vintage wash and subtle distressing. Features a comfortable mid-rise waist.",
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Vintage Blue", "Medium Blue", "Light Wash"],
    sizes: ["24", "26", "28", "30", "32"],
    featured: true,
  },
  {
    id: "20",
    name: "Eco-Friendly Water Bottle",
    price: 29.99,
    description: "Sustainable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Features a leak-proof design.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1578269294747-ba0f24d6c288?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Silver", "Black", "Blue"],
    sizes: ["16oz", "24oz"],
    featured: false,
    isNewArrival: true
  },
  {
    id: "21",
    name: "Organic Cotton Hoodie",
    price: 85,
    description: "Premium organic cotton hoodie with minimalist design. Features a comfortable relaxed fit with kangaroo pocket.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1611811236467-5b1244d5abb9?auto=format&fit=crop&q=80&w=500" 
    ],
    colors: ["Charcoal", "Cream", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    isNewArrival: true
  },
  {
    id: "22",
    name: "Handcrafted Ceramic Planter",
    price: 42,
    description: "Beautiful handmade ceramic plant pot with minimalist design. Perfect for small to medium-sized houseplants.",
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1623910270900-3e9790148e5a?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["White", "Terracotta", "Black"],
    sizes: ["Small", "Medium"],
    featured: false,
    isNewArrival: true
  },
  {
    id: "23",
    name: "Vegan Leather Crossbody Bag",
    price: 65,
    description: "Stylish vegan leather crossbody bag with adjustable strap. Features multiple compartments for organization.",
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Tan", "Black", "Burgundy"],
    sizes: ["One Size"],
    featured: false,
    isNewArrival: true
  },
  {
    id: "24",
    name: "Bamboo Sunglasses",
    price: 79,
    description: "Eco-friendly bamboo sunglasses with polarized lenses. Lightweight and durable with UV protection.",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=500"
    ],
    colors: ["Natural", "Dark Brown"],
    sizes: ["One Size"],
    featured: false,
    isNewArrival: true
  }
];

export const categories = [
  { name: "All", value: "all" },
  { name: "New Arrivals", value: "new-arrivals" },
  { name: "T-Shirts", value: "tshirts" },
  { name: "Shirts", value: "shirts" },
  { name: "Jeans", value: "jeans" },
  { name: "Bags", value: "bags" },
  { name: "Home", value: "home" },
  { name: "Accessories", value: "accessories" },
];

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  orderDate: string;
  estimatedDelivery: string;
}

export const sampleOrders: Order[] = [
  {
    id: "ORD-12345",
    items: [
      {
        product: products[0],
        quantity: 1,
        color: "Natural",
        size: "One Size"
      },
      {
        product: products[3],
        quantity: 2,
        color: "Sage",
        size: "18×18"
      }
    ],
    total: 149,
    status: "shipped",
    trackingNumber: "TRK-987654321",
    shippingAddress: {
      name: "Jane Smith",
      street: "123 Main St",
      city: "Portland",
      state: "OR",
      zip: "97204",
      country: "United States"
    },
    orderDate: "2024-04-28",
    estimatedDelivery: "2024-05-05"
  }
];
