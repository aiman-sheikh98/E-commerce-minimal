
import React from 'react';
import { CheckCircle2, Package, Truck } from 'lucide-react';
import { Order } from '@/data/products';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'processing':
        return (
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Package size={20} className="text-primary" />
          </div>
        );
      case 'shipped':
        return (
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Truck size={20} className="text-primary" />
          </div>
        );
      case 'delivered':
        return (
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 size={20} className="text-primary" />
          </div>
        );
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'processing':
        return 'Your order is being processed';
      case 'shipped':
        return 'Your order has been shipped';
      case 'delivered':
        return 'Your order has been delivered';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4 space-y-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-medium">{getStatusText()}</h3>
            <p className="text-sm text-muted-foreground">
              {order.status === 'shipped' && order.trackingNumber && (
                <>Tracking number: {order.trackingNumber}</>
              )}
              {order.status === 'processing' && (
                <>Estimated ship date: {formatDate(order.orderDate)}</>
              )}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Order placed</span>
            <span>{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Estimated delivery</span>
            <span>{formatDate(order.estimatedDelivery)}</span>
          </div>
          {order.status === 'shipped' && (
            <div className="flex justify-between text-sm">
              <span>Shipped via</span>
              <span>Standard Shipping</span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-md border p-4">
        <h3 className="font-medium mb-4">Order Details</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex py-2">
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
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${(order.total * 0.1).toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${(order.total + order.total * 0.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border p-4">
        <h3 className="font-medium mb-4">Shipping Address</h3>
        <address className="not-italic text-sm">
          {order.shippingAddress.name}<br />
          {order.shippingAddress.street}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
          {order.shippingAddress.country}
        </address>
      </div>
    </div>
  );
};

export default OrderSummary;
