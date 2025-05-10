
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Check, X, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { PaymentStatusResponse } from '@/types/order';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const merchantTransactionId = searchParams.get('merchantTransactionId');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!merchantTransactionId) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke<PaymentStatusResponse>('check-payment-status', {
          body: {
            merchantTransactionId
          }
        });

        if (error) throw error;

        if (data?.success && data.data?.state) {
          setStatus(data.data.state);

          // If payment is successful, clear the cart
          if (data.data.state === 'COMPLETED') {
            clearCart();

            // Update the order status in the database
            if (user) {
              await supabase
                .from('orders')
                .update({
                  status: 'paid',
                  payment_id: data.data.transactionId,
                })
                .eq('id', merchantTransactionId);
            }
          }
        } else {
          throw new Error(data?.message || 'Could not verify payment');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not verify payment status",
        });
        setStatus('UNKNOWN');
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [merchantTransactionId, user, clearCart]);

  const getStatusDisplay = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center py-8">
          <Clock className="w-16 h-16 text-muted-foreground animate-pulse mb-4" />
          <h2 className="text-2xl font-medium mb-2">Verifying Payment</h2>
          <p className="text-muted-foreground text-center">
            Please wait while we verify your payment...
          </p>
        </div>
      );
    }

    if (status === 'COMPLETED') {
      return (
        <div className="flex flex-col items-center py-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Payment Successful</h2>
          <p className="text-muted-foreground text-center mb-6">
            Your order has been placed and will be processed shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('/orders')}>
              View Order
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center py-8">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Payment Failed</h2>
        <p className="text-muted-foreground text-center mb-6">
          {status === 'PAYMENT_DECLINED' 
            ? 'Your payment was declined. Please try again with a different payment method.'
            : 'There was an issue processing your payment. Please try again.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate('/checkout')}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link to="/cart">Return to Cart</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardContent className="p-6">
          {getStatusDisplay()}
        </CardContent>
      </Card>

      {status === 'COMPLETED' && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Payment Details</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span>{transactionId || 'N/A'}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span>{merchantTransactionId || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
