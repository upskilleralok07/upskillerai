import { useStudentStats } from "@/hooks/useStudentStats";
import { Card } from "@/components/ui/card";
import { Flame, Clock, Calendar, Trophy, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsOverviewProps {
  studentId: string;
  className?: string;
}

export function StatsOverview({ studentId, className }: StatsOverviewProps) {
  const { stats, isLoading } = useStudentStats({ studentId });

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="glass-card p-4 animate-pulse">
            <div className="h-16 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      label: "Today",
      value: formatTime(stats.todayMinutes),
      sub: `${stats.todaySessions} sessions`,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "This Week",
      value: formatTime(stats.weekMinutes),
      sub: `${stats.weekSessions} sessions`,
      icon: Calendar,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      label: "This Month",
      value: formatTime(stats.monthMinutes),
      sub: `${stats.monthSessions} sessions`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak}`,
      sub: stats.currentStreak === 1 ? "day" : "days",
      icon: Flame,
      color: "text-streak",
      bgColor: "bg-streak/10",
      highlight: stats.currentStreak >= 7,
    },
    {
      label: "Longest Streak",
      value: `${stats.longestStreak}`,
      sub: stats.longestStreak === 1 ? "day" : "days",
      icon: Trophy,
      color: "text-badge-gold",
      bgColor: "bg-badge-gold/10",
    },
    {
      label: "Best Day",
      value: stats.bestDay ? formatTime(stats.bestDay.totalMinutes) : "0m",
      sub: stats.bestDay?.date || "No data",
      icon: Zap,
      color: "text-xp",
      bgColor: "bg-xp/10",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", className)}>
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className={cn(
              "glass-card-hover p-4",
              stat.highlight && "ring-2 ring-streak/50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <Icon className={cn("w-4 h-4", stat.color)} />
              </div>
              {stat.highlight && (
                <Flame className="w-4 h-4 text-streak animate-streak-fire" />
              )}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground/70">{stat.sub}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
