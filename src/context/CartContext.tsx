
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/data/products';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Calculate total items and subtotal
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage');
      }
    }
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    setItems(prevItems => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.color === color && item.size === size
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: 'Cart updated',
          description: `Updated quantity of ${product.name}`,
        });
        
        return newItems;
      } else {
        // Add new item
        toast({
          title: 'Added to cart',
          description: `${product.name} added to your cart`,
        });
        
        return [...prevItems, { product, quantity, color, size }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    
    toast({
      title: 'Item removed',
      description: 'Item removed from your cart',
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
