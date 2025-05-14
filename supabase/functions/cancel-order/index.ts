
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@12.18.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, userId } = await req.json();
    
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Create Supabase client with service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Fetch order details to verify ownership and get payment ID
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found or you don't have permission to cancel it`);
    }

    // Check if the order is in a cancellable state
    if (order.status !== 'pending' && order.status !== 'processing') {
      throw new Error(`Cannot cancel order with status: ${order.status}`);
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // If there's a payment ID, attempt to refund through Stripe
    if (order.payment_id) {
      // Get payment intent from the session
      const session = await stripe.checkout.sessions.retrieve(order.payment_id);
      
      if (session.payment_intent) {
        // Attempt to refund the payment
        await stripe.refunds.create({
          payment_intent: session.payment_intent.toString(),
        });
      }
    }

    // Update order status to cancelled
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (updateError) {
      throw new Error(`Failed to update order status: ${updateError.message}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Order cancelled successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
