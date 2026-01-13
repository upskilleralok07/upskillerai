import { Flame, TrendingUp, Calendar, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreakCardProps {
  currentStreak?: number;
  longestStreak?: number;
  totalDays?: number;
}

const StreakCard = ({
  currentStreak = 7,
  longestStreak = 21,
  totalDays = 45
}: StreakCardProps) => {
  const streakPercentage = Math.min((currentStreak / longestStreak) * 100, 100);

  return (
    <Card className="premium-card red-glow overflow-hidden">
      {/* Animated fire gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-orange-500/10 pointer-events-none" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="relative">
              <Flame className="w-6 h-6 text-primary animate-flame" />
              <div className="absolute inset-0 animate-pulse-ring">
                <Flame className="w-6 h-6 text-primary opacity-50" />
              </div>
            </div>
            Streak System
          </CardTitle>
          <Zap className="w-5 h-5 text-streak" />
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        {/* Main Streak Display */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 via-primary/10 to-orange-500/20 px-6 py-4 rounded-2xl red-border-glow">
            <Flame className="w-12 h-12 text-primary animate-streak-fire" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground font-medium">Current Streak</p>
              <p className="text-5xl font-bold gradient-text-fire leading-none">
                {currentStreak}
              </p>
              <p className="text-sm text-muted-foreground">days</p>
            </div>
          </div>
        </div>

        {/* Progress to longest streak */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to best</span>
            <span className="font-medium text-primary">{currentStreak}/{longestStreak} days</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full transition-all duration-1000 ease-out red-glow-sm"
              style={{ width: `${streakPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {longestStreak - currentStreak > 0 
              ? `🔥 ${longestStreak - currentStreak} more days to beat your record!`
              : `🏆 You've matched your best streak!`
            }
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-streak" />
            <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{totalDays}</p>
            <p className="text-xs text-muted-foreground">Total Active Days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCard;
