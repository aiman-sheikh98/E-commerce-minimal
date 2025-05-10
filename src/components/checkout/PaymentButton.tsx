
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { PhonePeResponse } from '@/types/order';

interface PaymentButtonProps {
  orderId: string;
  amount: number;
  disabled?: boolean;
}

const PaymentButton = ({ orderId, amount, disabled = false }: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Get the current URL to use as a base for callback
      const baseUrl = window.location.origin;
      
      // Call the initiate-payment edge function
      const { data, error } = await supabase.functions.invoke<PhonePeResponse>('initiate-payment', {
        body: {
          orderId,
          amount,
          callbackUrl: baseUrl
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.success && data?.data?.instrumentResponse?.redirectInfo?.url) {
        // Redirect to PhonePe payment page
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      } else {
        throw new Error(data?.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error.message || 'There was a problem initiating your payment',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="w-full" 
      onClick={handlePayment} 
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Pay with PhonePe'
      )}
    </Button>
  );
};

export default PaymentButton;
