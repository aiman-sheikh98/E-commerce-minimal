
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

const CartSidebar = () => {
  const { items, subtotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Set body to non-scrollable when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="px-1">
          <div className="flex items-center justify-between">
            <SheetTitle>Your Cart</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X size={20} />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
            <ShoppingBag size={48} className="mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <SheetClose asChild>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              {items.map((item) => (
                <CartItem key={`${item.product.id}-${item.color}-${item.size}`} item={item} />
              ))}
            </div>
            <div className="pt-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Shipping</span>
                <span className="text-sm text-muted-foreground">Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <SheetFooter className="flex flex-col gap-2 pt-4">
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </SheetClose>
                <Button
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
