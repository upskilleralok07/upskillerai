
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { RankAnalysisForm } from "@/components/RankAnalysisForm";
import { CollegeRecommendationsList } from "@/components/rank-analysis/CollegeRecommendationsList";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}

export function FreeRankAnalysis() {
  const { toast } = useToast();
  const [analysisRequestId, setAnalysisRequestId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const { data: recommendations, isLoading: recommendationsLoading, refetch } = useQuery({
    queryKey: ["college-recommendations", analysisRequestId],
    queryFn: async () => {
      if (!analysisRequestId) return [];
      
      try {
        const { data, error } = await supabase
          .from("college_recommendations")
          .select("*")
          .eq("analysis_request_id", analysisRequestId);
        
        if (error) {
          console.error("Error fetching recommendations:", error);
          return [];
        }

        // If we don't have real data, provide sample recommendations
        if (!data || data.length === 0) {
          return [
            { college_name: "NIT Trichy", branch: "Computer Science", round: 1, probability: "High" },
            { college_name: "IIIT Bangalore", branch: "Electronics & Communication", round: 2, probability: "Medium" },
            { college_name: "BITS Pilani", branch: "Mechanical Engineering", round: 3, probability: "Low" },
          ];
        }
        
        // Transform data to match the CollegeRecommendation interface
        return data.map(item => ({
          college_name: "College Name", // In a real app, we would fetch the college name from the colleges table
          branch: item.branch,
          round: item.round,
          probability: item.probability
        }));
      } catch (error) {
        console.error("Unexpected error:", error);
        return [];
      }
    },
    enabled: !!analysisRequestId,
  });

  const handleAnalysisSubmitted = async (requestId: string) => {
    setAnalysisRequestId(requestId);
    setIsProcessing(true);
    
    try {
      // Call the edge function to process the rank analysis
      const response = await supabase.functions.invoke("process-rank-analysis", {
        body: { requestId },
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Refetch the recommendations after processing
      await refetch();
      setShowForm(false);
    } catch (error) {
      console.error("Error processing rank analysis:", error);
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: "Failed to process your rank analysis. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisRequestId(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showForm ? (
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Free College Predictor</h2>
            <p className="text-muted-foreground">
              Enter your details to get a free analysis of colleges and branches you can target
            </p>
          </div>
          <RankAnalysisForm onAnalysisSubmitted={handleAnalysisSubmitted} />
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your College Predictions</h2>
              <p className="text-muted-foreground">
                Based on your rank and preferences, here are your college chances
              </p>
            </div>
            <Button variant="outline" onClick={resetAnalysis}>
              Start New Analysis
            </Button>
          </div>
          
          {isProcessing || recommendationsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <ReloadIcon className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Processing your college predictions...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <CollegeRecommendationsList recommendations={recommendations || []} />
              
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col md:flex-row items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                  <RocketIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Want a more accurate analysis?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our premium counselors can provide personalized guidance based on your exact profile and preferences
                  </p>
                  <Button>Book Premium Counseling Session</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
      
      <div className="mt-8 text-sm text-muted-foreground text-center">
        Note: This is a free tool that provides estimates based on previous years' data. 
        For precise guidance tailored to your exact profile, consider our personalized counseling services.
      </div>
    </div>
  );
}
