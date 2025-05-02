
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-6 text-2xl font-medium">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-md border p-8 text-center">
          <h2 className="mb-2 text-lg font-medium">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.color}-${item.size}`}
                  item={item}
                />
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" onClick={clearCart}>
                Clear cart
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button className="mt-4 w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
