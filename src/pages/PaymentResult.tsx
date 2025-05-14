
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Check, X, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderId');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    if (status === 'success') {
      clearCart();
    }
  }, [status, clearCart]);

  const getStatusDisplay = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center py-8">
          <Clock className="w-16 h-16 text-muted-foreground animate-pulse mb-4" />
          <h2 className="text-2xl font-medium mb-2">Processing</h2>
          <p className="text-muted-foreground text-center">
            Please wait while we process your payment...
          </p>
        </div>
      );
    }

    if (status === 'success') {
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
          There was an issue processing your payment. Please try again.
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

      {status === 'success' && orderId && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Order Details</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span>{orderId}</span>
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
