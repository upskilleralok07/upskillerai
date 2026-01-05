import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Flame,
  Clock,
  Target,
  Zap,
  Award,
  Medal,
  Crown,
  BookOpen,
  Code,
  Calendar,
  TrendingUp,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  bgColor: string;
  requirement: number;
  currentValue: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: "streak" | "hours" | "focus" | "discipline";
}

interface BadgesAndAchievementsProps {
  studentId: string;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  className?: string;
}

const BADGE_DEFINITIONS: Omit<BadgeData, "currentValue" | "unlocked" | "unlockedAt">[] = [
  // Streak badges
  { id: "streak_3", name: "Getting Started", description: "3 day streak", icon: Flame, color: "text-streak", bgColor: "bg-streak/10", requirement: 3, category: "streak" },
  { id: "streak_7", name: "Week Warrior", description: "7 day streak", icon: Flame, color: "text-streak", bgColor: "bg-streak/10", requirement: 7, category: "streak" },
  { id: "streak_14", name: "Fortnight Fighter", description: "14 day streak", icon: Flame, color: "text-streak", bgColor: "bg-streak/10", requirement: 14, category: "streak" },
  { id: "streak_30", name: "Month Master", description: "30 day streak", icon: Crown, color: "text-badge-gold", bgColor: "bg-badge-gold/10", requirement: 30, category: "streak" },
  { id: "streak_100", name: "Century Legend", description: "100 day streak", icon: Crown, color: "text-badge-gold", bgColor: "bg-badge-gold/10", requirement: 100, category: "streak" },
  
  // Hours badges
  { id: "hours_10", name: "First Steps", description: "10 hours studied", icon: Clock, color: "text-primary", bgColor: "bg-primary/10", requirement: 600, category: "hours" },
  { id: "hours_50", name: "Dedicated Learner", description: "50 hours studied", icon: Clock, color: "text-primary", bgColor: "bg-primary/10", requirement: 3000, category: "hours" },
  { id: "hours_100", name: "Century Club", description: "100 hours studied", icon: Medal, color: "text-badge-silver", bgColor: "bg-badge-silver/10", requirement: 6000, category: "hours" },
  { id: "hours_500", name: "Knowledge Seeker", description: "500 hours studied", icon: Trophy, color: "text-badge-gold", bgColor: "bg-badge-gold/10", requirement: 30000, category: "hours" },
  { id: "hours_1000", name: "Grand Master", description: "1000 hours studied", icon: Crown, color: "text-badge-gold", bgColor: "bg-badge-gold/10", requirement: 60000, category: "hours" },
  
  // Sessions badges
  { id: "sessions_10", name: "Session Starter", description: "10 sessions completed", icon: Zap, color: "text-xp", bgColor: "bg-xp/10", requirement: 10, category: "focus" },
  { id: "sessions_50", name: "Focus Fighter", description: "50 sessions completed", icon: Target, color: "text-xp", bgColor: "bg-xp/10", requirement: 50, category: "focus" },
  { id: "sessions_100", name: "Centurion", description: "100 sessions completed", icon: Award, color: "text-badge-silver", bgColor: "bg-badge-silver/10", requirement: 100, category: "focus" },
  { id: "sessions_500", name: "Session Master", description: "500 sessions completed", icon: Trophy, color: "text-badge-gold", bgColor: "bg-badge-gold/10", requirement: 500, category: "focus" },
  
  // Discipline badges
  { id: "discipline_early", name: "Early Bird", description: "Start before 7 AM", icon: Star, color: "text-warning", bgColor: "bg-warning/10", requirement: 1, category: "discipline" },
  { id: "discipline_night", name: "Night Owl", description: "Study after 10 PM", icon: Star, color: "text-info", bgColor: "bg-info/10", requirement: 1, category: "discipline" },
];

const STORAGE_KEY = "campus_badges";

export function BadgesAndAchievements({
  studentId,
  totalMinutes,
  currentStreak,
  longestStreak,
  totalSessions,
  className,
}: BadgesAndAchievementsProps) {
  const [badges, setBadges] = useState<BadgeData[]>([]);

  useEffect(() => {
    // Load saved badges
    const saved = localStorage.getItem(`${STORAGE_KEY}_${studentId}`);
    const savedBadges: Record<string, string> = saved ? JSON.parse(saved) : {};

    // Calculate current badge status
    const calculatedBadges: BadgeData[] = BADGE_DEFINITIONS.map((def) => {
      let currentValue = 0;
      switch (def.category) {
        case "streak":
          currentValue = longestStreak;
          break;
        case "hours":
          currentValue = totalMinutes;
          break;
        case "focus":
          currentValue = totalSessions;
          break;
        case "discipline":
          currentValue = savedBadges[def.id] ? 1 : 0;
          break;
      }

      const unlocked = currentValue >= def.requirement;
      const previouslyUnlocked = savedBadges[def.id];

      // Save newly unlocked badges
      if (unlocked && !previouslyUnlocked) {
        savedBadges[def.id] = new Date().toISOString();
        localStorage.setItem(`${STORAGE_KEY}_${studentId}`, JSON.stringify(savedBadges));
      }

      return {
        ...def,
        currentValue,
        unlocked,
        unlockedAt: savedBadges[def.id],
      };
    });

    setBadges(calculatedBadges);
  }, [studentId, totalMinutes, longestStreak, totalSessions]);

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);
  const nextBadge = lockedBadges[0];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary */}
      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-badge-gold/10 rounded-lg">
              <Trophy className="w-5 h-5 text-badge-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-sm text-muted-foreground">
                {unlockedBadges.length} of {badges.length} badges unlocked
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-badge-gold">{unlockedBadges.length}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
        </div>

        <Progress
          value={(unlockedBadges.length / badges.length) * 100}
          className="h-2"
        />

        {/* Next badge preview */}
        {nextBadge && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg opacity-50", nextBadge.bgColor)}>
                  <nextBadge.icon className={cn("w-5 h-5", nextBadge.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium">Next: {nextBadge.name}</p>
                  <p className="text-xs text-muted-foreground">{nextBadge.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono">
                  {nextBadge.currentValue}/{nextBadge.requirement}
                </div>
                <Progress
                  value={(nextBadge.currentValue / nextBadge.requirement) * 100}
                  className="h-1 w-20 mt-1"
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">UNLOCKED</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {unlockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className={cn("p-4 border-2", badge.bgColor, "border-opacity-30")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={cn("p-3 rounded-xl mb-3", badge.bgColor)}>
                    <badge.icon className={cn("w-6 h-6", badge.color)} />
                  </div>
                  <h5 className="font-semibold text-sm">{badge.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  {badge.unlockedAt && (
                    <p className="text-xs text-muted-foreground/50 mt-2">
                      {new Date(badge.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">LOCKED</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="p-4 opacity-50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl mb-3 bg-muted relative">
                    <badge.icon className="w-6 h-6 text-muted-foreground" />
                    <Lock className="w-3 h-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                  </div>
                  <h5 className="font-semibold text-sm">{badge.name}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  <div className="mt-2 w-full">
                    <Progress
                      value={(badge.currentValue / badge.requirement) * 100}
                      className="h-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((badge.currentValue / badge.requirement) * 100)}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
