
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedOrder } from '@/types/order';
import { useAuth } from '@/context/AuthContext';

export const useRealTimeOrders = () => {
  const [orders, setOrders] = useState<EnhancedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    // Only fetch data if the user is authenticated
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    
    const fetchOrders = async () => {
      setLoading(true);
      
      try {
        // First fetch all orders for the user
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (orderError) throw orderError;
        
        // Then fetch the order items for each order
        const enhancedOrders = await Promise.all(
          orderData.map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);
              
            if (itemsError) throw itemsError;
            
            return {
              ...order,
              items: itemsData
            };
          })
        );
        
        setOrders(enhancedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
    
    // Set up a real-time subscription to changes in the orders table
    const ordersSubscription = supabase
      .channel('order-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          // Re-fetch all orders when changes occur
          fetchOrders();
        }
      )
      .subscribe();
      
    // Set up a real-time subscription to changes in the order_items table
    const itemsSubscription = supabase
      .channel('order-items-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'order_items'
        },
        (payload) => {
          // Re-fetch all orders when order items change
          fetchOrders();
        }
      )
      .subscribe();
    
    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(ordersSubscription);
      supabase.removeChannel(itemsSubscription);
    };
  }, [user]);
  
  return { orders, loading, error };
};
