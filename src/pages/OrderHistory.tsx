
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, Book } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import OrderItem from '@/components/order/OrderItem';
import { sampleOrders } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

const OrderHistory = () => {
  const [orders] = useState(sampleOrders);
  const { addToCart } = useCart();
  
  const handleReorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Add all items from the order to the cart
    order.items.forEach(item => {
      addToCart(item.product, item.quantity, item.color, item.size);
    });
    
    toast({
      title: "Items added to cart",
      description: `${order.items.length} items from order ${order.id} have been added to your cart.`,
    });
  };
  
  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    toast({
      title: "Order cancellation requested",
      description: `Cancellation request for order ${orderId} has been submitted.`,
    });
  };

  // No orders state
  if (orders.length === 0) {
    return (
      <div className="container max-w-4xl py-12">
        <h1 className="text-2xl font-medium mb-6">Your Orders</h1>
        <div className="text-center py-16 border rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">When you place orders, they will appear here</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-medium mb-6">Your Orders</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="mb-6">
              <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
                <div>
                  <p className="text-sm font-medium">Order Placed</p>
                  <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-sm text-muted-foreground">${order.total.toFixed(2)}</p>
                </div>
                <div className="col-span-2 md:text-right">
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Badge variant={
                      order.status === "delivered" ? "outline" :
                      order.status === "shipped" ? "secondary" :
                      order.status === "cancelled" ? "destructive" : "default"
                    }>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Link to={`/order-tracking/${order.id}`} className="text-sm text-primary hover:underline">
                      Track package
                    </Link>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="py-4">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleReorder(order.id)}
                  className="flex-1 sm:flex-none"
                >
                  Buy Again
                </Button>
                {order.status === "processing" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleCancelOrder(order.id)}
                    className="flex-1 sm:flex-none text-destructive hover:bg-destructive/10"
                  >
                    Cancel Order
                  </Button>
                )}
                <Link to={`/order-tracking/${order.id}`} className="flex-1 sm:flex-none">
                  <Button variant="ghost" size="sm" className="w-full">
                    View Order Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="processing">
          {orders.filter(o => o.status === "processing").length > 0 ? (
            orders
              .filter(o => o.status === "processing")
              .map(order => (
                // Same card as above, but filtered for processing orders
                <Card key={order.id} className="mb-6">
                  {/* Same card content as above */}
                </Card>
              ))
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No processing orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shipped">
          {/* Similar structure for shipped orders */}
          <div className="text-center py-8 border rounded-lg">
            <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No shipped orders</p>
          </div>
        </TabsContent>
        
        <TabsContent value="delivered">
          {/* Similar structure for delivered orders */}
          <div className="text-center py-8 border rounded-lg">
            <Book className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No delivered orders</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
