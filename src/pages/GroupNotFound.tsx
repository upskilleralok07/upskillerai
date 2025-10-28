import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const GroupNotFound = () => {
  const navigate = useNavigate();
  const [trendingGroups, setTrendingGroups] = useState<any[]>([]);

  useEffect(() => {
    fetchTrendingGroups();
  }, []);

  const fetchTrendingGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .select(`
          *,
          group_members(count)
        `)
        .eq("privacy", "public")
        .order("total_study_hours", { ascending: false })
        .limit(3);

      if (error) throw error;
      setTrendingGroups(data || []);
    } catch (error) {
      console.error("Error fetching trending groups:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center mb-8">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-3xl font-bold mb-4">Group Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Looks like this group link is broken or unavailable. The group may have been deleted or you may not have permission to access it.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/")}>
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              <Button onClick={() => navigate("/online-college")} variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Browse Groups
              </Button>
            </div>
          </Card>

          {trendingGroups.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                🔥 Trending Groups You Can Join
              </h2>
              <div className="space-y-4">
                {trendingGroups.map((group) => (
                  <Card key={group.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          📍 {group.campus}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>🎯 {group.study_target}</span>
                          <span>👥 {group.group_members?.[0]?.count || 0} members</span>
                        </div>
                      </div>
                      <Button onClick={() => navigate(`/online-college/group/${group.id}`)}>
                        View Group
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupNotFound;
