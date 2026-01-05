import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DailyStats {
  date: string;
  totalMinutes: number;
  sessions: number;
}

interface StudentStats {
  todayMinutes: number;
  weekMinutes: number;
  monthMinutes: number;
  allTimeMinutes: number;
  todaySessions: number;
  weekSessions: number;
  monthSessions: number;
  allTimeSessions: number;
  currentStreak: number;
  longestStreak: number;
  weeklyStreak: number;
  dailyHistory: DailyStats[];
  bestDay: DailyStats | null;
}

interface UseStudentStatsProps {
  studentId: string;
}

const STREAK_STORAGE_KEY = "campus_streak_data";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  weeklyStreak: number;
  lastActiveDate: string;
}

export function useStudentStats({ studentId }: UseStudentStatsProps) {
  const [stats, setStats] = useState<StudentStats>({
    todayMinutes: 0,
    weekMinutes: 0,
    monthMinutes: 0,
    allTimeMinutes: 0,
    todaySessions: 0,
    weekSessions: 0,
    monthSessions: 0,
    allTimeSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyStreak: 0,
    dailyHistory: [],
    bestDay: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const getDateString = (date: Date) => date.toISOString().split("T")[0];

  const calculateStreaks = useCallback((sessions: any[]): StreakData => {
    // Load existing streak data
    const savedStreak = localStorage.getItem(`${STREAK_STORAGE_KEY}_${studentId}`);
    let streakData: StreakData = savedStreak
      ? JSON.parse(savedStreak)
      : { currentStreak: 0, longestStreak: 0, weeklyStreak: 0, lastActiveDate: "" };

    if (sessions.length === 0) return streakData;

    // Group sessions by date
    const sessionsByDate = new Map<string, number>();
    sessions.forEach((session) => {
      const date = getDateString(new Date(session.start_time));
      sessionsByDate.set(date, (sessionsByDate.get(date) || 0) + 1);
    });

    // Sort dates
    const dates = Array.from(sessionsByDate.keys()).sort();
    if (dates.length === 0) return streakData;

    const today = getDateString(new Date());
    const yesterday = getDateString(new Date(Date.now() - 86400000));

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = today;

    // If no activity today, check if yesterday had activity
    if (!sessionsByDate.has(today) && sessionsByDate.has(yesterday)) {
      checkDate = yesterday;
    }

    // Count consecutive days
    while (sessionsByDate.has(checkDate)) {
      currentStreak++;
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      checkDate = getDateString(prevDate);
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let prevDate = "";

    dates.forEach((date) => {
      if (prevDate) {
        const prevDateObj = new Date(prevDate);
        const currDateObj = new Date(date);
        const diffDays = Math.floor(
          (currDateObj.getTime() - prevDateObj.getTime()) / 86400000
        );

        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      prevDate = date;
    });
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    // Calculate weekly streak (weeks with at least 5 active days)
    const weekMap = new Map<string, Set<string>>();
    dates.forEach((date) => {
      const dateObj = new Date(date);
      const weekStart = new Date(dateObj);
      weekStart.setDate(dateObj.getDate() - dateObj.getDay());
      const weekKey = getDateString(weekStart);
      
      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, new Set());
      }
      weekMap.get(weekKey)!.add(date);
    });

    let weeklyStreak = 0;
    const sortedWeeks = Array.from(weekMap.keys()).sort().reverse();
    for (const week of sortedWeeks) {
      if ((weekMap.get(week)?.size || 0) >= 5) {
        weeklyStreak++;
      } else {
        break;
      }
    }

    const newStreakData: StreakData = {
      currentStreak,
      longestStreak,
      weeklyStreak,
      lastActiveDate: today,
    };

    // Save streak data
    localStorage.setItem(
      `${STREAK_STORAGE_KEY}_${studentId}`,
      JSON.stringify(newStreakData)
    );

    return newStreakData;
  }, [studentId]);

  const fetchStats = useCallback(async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart);
      weekStart.setDate(todayStart.getDate() - 7);
      const monthStart = new Date(todayStart);
      monthStart.setDate(todayStart.getDate() - 30);

      // Fetch all sessions
      const { data: sessions, error } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("student_id", studentId)
        .not("duration_minutes", "is", null)
        .order("start_time", { ascending: false });

      if (error) throw error;

      // Calculate stats
      let todayMinutes = 0,
        weekMinutes = 0,
        monthMinutes = 0,
        allTimeMinutes = 0;
      let todaySessions = 0,
        weekSessions = 0,
        monthSessions = 0,
        allTimeSessions = 0;
      const dailyMap = new Map<string, DailyStats>();

      (sessions || []).forEach((session) => {
        const sessionDate = new Date(session.start_time);
        const dateStr = getDateString(sessionDate);
        const minutes = session.duration_minutes || 0;

        allTimeMinutes += minutes;
        allTimeSessions++;

        if (sessionDate >= todayStart) {
          todayMinutes += minutes;
          todaySessions++;
        }
        if (sessionDate >= weekStart) {
          weekMinutes += minutes;
          weekSessions++;
        }
        if (sessionDate >= monthStart) {
          monthMinutes += minutes;
          monthSessions++;
        }

        // Daily history
        if (!dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, { date: dateStr, totalMinutes: 0, sessions: 0 });
        }
        const daily = dailyMap.get(dateStr)!;
        daily.totalMinutes += minutes;
        daily.sessions++;
      });

      // Get daily history sorted by date
      const dailyHistory = Array.from(dailyMap.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Find best day
      const bestDay = dailyHistory.reduce<DailyStats | null>((best, day) => {
        if (!best || day.totalMinutes > best.totalMinutes) return day;
        return best;
      }, null);

      // Calculate streaks
      const streakData = calculateStreaks(sessions || []);

      setStats({
        todayMinutes,
        weekMinutes,
        monthMinutes,
        allTimeMinutes,
        todaySessions,
        weekSessions,
        monthSessions,
        allTimeSessions,
        currentStreak: streakData.currentStreak,
        longestStreak: streakData.longestStreak,
        weeklyStreak: streakData.weeklyStreak,
        dailyHistory: dailyHistory.slice(0, 30), // Last 30 days
        bestDay,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [studentId, calculateStreaks]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    refetch: fetchStats,
  };
}
