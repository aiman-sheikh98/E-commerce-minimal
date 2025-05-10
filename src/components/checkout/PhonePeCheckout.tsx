
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import PaymentButton from './PaymentButton';

interface PhonePeCheckoutProps {
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

const PhonePeCheckout = ({ shippingAddress, total, onSuccess }: PhonePeCheckoutProps) => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Create the order in Supabase when the component mounts
  useEffect(() => {
    const createOrder = async () => {
      setIsCreatingOrder(true);
      
      try {
        // First, check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
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
            user_id: session.user.id,
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
  }, [shippingAddress, total, items, navigate, orderId]);

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-medium">Complete Payment</h3>
      
      {orderId ? (
        <PaymentButton 
          orderId={orderId} 
          amount={total} 
          disabled={isCreatingOrder} 
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            {isCreatingOrder ? 'Creating your order...' : 'Waiting for order details...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhonePeCheckout;
