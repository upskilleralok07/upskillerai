import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface StudyTimerProps {
  studentId: string;
}

const StudyTimer = ({ studentId }: StudyTimerProps) => {
  const { toast } = useToast();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetchMyGroups();
  }, [studentId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const fetchMyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("group_members")
        .select("*, study_groups(*)")
        .eq("student_id", studentId);

      if (error) throw error;
      setGroups(data?.map(m => m.study_groups) || []);
    } catch (error: any) {
      console.error("Error fetching groups:", error);
    }
  };

  const startTimer = async () => {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .insert({
          student_id: studentId,
          group_id: selectedGroup || null,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;
      setCurrentSessionId(data.id);
      setIsActive(true);
      toast({
        title: "Timer Started! ⏰",
        description: "Focus on your studies. You've got this!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const stopTimer = async () => {
    if (!currentSessionId) return;

    try {
      const durationMinutes = Math.floor(seconds / 60);
      
      const { error: sessionError } = await supabase
        .from("study_sessions")
        .update({
          end_time: new Date().toISOString(),
          duration_minutes: durationMinutes,
          is_active: false,
        })
        .eq("id", currentSessionId);

      if (sessionError) throw sessionError;

      // Update student total hours
      const { data: studentData } = await supabase
        .from("students")
        .select("total_study_hours")
        .eq("id", studentId)
        .single();

      if (studentData) {
        await supabase
          .from("students")
          .update({
            total_study_hours: (studentData.total_study_hours || 0) + durationMinutes / 60,
          })
          .eq("id", studentId);
      }

      // Update group hours if in a group
      if (selectedGroup) {
        const { data: groupData } = await supabase
          .from("study_groups")
          .select("total_study_hours")
          .eq("id", selectedGroup)
          .single();

        if (groupData) {
          await supabase
            .from("study_groups")
            .update({
              total_study_hours: (groupData.total_study_hours || 0) + durationMinutes / 60,
            })
            .eq("id", selectedGroup);
        }
      }

      toast({
        title: "Session Completed! 🎉",
        description: `Great job! You studied for ${Math.floor(durationMinutes)} minutes.`,
      });

      setIsActive(false);
      setSeconds(0);
      setCurrentSessionId(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Study Timer</h2>
        <p className="text-muted-foreground">Track your study time and build consistency</p>
      </div>

      <Card className="p-8 glass-card text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
          <Clock className="w-10 h-10 text-white" />
        </div>

        <div className="text-6xl md:text-7xl font-bold gradient-text font-mono">
          {formatTime(seconds)}
        </div>

        {!isActive && seconds === 0 && groups.length > 0 && (
          <div className="max-w-xs mx-auto">
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Study with a group (optional)" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          {!isActive && seconds === 0 ? (
            <Button
              size="lg"
              onClick={startTimer}
              className="bg-gradient-to-r from-primary to-secondary px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </Button>
          ) : (
            <>
              {isActive ? (
                <Button size="lg" onClick={pauseTimer} variant="outline">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => setIsActive(true)}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </Button>
              )}
              <Button size="lg" onClick={stopTimer} variant="outline">
                End Session
              </Button>
              <Button size="lg" onClick={resetTimer} variant="ghost">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {isActive && (
          <div className="text-sm text-muted-foreground animate-pulse">
            Stay focused! Every minute counts 💪
          </div>
        )}
      </Card>

      <Card className="p-6 glass-card">
        <h3 className="font-semibold mb-4">Tips for Effective Study Sessions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Use the Pomodoro technique: 25 mins study, 5 mins break</li>
          <li>✓ Eliminate distractions during your session</li>
          <li>✓ Study with a group for better accountability</li>
          <li>✓ Track your progress and celebrate small wins</li>
        </ul>
      </Card>
    </div>
  );
};

export default StudyTimer;