
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";

export function FreeRankAnalysis() {
  const redirectURL = "https://tinyurl.com/28u2jd36";
  
  const handleRedirect = () => {
    window.open(redirectURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Free College Predictor</h2>
          <p className="text-muted-foreground mb-4">
            Use our partner website to get a free analysis of colleges and branches you can target
          </p>
          
          <Button 
            onClick={handleRedirect} 
            className="w-full mb-6"
            size="lg"
          >
            Go to Rank Analysis Tool <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
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
      </Card>
      
      <div className="mt-8 text-sm text-muted-foreground text-center">
        Note: For the most precise guidance tailored to your exact profile, consider our personalized counseling services.
      </div>
    </div>
  );
}
