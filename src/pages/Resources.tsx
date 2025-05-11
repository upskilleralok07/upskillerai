
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ExternalLink, ChevronRight, Download, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FreeRankAnalysis } from "@/components/FreeRankAnalysis";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

const Resources = () => {
  const { toast } = useToast();

  const { data: resources, isLoading: resourcesLoading, error } = useQuery({
    queryKey: ["study-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return data as StudyResource[];
    },
  });

  if (resourcesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load resources. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Free Resources & Analysis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access free study materials and get your rank analyzed to help with your college journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Free Rank Analysis</h2>
            <FreeRankAnalysis />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Study Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow h-full">
                  <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    Access Resource <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Card>
              ))}
              
              {resources?.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Check back soon for updated study materials</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-muted/30 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Need More Personalized Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Download Our Ultimate Guide</h3>
                <p className="text-sm text-muted-foreground">Complete roadmap for JEE preparation and college admission strategy</p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Download PDF <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Schedule 1:1 Counseling</h3>
                <p className="text-sm text-muted-foreground">Get expert guidance tailored to your specific needs and goals</p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Book Now <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
