import { useState } from "react";
import { useStudySession, ActivityType, TimerMode, TimerDuration } from "@/hooks/useStudySession";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, Pause, Square, RotateCcw, 
  Code, BookOpen, Search, PenTool, ListTodo, MoreHorizontal,
  Zap, Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FocusTimerProps {
  studentId: string;
  className?: string;
}

const ACTIVITY_TYPES: { type: ActivityType; icon: typeof Code; label: string; color: string }[] = [
  { type: "coding", icon: Code, label: "Coding", color: "bg-activity-coding" },
  { type: "learning", icon: BookOpen, label: "Learning", color: "bg-activity-learning" },
  { type: "research", icon: Search, label: "Research", color: "bg-activity-research" },
  { type: "writing", icon: PenTool, label: "Writing", color: "bg-activity-writing" },
  { type: "planning", icon: ListTodo, label: "Planning", color: "bg-activity-planning" },
  { type: "other", icon: MoreHorizontal, label: "Other", color: "bg-activity-other" },
];

const TIMER_MODES: { mode: TimerMode; durations: TimerDuration[]; icon: typeof Zap; label: string }[] = [
  { mode: "sprint", durations: [25, 50], icon: Zap, label: "Sprint" },
  { mode: "focus", durations: [30, 45, 90, 180], icon: Target, label: "Focus" },
];

export function FocusTimer({ studentId, className }: FocusTimerProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>("coding");
  const [selectedMode, setSelectedMode] = useState<TimerMode>("sprint");
  const [selectedDuration, setSelectedDuration] = useState<TimerDuration>(25);

  const {
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
  } = useStudySession({ studentId });

  const handleStart = () => {
    startSession(selectedActivity, selectedMode, selectedDuration);
  };

  const progress = getProgress();
  const remainingTime = getRemainingTime();

  // Calculate circle dimensions
  const size = 280;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <Card className={cn("glass-card p-6 md:p-8", className)}>
      {!isActive ? (
        // Setup View
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Start a Session</h2>
            <p className="text-muted-foreground">
              Choose your activity and focus duration
            </p>
          </div>

          {/* Activity Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">What are you working on?</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {ACTIVITY_TYPES.map((activity) => {
                const Icon = activity.icon;
                return (
                  <button
                    key={activity.type}
                    onClick={() => setSelectedActivity(activity.type)}
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2",
                      selectedActivity === activity.type
                        ? "border-primary bg-primary/10 shadow-lg"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn("p-2 rounded-lg", activity.color, "bg-opacity-20")}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">{activity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timer Mode */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Session type</label>
            <div className="flex gap-3">
              {TIMER_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.mode}
                    onClick={() => {
                      setSelectedMode(mode.mode);
                      setSelectedDuration(mode.durations[0]);
                    }}
                    className={cn(
                      "flex-1 p-4 rounded-xl border transition-all duration-200 flex items-center justify-center gap-3",
                      selectedMode === mode.mode
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Duration</label>
            <div className="flex flex-wrap gap-2">
              {TIMER_MODES.find((m) => m.mode === selectedMode)?.durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-all duration-200 font-mono",
                    selectedDuration === duration
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {duration >= 60 ? `${duration / 60}h` : `${duration}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <Button
            size="lg"
            onClick={handleStart}
            className="w-full gradient-bg text-white py-6 text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start {selectedMode === "sprint" ? "Sprint" : "Focus Session"}
          </Button>
        </div>
      ) : (
        // Active Timer View
        <div className="space-y-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mb-2">
              {currentSession?.timerMode === "sprint" ? <Zap className="w-4 h-4" /> : <Target className="w-4 h-4" />}
              {currentSession?.timerMode === "sprint" ? "Sprint Mode" : "Focus Mode"}
            </span>
            <h2 className="text-xl font-semibold capitalize">
              {currentSession?.activityType} Session
            </h2>
          </div>

          {/* Circular Progress Timer */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-muted/30"
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="activity-ring"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(280, 68%, 60%)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Timer Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="timer-display text-5xl font-bold">
                  {formatTime(seconds)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {formatTime(remainingTime)} remaining
                </div>
                {isPaused && (
                  <div className="text-sm text-warning mt-2 font-medium">
                    Paused
                  </div>
                )}
              </div>

              {/* Pulsing ring when active */}
              {isActive && !isPaused && (
                <div 
                  className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring"
                  style={{ width: size, height: size }}
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {isPaused ? (
              <Button
                size="lg"
                onClick={resumeSession}
                className="gradient-bg text-white px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Resume
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={pauseSession}
                variant="outline"
                className="px-8"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            )}
            
            <Button
              size="lg"
              onClick={() => stopSession(false)}
              variant="outline"
              className="px-8"
            >
              <Square className="w-5 h-5 mr-2" />
              Done
            </Button>

            <Button
              size="lg"
              onClick={() => stopSession(true)}
              variant="ghost"
              className="px-4"
              title="Continue with new session"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

          {/* Motivational message */}
          {isActive && !isPaused && (
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              Stay focused! You're making great progress 💪
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
