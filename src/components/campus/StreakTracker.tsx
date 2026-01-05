import { useStudentStats } from "@/hooks/useStudentStats";
import { Card } from "@/components/ui/card";
import { Flame, AlertTriangle, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakTrackerProps {
  studentId: string;
  className?: string;
}

export function StreakTracker({ studentId, className }: StreakTrackerProps) {
  const { stats, isLoading } = useStudentStats({ studentId });

  const today = new Date();
  const daysSinceLastActivity = stats.dailyHistory.length > 0
    ? Math.floor((today.getTime() - new Date(stats.dailyHistory[0].date).getTime()) / 86400000)
    : 0;

  const isStreakAtRisk = daysSinceLastActivity === 1 && stats.todayMinutes === 0;
  const isStreakBroken = daysSinceLastActivity > 1;
  const isActiveToday = stats.todayMinutes > 0;

  // Generate last 7 days for visual
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayData = stats.dailyHistory.find((d) => d.date === dateStr);
    return {
      date,
      dateStr,
      hasActivity: !!dayData && dayData.totalMinutes > 0,
      minutes: dayData?.totalMinutes || 0,
      isToday: i === 6,
    };
  });

  if (isLoading) {
    return (
      <Card className={cn("glass-card p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-24 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Streak Status</h3>
          <p className="text-sm text-muted-foreground">Keep the fire burning!</p>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          isActiveToday
            ? "bg-success/10 text-success"
            : isStreakAtRisk
            ? "bg-warning/10 text-warning"
            : isStreakBroken
            ? "bg-destructive/10 text-destructive"
            : "bg-muted text-muted-foreground"
        )}>
          {isActiveToday ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Active Today</span>
            </>
          ) : isStreakAtRisk ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Streak at Risk!</span>
            </>
          ) : isStreakBroken ? (
            <>
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Streak Broken</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Start Today</span>
            </>
          )}
        </div>
      </div>

      {/* Main Streak Display */}
      <div className="flex items-center justify-center gap-8 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className={cn(
              "w-8 h-8",
              stats.currentStreak >= 7 ? "text-streak animate-streak-fire" : "text-muted-foreground"
            )} />
            <span className="text-5xl font-bold">{stats.currentStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>

        <div className="h-16 w-px bg-border" />

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-badge-gold" />
            <span className="text-4xl font-bold text-badge-gold">{stats.longestStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">Longest Streak</p>
        </div>

        <div className="h-16 w-px bg-border" />

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-4xl font-bold">{stats.weeklyStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">Weekly Streak</p>
        </div>
      </div>

      {/* Last 7 Days Visual */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">Last 7 Days</p>
        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((day) => (
            <div key={day.dateStr} className="text-center">
              <div className="text-xs text-muted-foreground mb-2">
                {day.date.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div
                className={cn(
                  "w-full aspect-square rounded-lg flex items-center justify-center transition-all",
                  day.hasActivity
                    ? "bg-success text-white"
                    : day.isToday
                    ? "bg-muted border-2 border-dashed border-primary"
                    : "bg-muted/50"
                )}
              >
                {day.hasActivity ? (
                  <Flame className={cn("w-5 h-5", day.minutes > 60 && "animate-streak-fire")} />
                ) : day.isToday ? (
                  <span className="text-xs text-muted-foreground">?</span>
                ) : (
                  <span className="text-xs text-muted-foreground/50">-</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {day.date.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Message */}
      {isStreakAtRisk && (
        <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium text-warning">Your streak is at risk!</p>
              <p className="text-sm text-warning/80">
                Study today to maintain your {stats.currentStreak} day streak.
              </p>
            </div>
          </div>
        </div>
      )}

      {stats.currentStreak >= 7 && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-success animate-streak-fire" />
            <div>
              <p className="font-medium text-success">You're on fire! 🔥</p>
              <p className="text-sm text-success/80">
                {stats.currentStreak} days and counting. Keep it up!
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
