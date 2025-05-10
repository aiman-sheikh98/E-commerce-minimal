
import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PaymentStatusResponse } from '@/types/order';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');
  const [message, setMessage] = useState('');
  
  const orderId = searchParams.get('orderId');
  const merchantTransactionId = searchParams.get('merchantTransactionId');
  
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!merchantTransactionId) {
        // If we don't have a transaction ID, maybe we're navigating directly
        // Try to get it from the order
        if (orderId) {
          try {
            const { data: orders } = await supabase
              .from('orders')
              .select('payment_id')
              .eq('id', orderId)
              .limit(1);
              
            if (orders && orders.length > 0 && orders[0].payment_id) {
              const transactionId = orders[0].payment_id;
              await verifyPayment(transactionId);
            } else {
              setStatus('failure');
              setMessage('No payment information found for this order');
            }
          } catch (error) {
            console.error('Error fetching order:', error);
            setStatus('failure');
            setMessage('Unable to verify payment status');
          }
        } else {
          setStatus('failure');
          setMessage('Missing order information');
        }
      } else {
        // We have a transaction ID directly from the URL
        await verifyPayment(merchantTransactionId);
      }
    };
    
    const verifyPayment = async (transactionId: string) => {
      try {
        // Call the check-payment-status edge function
        const { data, error } = await supabase.functions.invoke<PaymentStatusResponse>('check-payment-status', {
          body: { merchantTransactionId: transactionId }
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data?.success && data?.data?.state === 'COMPLETED') {
          setStatus('success');
          setMessage('Your payment was successful! Your order is now being processed.');
        } else {
          setStatus('failure');
          setMessage(data?.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failure');
        setMessage(error.message || 'There was a problem verifying your payment');
      }
    };
    
    checkPaymentStatus();
  }, [orderId, merchantTransactionId]);
  
  if (status === 'loading') {
    return (
      <div className="container max-w-md py-16 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h1 className="mt-6 text-2xl font-medium">Verifying Your Payment</h1>
        <p className="mt-2 text-muted-foreground">
          Please wait while we verify your payment status...
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-md py-16 text-center">
      {status === 'success' ? (
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      ) : (
        <XCircle className="mx-auto h-16 w-16 text-destructive" />
      )}
      
      <h1 className="mt-6 text-2xl font-medium">
        {status === 'success' ? 'Payment Successful!' : 'Payment Failed'}
      </h1>
      
      <p className="mt-4 text-muted-foreground">{message}</p>
      
      <div className="mt-8 space-y-4">
        {status === 'success' && (
          <Link to="/orders">
            <Button className="w-full">View Your Orders</Button>
          </Link>
        )}
        
        {status === 'failure' && orderId && (
          <Link to={`/checkout?orderId=${orderId}`}>
            <Button className="w-full">Try Again</Button>
          </Link>
        )}
        
        <Link to="/">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
