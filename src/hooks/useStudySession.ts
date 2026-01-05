import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ActivityType = "coding" | "learning" | "research" | "writing" | "planning" | "other";
export type TimerMode = "sprint" | "focus";
export type TimerDuration = 25 | 30 | 45 | 50 | 90 | 180;

interface StudySession {
  id: string;
  startTime: Date;
  activityType: ActivityType;
  timerMode: TimerMode;
  targetDuration: number; // in minutes
  groupId?: string;
  taskId?: string;
}

interface UseStudySessionProps {
  studentId: string;
}

interface UseStudySessionReturn {
  // Timer state
  seconds: number;
  isActive: boolean;
  isPaused: boolean;
  currentSession: StudySession | null;
  
  // Timer controls
  startSession: (activityType: ActivityType, mode: TimerMode, duration: TimerDuration, groupId?: string, taskId?: string) => Promise<void>;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: (shouldContinue?: boolean) => Promise<void>;
  
  // Helpers
  formatTime: (totalSeconds: number) => string;
  getProgress: () => number;
  getRemainingTime: () => number;
}

const STORAGE_KEY = "campus_active_session";

export function useStudySession({ studentId }: UseStudySessionProps): UseStudySessionReturn {
  const { toast } = useToast();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load session from storage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        const startTime = new Date(parsed.startTime);
        const elapsedSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
        
        if (elapsedSeconds < parsed.targetDuration * 60 + 3600) { // Allow 1 hour buffer
          setCurrentSession({ ...parsed, startTime });
          setSeconds(Math.min(elapsedSeconds, parsed.targetDuration * 60));
          setIsActive(true);
          setIsPaused(parsed.isPaused || false);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Timer interval
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          // Check if timer completed
          if (currentSession && next >= currentSession.targetDuration * 60) {
            playCompletionSound();
            toast({
              title: "Session Complete! 🎉",
              description: `Great job! You completed ${currentSession.targetDuration} minutes of ${currentSession.activityType}.`,
            });
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, currentSession]);

  // Save session to storage
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...currentSession,
        isPaused,
      }));
    }
  }, [currentSession, isPaused]);

  const playCompletionSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleA0IA43Z5KF8FgAAiNXopHoYAACI1eqhexgAA4vU6J14GQEGj9Pkl3oXAgqS0+GPeRcED5TQ3Yl5FgcSls3Yg3kUChaYytKAeRILGprHzHx4EQ4dn8TFd3gPEiGiwr94dg8VJaW+tnZ0DhsrqLqwc3INHzCrtqpxcQwkNK6ypmxvCyo5sbKia2wJMD21sZ5pbAk1QrizmmZpCTpHu7WVYmYJPk29t5BeYwlBUb+4i1tgCURVwLmHV1wJR1nBuoNTWQlJXsG6flBVCUtiwbt5TFIJTWXAO3VITglPaL84cEVJCVBqvzVtQ0YJUWW7M2pBQwlRYrYxaT4/CVFgtS9mPDsJUV2zLWQ6OAlRWrAsYjc1CVFYrStgNTIJUVapKV4zLwlRU6coXTAtCVFRpSdcLioJUU+jJlsrKAlPTaElWikmCE9LoSNZJyQIT0mgIlglIghPR58hVyMgCE9GniFWIh4IT0SdIFUgHAhPQ5wfVB8aCE9CmidbHxgIT0CaJlodFghOQJkmWRwUCE4/mCVYGxIITj6XJFcaEAhOPZYjVhkOCE48lSJVGAwITjuUIlQXCghOOpMhUxYICE45kiNSFQYITjiRIlEUBAhON5AhUBMCCE42jyBPEgAITjWOH04RAAdONI0eTg8ABk40jB1NDgAGTjOLHE0NAAVOM4obTA0ABE4yiRpMDAADTjKIG0sLAAJOMYcaSgoAAU4xhhlKCgAATjCFGEoJAABOMIQXSQgAAE4vgxZJBwAATi+CFkkHAABOLoEWSQYAAE4ugBVJBgAATi1/FEkFAABOLX4TSQUAAE4sfRNJBAAATix8EkkEAABOK3sRSQMAAE4rehFJAwAATip5EEkCAABOKnkPSQIAAE4peA9JAgAATil3DkkBAABOKHYNSQEAAE4odg1JAQAAA==");
      }
      audioRef.current.play();
    } catch (e) {
      console.log("Could not play sound");
    }
  };

  const startSession = useCallback(async (
    activityType: ActivityType,
    mode: TimerMode,
    duration: TimerDuration,
    groupId?: string,
    taskId?: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .insert({
          student_id: studentId,
          group_id: groupId || null,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      const session: StudySession = {
        id: data.id,
        startTime: new Date(),
        activityType,
        timerMode: mode,
        targetDuration: duration,
        groupId,
        taskId,
      };

      setCurrentSession(session);
      setSeconds(0);
      setIsActive(true);
      setIsPaused(false);

      toast({
        title: `${mode === "sprint" ? "Sprint" : "Focus"} Started! ⏱️`,
        description: `${duration} minute ${activityType} session. You've got this!`,
      });
    } catch (error: any) {
      toast({
        title: "Error starting session",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [studentId, toast]);

  const pauseSession = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeSession = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopSession = useCallback(async (shouldContinue = false) => {
    if (!currentSession) return;

    try {
      const durationMinutes = Math.floor(seconds / 60);

      // Update session in database
      await supabase
        .from("study_sessions")
        .update({
          end_time: new Date().toISOString(),
          duration_minutes: durationMinutes,
          is_active: false,
        })
        .eq("id", currentSession.id);

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

      // Update group hours if applicable
      if (currentSession.groupId) {
        const { data: groupData } = await supabase
          .from("study_groups")
          .select("total_study_hours")
          .eq("id", currentSession.groupId)
          .single();

        if (groupData) {
          await supabase
            .from("study_groups")
            .update({
              total_study_hours: (groupData.total_study_hours || 0) + durationMinutes / 60,
            })
            .eq("id", currentSession.groupId);
        }
      }

      if (!shouldContinue) {
        toast({
          title: "Session Saved! ✅",
          description: `${durationMinutes} minutes of ${currentSession.activityType} logged.`,
        });
      }

      // Clean up
      localStorage.removeItem(STORAGE_KEY);
      setCurrentSession(null);
      setSeconds(0);
      setIsActive(false);
      setIsPaused(false);

      // If continuing, start a new session
      if (shouldContinue) {
        await startSession(
          currentSession.activityType,
          currentSession.timerMode,
          currentSession.targetDuration as TimerDuration,
          currentSession.groupId,
          currentSession.taskId
        );
      }
    } catch (error: any) {
      toast({
        title: "Error saving session",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [currentSession, seconds, studentId, toast, startSession]);

  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const getProgress = useCallback((): number => {
    if (!currentSession) return 0;
    return Math.min((seconds / (currentSession.targetDuration * 60)) * 100, 100);
  }, [seconds, currentSession]);

  const getRemainingTime = useCallback((): number => {
    if (!currentSession) return 0;
    return Math.max(currentSession.targetDuration * 60 - seconds, 0);
  }, [seconds, currentSession]);

  return {
    seconds,
    isActive,
    isPaused,
    currentSession,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    formatTime,
    getProgress,
    getRemainingTime,
  };
}
