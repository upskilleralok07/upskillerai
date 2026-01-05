import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Flame, Clock, Zap, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  id: string;
  name: string;
  campus: string;
  value: number;
  rank: number;
}

interface CampusLeaderboardProps {
  campus: string;
  currentStudentId: string;
  className?: string;
}

type TimeFrame = "daily" | "weekly" | "monthly";
type LeaderboardType = "time" | "streak" | "sessions";

export function CampusLeaderboard({ campus, currentStudentId, className }: CampusLeaderboardProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("weekly");
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("time");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [campus, timeFrame, leaderboardType]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      // For now, fetch from students table since we have total_study_hours
      const { data, error } = await supabase
        .from("students")
        .select("id, name, campus, total_study_hours")
        .eq("campus", campus)
        .order("total_study_hours", { ascending: false })
        .limit(50);

      if (error) throw error;

      const leaderboard: LeaderboardEntry[] = (data || []).map((student, index) => ({
        id: student.id,
        name: student.name,
        campus: student.campus,
        value: Math.round((student.total_study_hours || 0) * 60), // Convert to minutes
        rank: index + 1,
      }));

      setEntries(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-badge-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-badge-silver" />;
      case 3:
        return <Medal className="w-5 h-5 text-badge-bronze" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-badge-gold/10 border-badge-gold/30 text-badge-gold";
      case 2:
        return "bg-badge-silver/10 border-badge-silver/30 text-badge-silver";
      case 3:
        return "bg-badge-bronze/10 border-badge-bronze/30 text-badge-bronze";
      default:
        return "bg-muted border-border";
    }
  };

  const formatValue = (value: number) => {
    if (leaderboardType === "time") {
      const hours = Math.floor(value / 60);
      const mins = value % 60;
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }
    if (leaderboardType === "streak") {
      return `${value} days`;
    }
    return `${value} sessions`;
  };

  const getTypeIcon = () => {
    switch (leaderboardType) {
      case "time":
        return Clock;
      case "streak":
        return Flame;
      case "sessions":
        return Zap;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-badge-gold/10 rounded-lg">
            <Trophy className="w-5 h-5 text-badge-gold" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">{campus}</p>
          </div>
        </div>
      </div>

      {/* Time Frame Tabs */}
      <Tabs value={timeFrame} onValueChange={(v) => setTimeFrame(v as TimeFrame)} className="mb-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Today</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Leaderboard Type */}
      <div className="flex gap-2 mb-6">
        {[
          { type: "time" as LeaderboardType, icon: Clock, label: "Study Time" },
          { type: "streak" as LeaderboardType, icon: Flame, label: "Streak" },
          { type: "sessions" as LeaderboardType, icon: Zap, label: "Sessions" },
        ].map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setLeaderboardType(type)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all",
              leaderboardType === type
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No data yet. Start studying to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.slice(0, 10).map((entry) => {
            const isCurrentUser = entry.id === currentStudentId;
            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg border transition-all",
                  getRankBadge(entry.rank),
                  isCurrentUser && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium truncate", isCurrentUser && "text-primary")}>
                      {entry.name}
                    </span>
                    {isCurrentUser && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <TypeIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono font-semibold">{formatValue(entry.value)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Current user position if not in top 10 */}
      {entries.length > 10 && !entries.slice(0, 10).find((e) => e.id === currentStudentId) && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Your Position</p>
          {entries.find((e) => e.id === currentStudentId) && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-bold text-primary">
                #{entries.findIndex((e) => e.id === currentStudentId) + 1}
              </span>
              <span className="flex-1 font-medium">
                {entries.find((e) => e.id === currentStudentId)?.name}
              </span>
              <span className="font-mono">
                {formatValue(entries.find((e) => e.id === currentStudentId)?.value || 0)}
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
