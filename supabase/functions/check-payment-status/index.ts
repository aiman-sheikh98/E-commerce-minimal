
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { merchantTransactionId } = await req.json();
    
    // Get PhonePe credentials from environment variables
    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPE_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPE_SALT_INDEX");
    
    if (!merchantId || !saltKey || !saltIndex) {
      console.error("Missing PhonePe credentials");
      return new Response(
        JSON.stringify({ error: "PhonePe credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create the X-VERIFY header for status check
    // In a real implementation, you would compute SHA256 hash with salt key
    const url = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(url + saltKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const xVerify = hashHex + "###" + saltIndex;
    
    // Make the API call to PhonePe status endpoint
    const phonePeUrl = `https://api.phonepe.com/apis/hermes${url}`;
    const response = await fetch(phonePeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': merchantId
      }
    });
    
    const responseData = await response.json();
    
    // Update order status based on payment status
    if (responseData.success && responseData.data?.state === 'COMPLETED') {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Find the order with this payment ID and update its status
        const { data: orders } = await supabase
          .from('orders')
          .select('id')
          .eq('payment_id', merchantTransactionId)
          .limit(1);
        
        if (orders && orders.length > 0) {
          await supabase
            .from('orders')
            .update({ status: 'processing' })
            .eq('id', orders[0].id);
        }
      }
    }
    
    console.log("Payment status check", responseData);
    
    // Return the response to the client
    return new Response(
      JSON.stringify(responseData),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error checking payment status:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
