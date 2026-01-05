import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ActivityType } from "./useStudySession";

interface ActiveStudent {
  id: string;
  name: string;
  activityType: ActivityType;
  startTime: string;
}

interface ActivityStats {
  coding: number;
  learning: number;
  research: number;
  writing: number;
  planning: number;
  other: number;
  total: number;
}

interface UseCampusActivityReturn {
  activeStudents: ActiveStudent[];
  activityStats: ActivityStats;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useCampusActivity(campus?: string): UseCampusActivityReturn {
  const [activeStudents, setActiveStudents] = useState<ActiveStudent[]>([]);
  const [activityStats, setActivityStats] = useState<ActivityStats>({
    coding: 0,
    learning: 0,
    research: 0,
    writing: 0,
    planning: 0,
    other: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchActiveStudents = useCallback(async () => {
    try {
      let query = supabase
        .from("study_sessions")
        .select(`
          id,
          start_time,
          student_id,
          students!inner(id, name, campus)
        `)
        .eq("is_active", true);

      if (campus) {
        query = query.eq("students.campus", campus);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Since we don't have activity_type in the database yet, simulate distribution
      const activities: ActivityType[] = ["coding", "learning", "research", "writing", "planning", "other"];
      
      const students: ActiveStudent[] = (data || []).map((session: any, index: number) => ({
        id: session.student_id,
        name: session.students?.name || "Student",
        activityType: activities[index % activities.length],
        startTime: session.start_time,
      }));

      setActiveStudents(students);

      // Calculate stats
      const stats: ActivityStats = {
        coding: 0,
        learning: 0,
        research: 0,
        writing: 0,
        planning: 0,
        other: 0,
        total: students.length,
      };

      students.forEach((student) => {
        stats[student.activityType]++;
      });

      setActivityStats(stats);
    } catch (error) {
      console.error("Error fetching active students:", error);
    } finally {
      setIsLoading(false);
    }
  }, [campus]);

  useEffect(() => {
    fetchActiveStudents();

    // Poll every 30 seconds for updates
    const interval = setInterval(fetchActiveStudents, 30000);

    // Subscribe to real-time changes
    const channel = supabase
      .channel("campus-activity")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "study_sessions",
        },
        () => {
          fetchActiveStudents();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [fetchActiveStudents]);

  return {
    activeStudents,
    activityStats,
    isLoading,
    refetch: fetchActiveStudents,
  };
}
