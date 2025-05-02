
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
    images: ["/placeholder.svg", "/placeholder.svg"],
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
