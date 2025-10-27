import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, Target, Share2, Youtube } from "lucide-react";
import RoadmapProgress from "@/components/online-college/RoadmapProgress";
import GroupDiscussions from "@/components/online-college/GroupDiscussions";
import GroupTargets from "@/components/online-college/GroupTargets";
import InviteFriends from "@/components/online-college/InviteFriends";
import GroupResources from "@/components/online-college/GroupResources";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchGroupDetails();
    fetchStudentProfile();
  }, [user, groupId]);

  const fetchStudentProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      setStudentProfile(data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const fetchGroupDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .select(`
          *,
          group_members(count)
        `)
        .eq("id", groupId)
        .single();

      if (error) throw error;
      setGroup(data);
    } catch (error) {
      console.error("Error fetching group:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading group...</div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold">Group not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">{group.name}</span>
          </h1>
          <p className="text-muted-foreground">{group.study_target}</p>
          {group.roadmap_category && (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              <BookOpen className="w-4 h-4" />
              {group.roadmap_category.replace('_', ' ').split(' ').map((w: string) => 
                w.charAt(0).toUpperCase() + w.slice(1)
              ).join(' ')}
            </div>
          )}
        </div>

        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Roadmap</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="targets" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Targets</span>
            </TabsTrigger>
            <TabsTrigger value="invite" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Invite</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            {group.roadmap_category ? (
              <RoadmapProgress 
                groupId={group.id} 
                studentId={studentProfile?.id}
                roadmapCategory={group.roadmap_category}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No roadmap selected for this group</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources">
            <GroupResources groupId={group.id} studentId={studentProfile?.id} />
          </TabsContent>

          <TabsContent value="discussions">
            <GroupDiscussions groupId={group.id} studentId={studentProfile?.id} />
          </TabsContent>

          <TabsContent value="targets">
            <GroupTargets groupId={group.id} studentId={studentProfile?.id} />
          </TabsContent>

          <TabsContent value="invite">
            <InviteFriends groupId={group.id} studentId={studentProfile?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetails;
