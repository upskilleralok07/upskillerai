
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  return new Response(JSON.stringify({ 
    response: "This service is no longer available. Please visit our partner website for rank analysis.",
    redirectUrl: "https://tinyurl.com/28u2jd36"
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
