
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OrderSummary from '@/components/order/OrderSummary';
import { sampleOrders } from '@/data/products';

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<string | null>(id || null);
  
  const order = sampleOrders.find(order => order.id === searchedOrder);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput) {
      setSearchedOrder(orderIdInput);
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm hover:text-primary/80">
          <ArrowLeft size={16} className="mr-1" />
          Continue shopping
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-medium">Order Tracking</h1>
      
      {!order ? (
        <div className="rounded-md border p-6">
          <h2 className="mb-4 text-lg font-medium">Find your order</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="orderId" className="text-sm font-medium">
                Order ID
              </label>
              <Input
                id="orderId"
                value={orderIdInput}
                onChange={e => setOrderIdInput(e.target.value)}
                placeholder="e.g., ORD-12345"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Email used for order"
                required
              />
            </div>
            <Button type="submit">Find Order</Button>
            <p className="text-xs text-muted-foreground mt-2">
              Try using "ORD-12345" as the order ID for this demo.
            </p>
          </form>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Order {order.id}</h2>
            <Button
              variant="ghost"
              onClick={() => setSearchedOrder(null)}
              className="text-sm"
            >
              Track another order
            </Button>
          </div>
          <OrderSummary order={order} />
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
