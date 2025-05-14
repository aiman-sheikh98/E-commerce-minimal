import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const createOrder = async () => {
      setIsCreatingOrder(true);
      
      try {
        // Check if user is authenticated
        if (!user) {
          toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "Please sign in to complete your order",
          });
          navigate('/sign-in?redirect=checkout');
          return;
        }
        
        // Create the order in the database
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            amount: total,
            shipping_address: shippingAddress,
            status: 'pending'
          })
          .select()
          .single();
        
        if (orderError) throw orderError;
        
        // Insert order items
        const orderItems = items.map(item => ({
          order_id: orderData.id,
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.images[0],
          price: item.product.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) throw itemsError;
        
        setOrderId(orderData.id);
        
      } catch (error) {
        console.error('Error creating order:', error);
        toast({
          variant: "destructive",
          title: "Order Creation Failed",
          description: error.message || "There was a problem creating your order",
        });
      } finally {
        setIsCreatingOrder(false);
      }
    };
    
    if (!orderId && shippingAddress && total > 0) {
      createOrder();
    }
  }, [shippingAddress, total, items, navigate, orderId, user]);

  const handlePlaceOrder = async () => {
    setIsProcessingPayment(true);
    
    try {
      // This is a placeholder for future payment integration
      // We'll replace this with actual payment processing later
      
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully.",
      });
      
      clearCart();
      onSuccess?.();
      navigate('/payment-result?status=success');
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "There was a problem processing your payment.",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-medium">Complete Payment</h3>
      
      {orderId ? (
        <Button 
          className="w-full"
          onClick={handlePlaceOrder}
          disabled={isCreatingOrder || isProcessingPayment}
        >
          {isProcessingPayment ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Place Order'
          )}
        </Button>
      ) : (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            {isCreatingOrder ? 'Creating your order...' : 'Waiting for order details...'}
          </p>
        </div>
      )}
      
      <p className="text-sm text-muted-foreground text-center mt-2">
        Payment options will be available soon.
      </p>
    </div>
  );
};

export default Checkout;
