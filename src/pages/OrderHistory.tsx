
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, Book, Loader2 } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import OrderItem from '@/components/order/OrderItem';
import { useRealTimeOrders } from '@/hooks/useRealTimeOrders';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedOrder } from '@/types/order';

const OrderHistory = () => {
  const { orders, loading, error } = useRealTimeOrders();
  const { addToCart } = useCart();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const handleReorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.items) return;
    
    // Add all items from the order to the cart
    order.items.forEach(item => {
      // Convert database order item to cart item
      addToCart({
        id: item.product_id,
        name: item.product_name,
        price: Number(item.price),
        images: [item.product_image || ''],
        // These are required by the Product type but we don't have them from the order
        description: '',
        category: '',
        colors: [],
        sizes: [],
        featured: false // Add the missing featured property
      }, item.quantity, item.color || '', item.size || '');
    });
    
    toast({
      title: "Items added to cart",
      description: `${order.items.length} items from order ${order.id} have been added to your cart.`,
    });
  };
  
  const handleCancelOrder = async (orderId: string) => {
    setIsCancelling(true);
    setCancellingOrderId(orderId);
    
    try {
      // Call the cancel order edge function
      const { data, error } = await supabase.functions.invoke('cancel-order', {
        body: { orderId }
      });
      
      if (error) throw error;
      
      toast({
        title: "Order cancelled",
        description: "Your order has been successfully cancelled.",
      });
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast({
        variant: "destructive",
        title: "Order Cancellation Failed",
        description: error.message || "There was a problem cancelling your order.",
      });
    } finally {
      setIsCancelling(false);
      setCancellingOrderId(null);
    }
  };

  // No orders state
  if (loading) {
    return (
      <div className="container max-w-4xl py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-12">
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-xl font-medium mb-2">Error loading orders</h2>
          <p className="text-muted-foreground mb-6">{error.message}</p>
        </div>
      </div>
    );
  }

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

  const renderOrderCard = (order: EnhancedOrder) => (
    <Card key={order.id} className="mb-6">
      <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
        <div>
          <p className="text-sm font-medium">Order Placed</p>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Total</p>
          <p className="text-sm text-muted-foreground">
            ${Number(order.amount).toFixed(2)}
          </p>
        </div>
        <div className="col-span-2 md:text-right">
          <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
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
          {order.items && order.items.map((item, index) => (
            <OrderItem key={index} item={{
              product: {
                id: item.product_id,
                name: item.product_name,
                price: Number(item.price),
                images: [item.product_image || ''],
                // These are required by the Product type but we don't have them from the order
                description: '',
                category: '',
                colors: [],
                sizes: [],
                featured: false // Add the missing featured property
              },
              quantity: item.quantity,
              color: item.color || '',
              size: item.size || ''
            }} />
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
        {order.status === "pending" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex-1 sm:flex-none text-destructive hover:bg-destructive/10"
                disabled={isCancelling && cancellingOrderId === order.id}
              >
                {isCancelling && cancellingOrderId === order.id ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  'Cancel Order'
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this order? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Cancel Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Link to={`/order-tracking/${order.id}`} className="flex-1 sm:flex-none">
          <Button variant="ghost" size="sm" className="w-full">
            View Order Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-medium mb-6">Your Orders</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {orders.map(renderOrderCard)}
        </TabsContent>
        
        <TabsContent value="pending">
          {orders.filter(o => o.status === "pending").length > 0 ? (
            orders
              .filter(o => o.status === "pending")
              .map(renderOrderCard)
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No pending orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shipped">
          {orders.filter(o => o.status === "shipped").length > 0 ? (
            orders
              .filter(o => o.status === "shipped")
              .map(renderOrderCard)
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No shipped orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="delivered">
          {orders.filter(o => o.status === "delivered").length > 0 ? (
            orders
              .filter(o => o.status === "delivered")
              .map(renderOrderCard)
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <Book className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No delivered orders</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cancelled">
          {orders.filter(o => o.status === "cancelled").length > 0 ? (
            orders
              .filter(o => o.status === "cancelled")
              .map(renderOrderCard)
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No cancelled orders</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
