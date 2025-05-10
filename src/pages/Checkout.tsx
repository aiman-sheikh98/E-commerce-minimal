
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckoutSuccess = () => {
    navigate('/orders');
  };
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link to="/cart" className="inline-flex items-center text-sm hover:text-primary/80">
          <ArrowLeft size={16} className="mr-1" />
          Back to cart
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-medium">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm onSuccess={handleCheckoutSuccess} />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-md border p-4">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
            <div className="max-h-[40vh] overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex">
                  <div className="h-16 w-16 bg-secondary">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${item.product.price}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(subtotal + subtotal * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
