
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  amount: number;
  orderId: string;
  userPhone: string;
  productName: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { amount, orderId, userPhone, productName } = await req.json() as PaymentRequest

    // Log the payment request
    console.log('Payment request received:', { amount, orderId, userPhone, productName })

    // Here you would normally:
    // 1. Call PhonePe's API to create a payment request
    // 2. Get back a payment URL or token
    // 3. Return that to the client

    // For now, we'll return a mock response
    const mockPaymentUrl = `phonepe://pay?merchantId=MERCHANTUAT&transactionId=${orderId}&amount=${amount}`

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: mockPaymentUrl,
        message: "Payment initiated successfully",
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to process payment",
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    )
  }
})
