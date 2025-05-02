
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, color, size } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex py-4 border-b">
      <Link to={`/product/${product.id}`} className="h-20 w-20 bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <Link
              to={`/product/${product.id}`}
              className="text-sm font-medium hover:underline"
            >
              {product.name}
            </Link>
            <div className="mt-1 text-xs text-muted-foreground">
              {color} / {size}
            </div>
          </div>
          <p className="text-sm font-medium">${product.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={12} />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus size={12} />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => removeFromCart(product.id)}
          >
            <X size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
