
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ExternalLink, ChevronRight, Download, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FreeRankAnalysis } from "@/components/FreeRankAnalysis";
import { Link } from "react-router-dom";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

const CollegeSarthiResources = () => {
  const { data: resources, isLoading, error } = useQuery({
    queryKey: ["cs-study-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as StudyResource[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24"><p className="text-muted-foreground">Loading resources...</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">College Sarthi</span> Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free study materials, rank analysis tools, and counselling resources for your college journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Free Rank Analysis</h2>
            <FreeRankAnalysis />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Study Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource) => (
                <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm">
                    Access Resource <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Card>
              ))}
              {resources?.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">Check back soon for updated study materials</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full"><Download className="h-5 w-5 text-primary" /></div>
              <div>
                <h3 className="font-medium mb-1 text-foreground">College Review Videos</h3>
                <p className="text-sm text-muted-foreground">Watch in-depth reviews of top engineering colleges</p>
                <Button variant="link" className="p-0 h-auto mt-1" asChild>
                  <Link to="/college-sarthi/reviews">Watch Now <ChevronRight className="h-3 w-3 ml-1" /></Link>
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full"><HelpCircle className="h-5 w-5 text-primary" /></div>
              <div>
                <h3 className="font-medium mb-1 text-foreground">Schedule 1:1 Counseling</h3>
                <p className="text-sm text-muted-foreground">Get expert guidance tailored to your needs</p>
                <Button variant="link" className="p-0 h-auto mt-1" asChild>
                  <Link to="/college-sarthi/contact">Book Now <ChevronRight className="h-3 w-3 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSarthiResources;
