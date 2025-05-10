
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
    const { orderId, amount, callbackUrl } = await req.json();
    
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

    // Create a unique transaction ID
    const merchantTransactionId = `ORDER_${orderId}_${Date.now()}`;
    
    // Prepare the payload for PhonePe
    const payload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID_" + Date.now(),
      amount: amount * 100, // Convert to paisa (smallest unit of INR)
      redirectUrl: `${callbackUrl}/payment-result?orderId=${orderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${callbackUrl}/api/payment-callback`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };
    
    const payloadString = JSON.stringify(payload);
    const payloadBase64 = btoa(payloadString);
    
    // Create the X-VERIFY header
    // In a real implementation, you would compute SHA256 hash with salt key
    // For demonstration, we'll use a simplified approach
    const encoder = new TextEncoder();
    const data = encoder.encode(payloadBase64 + "/pg/v1/pay" + saltKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const xVerify = hashHex + "###" + saltIndex;
    
    // Make the API call to PhonePe
    const phonePeUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const response = await fetch(phonePeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify
      },
      body: JSON.stringify({
        request: payloadBase64
      })
    });
    
    const responseData = await response.json();
    
    // Update the order with the payment information
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Save the payment transaction ID to the order
      await supabase
        .from('orders')
        .update({ payment_id: merchantTransactionId })
        .eq('id', orderId);
    }
    
    console.log("Payment initiated", responseData);
    
    // Return the response to the client
    return new Response(
      JSON.stringify(responseData),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error initiating payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
