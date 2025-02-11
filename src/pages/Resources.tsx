
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StudyResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
}

const Resources = () => {
  const { data: resources, isLoading } = useQuery({
    queryKey: ["study-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*");
      if (error) throw error;
      return data as StudyResource[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Free Study Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources?.map((resource) => (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-muted-foreground mb-4">{resource.description}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
