import { useCampusActivity } from "@/hooks/useCampusActivity";
import { Card } from "@/components/ui/card";
import { Code, BookOpen, Search, PenTool, ListTodo, MoreHorizontal, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveActivityPanelProps {
  campus?: string;
  className?: string;
}

const ACTIVITY_CONFIG = {
  coding: { icon: Code, label: "Coding", color: "text-activity-coding", bg: "bg-activity-coding" },
  learning: { icon: BookOpen, label: "Learning", color: "text-activity-learning", bg: "bg-activity-learning" },
  research: { icon: Search, label: "Research", color: "text-activity-research", bg: "bg-activity-research" },
  writing: { icon: PenTool, label: "Writing", color: "text-activity-writing", bg: "bg-activity-writing" },
  planning: { icon: ListTodo, label: "Planning", color: "text-activity-planning", bg: "bg-activity-planning" },
  other: { icon: MoreHorizontal, label: "Other", color: "text-activity-other", bg: "bg-activity-other" },
};

export function LiveActivityPanel({ campus, className }: LiveActivityPanelProps) {
  const { activityStats, isLoading } = useCampusActivity(campus);

  if (isLoading) {
    return (
      <Card className={cn("glass-card p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Live Campus Activity</h3>
          <p className="text-sm text-muted-foreground">
            Real-time view of what students are working on
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-semibold text-primary">{activityStats.total} online</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(ACTIVITY_CONFIG).map(([key, config]) => {
          const count = activityStats[key as keyof typeof activityStats] || 0;
          const Icon = config.icon;
          const percentage = activityStats.total > 0 
            ? Math.round((count / activityStats.total) * 100) 
            : 0;

          return (
            <div
              key={key}
              className={cn(
                "p-4 rounded-xl border border-border/50 transition-all duration-300",
                count > 0 && "bg-muted/30"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-lg", config.bg, "bg-opacity-20")}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>
                <span className="font-medium">{config.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{count}</span>
                <span className="text-sm text-muted-foreground">
                  {count === 1 ? "student" : "students"}
                </span>
              </div>
              {activityStats.total > 0 && (
                <div className="mt-2">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", config.bg)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activityStats.total === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium">No one is studying right now</p>
          <p className="text-sm">Be the first to start a session!</p>
        </div>
      )}
    </Card>
  );
}
