
import { Link } from 'react-router-dom';
import { CartItem } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface OrderItemProps {
  item: CartItem;
}

const OrderItem = ({ item }: OrderItemProps) => {
  const { addToCart } = useCart();
  
  const handleBuyAgain = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(item.product, item.quantity, item.color, item.size);
    
    toast({
      title: "Added to cart",
      description: `${item.product.name} added to your cart`,
    });
  };
  
  return (
    <Link to={`/product/${item.product.id}`} className="group">
      <div className="flex items-start space-x-4">
        <div className="h-20 w-20 bg-secondary flex-shrink-0">
          <img 
            src={item.product.images[0]}
            alt={item.product.name}
            className="h-full w-full object-cover" 
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium group-hover:text-primary transition-colors">
            {item.product.name}
          </h3>
          <div className="mt-1 text-sm text-muted-foreground">
            {item.color}, Size: {item.size}
          </div>
          <div className="mt-1 text-sm">
            ${item.product.price} × {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
          </div>
          
          <div className="mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={handleBuyAgain}
            >
              Buy Again
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
