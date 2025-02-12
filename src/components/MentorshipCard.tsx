
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MentorshipCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  planType: 'free' | 'premium';
  featured?: boolean;
}

const MentorshipCard = ({ title, description, features, price, planType, featured = false }: MentorshipCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: resources } = useQuery({
    queryKey: ["study-resources", planType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .eq('plan_type', planType)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return data;
    },
  });

  const handleGetStarted = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the resources",
      });
      navigate("/auth");
      return;
    }

    if (planType === 'premium') {
      toast({
        title: "Premium Features",
        description: "Subscribe to access premium resources including AI roadmap and exclusive video content!",
      });
      return;
    }

    navigate("/resources");
  };

  return (
    <div className={`p-6 rounded-2xl ${featured ? 'bg-primary/5 border-2 border-primary' : 'bg-card'} shadow-lg hover:shadow-xl transition-all duration-300 relative animate-fade-in`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}
        {resources && resources.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-lg font-semibold mb-2">Included Resources:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="text-muted-foreground">
                  {resource.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-foreground mb-6">{price}</div>
      <button 
        onClick={handleGetStarted}
        className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
          featured ? 'bg-primary text-primary-foreground hover:bg-primary-dark' : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        Get Started
      </button>
    </div>
  );
};

export default MentorshipCard;
