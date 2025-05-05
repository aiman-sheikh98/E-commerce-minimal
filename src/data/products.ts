
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
    category: "clothing",
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
];

export const categories = [
  { name: "All", value: "all" },
  { name: "Clothing", value: "clothing" },
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
  status: "processing" | "shipped" | "delivered";
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
