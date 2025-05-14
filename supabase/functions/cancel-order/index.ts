
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.18.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const { orderId } = await req.json();
    console.log("Cancel order request for orderId:", orderId);
    
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Get the order to check if we need to refund via Stripe
    const { data: order, error: orderFetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
      
    if (orderFetchError) {
      console.error("Error fetching order:", orderFetchError);
      throw new Error(`Order not found: ${orderFetchError.message}`);
    }
    
    // If order has a payment_id, we may need to refund via Stripe
    if (order.payment_id && order.status !== 'pending') {
      // Initialize Stripe
      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
        apiVersion: "2023-10-16",
      });
      
      try {
        // Try to refund if it's a completed payment
        const refund = await stripe.refunds.create({
          payment_intent: order.payment_id,
        });
        console.log("Created refund:", refund.id);
      } catch (stripeErr) {
        // Just log the error but continue with cancellation
        console.error("Stripe refund error:", stripeErr);
      }
    }
    
    // Update order status to cancelled
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId);
      
    if (updateError) {
      console.error("Error updating order status:", updateError);
      throw new Error(`Failed to cancel order: ${updateError.message}`);
    }
    
    console.log("Successfully cancelled order", orderId);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Order cancellation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
