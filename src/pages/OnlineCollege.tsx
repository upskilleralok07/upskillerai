import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import StudentRegistration from "@/components/online-college/StudentRegistration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, Timer, ListTodo, Trophy, BarChart2, Award, Flame
} from "lucide-react";

// New Campus Components
import { LiveActivityPanel } from "@/components/campus/LiveActivityPanel";
import { StatsOverview } from "@/components/campus/StatsOverview";
import { FocusTimer } from "@/components/campus/FocusTimer";
import { TaskBoard } from "@/components/campus/TaskBoard";
import { CampusLeaderboard } from "@/components/campus/CampusLeaderboard";
import { AnalyticsDashboard } from "@/components/campus/AnalyticsDashboard";
import { BadgesAndAchievements } from "@/components/campus/BadgesAndAchievements";
import { StreakTracker } from "@/components/campus/StreakTracker";
import { useStudentStats } from "@/hooks/useStudentStats";

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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your campus...</p>
        </div>
      </div>
    );
  }

  if (!studentProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <StudentRegistration onComplete={checkStudentProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{studentProfile.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Your virtual campus at {studentProfile.campus}
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-7 mb-8 bg-card/50 backdrop-blur">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="hidden md:inline">Focus</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              <span className="hidden md:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span className="hidden md:inline">Streak</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden md:inline">Rank</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden md:inline">Badges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <StatsOverview studentId={studentProfile.id} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FocusTimer studentId={studentProfile.id} />
              <LiveActivityPanel campus={studentProfile.campus} />
            </div>
          </TabsContent>

          <TabsContent value="timer">
            <div className="max-w-2xl mx-auto">
              <FocusTimer studentId={studentProfile.id} />
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <TaskBoard studentId={studentProfile.id} />
          </TabsContent>

          <TabsContent value="streak">
            <div className="max-w-3xl mx-auto">
              <StreakTracker studentId={studentProfile.id} />
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="max-w-3xl mx-auto">
              <CampusLeaderboard 
                campus={studentProfile.campus} 
                currentStudentId={studentProfile.id}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard studentId={studentProfile.id} />
          </TabsContent>

          <TabsContent value="badges">
            <StudentBadgesWrapper studentId={studentProfile.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Wrapper to get stats for badges
function StudentBadgesWrapper({ studentId }: { studentId: string }) {
  const { stats } = useStudentStats({ studentId });
  
  return (
    <BadgesAndAchievements
      studentId={studentId}
      totalMinutes={stats.allTimeMinutes}
      currentStreak={stats.currentStreak}
      longestStreak={stats.longestStreak}
      totalSessions={stats.allTimeSessions}
    />
  );
}

export default OnlineCollege;
