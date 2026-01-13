import { Trophy, Star, Zap, TrendingUp, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface RankXPCardProps {
  rank?: number;
  totalParticipants?: number;
  currentXP?: number;
  nextLevelXP?: number;
  level?: number;
  rankChange?: number;
}

const RankXPCard = ({
  rank = 12,
  totalParticipants = 500,
  currentXP = 1250,
  nextLevelXP = 2000,
  level = 5,
  rankChange = 3
}: RankXPCardProps) => {
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const xpNeeded = nextLevelXP - currentXP;

  return (
    <Card className="premium-card red-border-glow overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full pointer-events-none" />
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Rank & XP
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rank Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-red-600 flex items-center justify-center red-glow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-streak flex items-center justify-center border-2 border-card">
                <span className="text-[10px] font-bold text-white">#{rank}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Rank</p>
              <p className="text-4xl font-bold text-foreground">{rank}<span className="text-lg text-muted-foreground">th</span></p>
              <p className="text-xs text-muted-foreground">out of {totalParticipants}</p>
            </div>
          </div>
          
          {rankChange !== 0 && (
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 ${
                rankChange > 0 
                  ? 'border-success text-success bg-success/10' 
                  : 'border-destructive text-destructive bg-destructive/10'
              }`}
            >
              <ChevronUp className={`w-3 h-3 ${rankChange < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(rankChange)}
            </Badge>
          )}
        </div>

        {/* XP Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-streak fill-streak" />
              <span className="font-medium">Level {level}</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {currentXP.toLocaleString()} XP
            </Badge>
          </div>
          
          <div className="relative">
            <Progress 
              value={xpProgress} 
              className="h-4 bg-muted"
            />
            <div 
              className="absolute inset-0 h-4 rounded-full overflow-hidden"
              style={{ width: `${xpProgress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-primary to-orange-500 animate-shimmer relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentXP.toLocaleString()} XP</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              {xpNeeded.toLocaleString()} XP to Level {level + 1}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">42</p>
            <p className="text-[10px] text-muted-foreground">Problems</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-[10px] text-muted-foreground">Topics</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">5</p>
            <p className="text-[10px] text-muted-foreground">Badges</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankXPCard;
