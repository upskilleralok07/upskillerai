
// supabase/functions/process-rank-analysis/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the request data
    const { requestId } = await req.json();
    
    if (!requestId) {
      return new Response(
        JSON.stringify({ error: "Request ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Get the rank analysis request
    const { data: request, error: requestError } = await supabase
      .from("rank_analysis_requests")
      .select("*")
      .eq("id", requestId)
      .single();
      
    if (requestError) {
      console.error("Error fetching request:", requestError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch analysis request" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
    
    // Based on the request data, generate college recommendations
    // This is a simplified example. In reality, you would have a more complex algorithm
    // that takes into account the rank, category, etc.
    const recommendations = [
      {
        analysis_request_id: requestId,
        college_id: null, // Would normally point to a college in the colleges table
        branch: "Computer Science",
        round: 1,
        probability: "High",
      },
      {
        analysis_request_id: requestId,
        college_id: null,
        branch: "Electronics & Communication",
        round: 2,
        probability: "Medium",
      },
      {
        analysis_request_id: requestId,
        college_id: null,
        branch: "Mechanical Engineering",
        round: 3,
        probability: "Low",
      }
    ];
    
    // Save the recommendations to the database
    const { error: insertError } = await supabase
      .from("college_recommendations")
      .insert(recommendations);
      
    if (insertError) {
      console.error("Error inserting recommendations:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save recommendations" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
    
    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Rank analysis processed successfully",
        requestId 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
};

serve(handler);
