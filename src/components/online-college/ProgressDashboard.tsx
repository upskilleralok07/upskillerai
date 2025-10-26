import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Target, CheckCircle2, TrendingUp, Calendar, Clock } from "lucide-react";

interface ProgressDashboardProps {
  studentId: string;
  roadmapType: string;
}

const ProgressDashboard = ({ studentId, roadmapType }: ProgressDashboardProps) => {
  const { toast } = useToast();
  const [roadmap, setRoadmap] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [studentId, roadmapType]);

  const fetchData = async () => {
    try {
      // Fetch roadmap details
      const { data: roadmapData, error: roadmapError } = await supabase
        .from("roadmaps")
        .select("*")
        .eq("type", roadmapType as any)
        .single();

      if (roadmapError) throw roadmapError;

      // Fetch progress
      const { data: progressData, error: progressError } = await supabase
        .from("student_progress")
        .select("*")
        .eq("student_id", studentId as any)
        .eq("roadmap_type", roadmapType as any)
        .single();

      // If no progress exists, create it
      if (progressError && progressError.code === "PGRST116") {
        const { data: newProgress, error: createError } = await supabase
          .from("student_progress")
          .insert({
            student_id: studentId,
            roadmap_type: roadmapType,
            milestones_completed: 0,
            progress_percentage: 0,
          } as any)
          .select()
          .single();

        if (createError) throw createError;
        setProgress(newProgress);
      } else {
        setProgress(progressData);
      }

      // Fetch student info
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("id", studentId)
        .single();

      if (studentError) throw studentError;

      // Fetch recent study sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("student_id", studentId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (sessionsError) throw sessionsError;

      setRoadmap(roadmapData);
      setStudent(studentData);
      setRecentSessions(sessionsData || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (increment: boolean) => {
    if (!progress || !roadmap) return;

    const newMilestones = increment
      ? Math.min(progress.milestones_completed + 1, roadmap.total_milestones)
      : Math.max(progress.milestones_completed - 1, 0);

    const newPercentage = (newMilestones / roadmap.total_milestones) * 100;

    try {
      const { error } = await supabase
        .from("student_progress")
        .update({
          milestones_completed: newMilestones,
          progress_percentage: newPercentage,
        })
        .eq("id", progress.id);

      if (error) throw error;

      setProgress({
        ...progress,
        milestones_completed: newMilestones,
        progress_percentage: newPercentage,
      });

      if (newMilestones === roadmap.total_milestones) {
        toast({
          title: "Roadmap Completed! 🎉",
          description: "Congratulations on finishing your learning journey!",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading progress...</div>;
  }

  const progressPercentage = progress?.progress_percentage || 0;
  const milestonesCompleted = progress?.milestones_completed || 0;
  const totalMilestones = roadmap?.total_milestones || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Progress Dashboard</h2>
        <p className="text-muted-foreground">{roadmap?.title}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 glass-card">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Study Time</span>
          </div>
          <div className="text-3xl font-bold gradient-text">
            {(student?.total_study_hours || 0).toFixed(1)}h
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Milestones</span>
          </div>
          <div className="text-3xl font-bold gradient-text">
            {milestonesCompleted}/{totalMilestones}
          </div>
        </Card>

        <Card className="p-6 glass-card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Completion</span>
          </div>
          <div className="text-3xl font-bold gradient-text">
            {progressPercentage.toFixed(0)}%
          </div>
        </Card>
      </div>

      <Card className="p-8 glass-card space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Roadmap Progress
            </h3>
            <span className="text-sm text-muted-foreground">
              {milestonesCompleted} of {totalMilestones} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-4" />
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Button
            onClick={() => updateProgress(false)}
            variant="outline"
            disabled={milestonesCompleted === 0}
          >
            - Milestone
          </Button>
          <Button
            onClick={() => updateProgress(true)}
            className="bg-gradient-to-r from-primary to-secondary"
            disabled={milestonesCompleted === totalMilestones}
          >
            Complete Milestone +
          </Button>
        </div>

        {progressPercentage === 100 && (
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <p className="font-semibold text-primary">
              🎉 Roadmap Completed! Time to celebrate your achievement!
            </p>
          </div>
        )}
      </Card>

      <Card className="p-6 glass-card">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Recent Study Sessions
        </h3>
        {recentSessions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No study sessions yet. Start your timer to track your progress!
          </p>
        ) : (
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div>
                  <div className="font-medium">
                    {new Date(session.start_time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {session.is_active && (
                    <span className="text-xs text-primary">● In Progress</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {session.duration_minutes || 0} mins
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProgressDashboard;