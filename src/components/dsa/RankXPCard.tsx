import { Trophy, Star, Zap, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useDSAProgress, BADGE_INFO } from '@/hooks/useDSAProgress';
import { dsaPhases } from '@/data/dsaCourseData';

const RankXPCard = () => {
  const { progress } = useDSAProgress();
  
  // Calculate XP and level
  const XP_PER_LEVEL = 100;
  const currentXP = progress.xp;
  const level = progress.level;
  const xpInCurrentLevel = currentXP - ((level - 1) * XP_PER_LEVEL);
  const xpProgress = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  const xpNeeded = XP_PER_LEVEL - xpInCurrentLevel;
  
  // Calculate total problems and topics from course data
  const allProblems = dsaPhases.flatMap(phase => 
    phase.topics.flatMap(topic => 
      topic.patterns.flatMap(pattern => pattern.problems)
    )
  );
  const totalProblems = allProblems.length;
  const totalTopics = dsaPhases.flatMap(p => p.topics).length;
  
  // Estimate rank based on XP (mock - would be from backend in real app)
  const estimatedRank = Math.max(1, Math.floor(500 - (currentXP / 10)));
  const totalParticipants = 500;

  return (
    <Card className="premium-card red-border-glow overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/20 to-transparent rounded-bl-full pointer-events-none" />
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-red-500" />
          Rank & XP
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rank Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center red-glow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-streak flex items-center justify-center border-2 border-card">
                <span className="text-[10px] font-bold text-white">#{estimatedRank}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Rank</p>
              <p className="text-4xl font-bold text-foreground">{estimatedRank}<span className="text-lg text-muted-foreground">th</span></p>
              <p className="text-xs text-muted-foreground">out of {totalParticipants}</p>
            </div>
          </div>
          
          {currentXP > 0 && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 border-success text-success bg-success/10"
            >
              <ChevronUp className="w-3 h-3" />
              {Math.min(currentXP, 10)}
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
            <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
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
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 animate-shimmer relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{xpInCurrentLevel} XP</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-red-500" />
              {xpNeeded} XP to Level {level + 1}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">{progress.totalSolved}</p>
            <p className="text-[10px] text-muted-foreground">Problems</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">{totalTopics}</p>
            <p className="text-[10px] text-muted-foreground">Topics</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">{progress.badges.length}</p>
            <p className="text-[10px] text-muted-foreground">Badges</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankXPCard;
