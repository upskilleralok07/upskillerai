import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Zap, Target, Trophy, Star, TrendingUp } from 'lucide-react';
import { useDSAProgress, BADGE_INFO } from '@/hooks/useDSAProgress';

const ProgressStats = () => {
  const { progress } = useDSAProgress();
  
  const xpForNextLevel = (progress.level * 100);
  const currentLevelXp = progress.xp - ((progress.level - 1) * 100);
  const xpProgress = (currentLevelXp / 100) * 100;
  
  const dailyGoalProgress = Math.min((progress.dailyProgress / progress.dailyGoal) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Streak Card */}
      <Card className="glass-card border-orange-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold text-foreground">{progress.streak.current}</p>
              <p className="text-xs text-muted-foreground">Best: {progress.streak.longest} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* XP Card */}
      <Card className="glass-card border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Level {progress.level}</p>
              <p className="text-2xl font-bold text-foreground">{progress.xp} XP</p>
              <Progress value={xpProgress} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Goal Card */}
      <Card className="glass-card border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Daily Goal</p>
              <p className="text-2xl font-bold text-foreground">{progress.dailyProgress}/{progress.dailyGoal}</p>
              <Progress value={dailyGoalProgress} className="h-2 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems Solved Card */}
      <Card className="glass-card border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
              <p className="text-3xl font-bold text-foreground">{progress.totalSolved}</p>
              <p className="text-xs text-muted-foreground">{progress.badges.length} badges earned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const BadgesDisplay = () => {
  const { progress } = useDSAProgress();

  if (progress.badges.length === 0) {
    return (
      <Card className="glass-card border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Start solving problems to earn badges!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Badges ({progress.badges.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {progress.badges.map((badgeId) => {
            const badge = BADGE_INFO[badgeId];
            if (!badge) return null;
            return (
              <div
                key={badgeId}
                className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2"
                title={badge.description}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-medium text-foreground">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export const XPBreakdown = () => {
  return (
    <Card className="glass-card border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          XP System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">Easy</Badge>
            <span className="text-muted-foreground">+10 XP</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">Medium</Badge>
            <span className="text-muted-foreground">+25 XP</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-red-500/20 text-red-400">Hard</Badge>
            <span className="text-muted-foreground">+50 XP</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStats;
