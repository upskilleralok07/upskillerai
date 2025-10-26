import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import StudentRegistration from "@/components/online-college/StudentRegistration";
import StudyGroups from "@/components/online-college/StudyGroups";
import StudyTimer from "@/components/online-college/StudyTimer";
import Leaderboard from "@/components/online-college/Leaderboard";
import ProgressDashboard from "@/components/online-college/ProgressDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Timer, Trophy, TrendingUp } from "lucide-react";

const OnlineCollege = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    checkStudentProfile();
  }, [user]);

  const checkStudentProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching student profile:", error);
      }
      setStudentProfile(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!studentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <Navbar />
        <StudentRegistration onComplete={checkStudentProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Online College</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn together, compete together, succeed together
          </p>
        </div>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="hidden sm:inline">Study Timer</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <StudyGroups studentId={studentProfile.id} campus={studentProfile.campus} />
          </TabsContent>

          <TabsContent value="timer">
            <StudyTimer studentId={studentProfile.id} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard campus={studentProfile.campus} />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressDashboard 
              studentId={studentProfile.id}
              roadmapType={studentProfile.selected_roadmap}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OnlineCollege;