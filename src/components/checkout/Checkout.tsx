
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { STRIPE_PUBLISHABLE_KEY } from '@/config/stripe';

interface CheckoutProps {
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  total: number;
  onSuccess?: () => void;
}

const Checkout = ({ shippingAddress, total, onSuccess }: CheckoutProps) => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to complete your order",
      });
      navigate('/sign-in?redirect=checkout');
      return;
    }

    if (!shippingAddress.name || !shippingAddress.street || !shippingAddress.city || 
        !shippingAddress.state || !shippingAddress.zip || !shippingAddress.country) {
      toast({
        variant: "destructive",
        title: "Incomplete Address",
        description: "Please fill in all required address fields",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Calculate actual subtotal from cart items
      const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      const tax = subtotal * 0.1; // 10% tax
      const calculatedTotal = subtotal + tax;
      
      // Call the Stripe checkout function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          items, 
          shippingAddress,
          userId: user.id,
          total: calculatedTotal
        }
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        // Clear the cart after successful order creation
        clearCart();
        
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error.message || "There was a problem processing your payment.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-medium">Complete Payment</h3>
      
      <Button 
        className="w-full"
        onClick={handlePlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Place Order'
        )}
      </Button>
      
      <p className="text-sm text-muted-foreground text-center mt-2">
        You will be redirected to Stripe to complete your payment.
      </p>
    </div>
  );
};

export default Checkout;
