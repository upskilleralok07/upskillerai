import { Trophy, Crown, Swords, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { useMemo } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  xp: number;
  problemsSolved: number;
  streak: number;
  isCurrentUser?: boolean;
}

const BatchLeaderboard = () => {
  const { progress } = useDSAProgress();
  
  // Generate leaderboard with current user included
  const entries: LeaderboardEntry[] = useMemo(() => {
    // Mock other users (in real app this would come from backend)
    const mockUsers: LeaderboardEntry[] = [
      { rank: 1, name: "Rahul Kumar", xp: 4520, problemsSolved: 156, streak: 45 },
      { rank: 2, name: "Priya Singh", xp: 4280, problemsSolved: 142, streak: 32 },
      { rank: 3, name: "Amit Sharma", xp: 3950, problemsSolved: 128, streak: 28 },
      { rank: 4, name: "Sneha Patel", xp: 3720, problemsSolved: 115, streak: 21 },
      { rank: 5, name: "Vikram Joshi", xp: 3450, problemsSolved: 108, streak: 18 },
      { rank: 6, name: "Ananya Gupta", xp: 3200, problemsSolved: 95, streak: 15 },
      { rank: 7, name: "Karan Mehta", xp: 2980, problemsSolved: 88, streak: 12 },
    ];
    
    // Add current user
    const currentUser: LeaderboardEntry = {
      rank: 0,
      name: "You",
      xp: progress.xp,
      problemsSolved: progress.totalSolved,
      streak: progress.streak.current,
      isCurrentUser: true
    };
    
    // Insert current user in correct position based on XP
    const allUsers = [...mockUsers, currentUser].sort((a, b) => b.xp - a.xp);
    
    // Assign ranks
    return allUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }, [progress.xp, progress.totalSolved, progress.streak.current]);
  
  const getCrownColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-badge-gold';
      case 2: return 'text-badge-silver';
      case 3: return 'text-badge-bronze';
      default: return 'text-muted-foreground';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      return (
        <div className={`${getCrownColor(rank)}`}>
          <Crown className="w-5 h-5 fill-current" />
        </div>
      );
    }
    return (
      <span className="text-muted-foreground font-medium text-sm">#{rank}</span>
    );
  };

  return (
    <Card className="premium-card red-border-glow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-500" />
            Batch Leaderboard
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="xp" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="xp">XP Score</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="streak">Streak</TabsTrigger>
          </TabsList>
          
          <TabsContent value="xp" className="space-y-2">
            {entries.slice(0, 8).map((entry, index) => (
              <div 
                key={entry.name}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-muted/50 ${
                  entry.rank <= 3 ? 'bg-muted/30' : ''
                } ${entry.isCurrentUser ? 'ring-2 ring-red-500/50 bg-red-500/10' : ''}`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Rank */}
                <div className="w-8 flex justify-center">
                  {getRankBadge(entry.rank)}
                </div>

                {/* Avatar */}
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback className={`${entry.isCurrentUser ? 'bg-red-500/20 text-red-500' : 'bg-red-500/10 text-red-500'} text-sm`}>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Name & Stats */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-foreground truncate ${entry.isCurrentUser ? 'text-red-500' : ''}`}>
                    {entry.name} {entry.isCurrentUser && '⭐'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.problemsSolved} problems • {entry.streak} day streak
                  </p>
                </div>

                {/* XP Score */}
                <Badge 
                  variant="secondary" 
                  className={`${
                    entry.rank === 1 ? 'bg-badge-gold/20 text-badge-gold border-badge-gold/30' :
                    entry.rank === 2 ? 'bg-badge-silver/20 text-badge-silver border-badge-silver/30' :
                    entry.rank === 3 ? 'bg-badge-bronze/20 text-badge-bronze border-badge-bronze/30' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}
                >
                  {entry.xp.toLocaleString()} XP
                </Badge>

                {/* Challenge Button */}
                {!entry.isCurrentUser && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500/10">
                    <Swords className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="problems" className="space-y-2">
            {[...entries].sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 8).map((entry, index) => (
              <div 
                key={entry.name}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-muted/50 ${entry.isCurrentUser ? 'ring-2 ring-red-500/50 bg-red-500/10' : ''}`}
              >
                <div className="w-8 flex justify-center">
                  <span className="text-muted-foreground font-medium text-sm">#{index + 1}</span>
                </div>
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarFallback className={`${entry.isCurrentUser ? 'bg-red-500/20 text-red-500' : 'bg-red-500/10 text-red-500'} text-sm`}>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-foreground truncate ${entry.isCurrentUser ? 'text-red-500' : ''}`}>
                    {entry.name} {entry.isCurrentUser && '⭐'}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  {entry.problemsSolved} solved
                </Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="streak" className="space-y-2">
            {[...entries].sort((a, b) => b.streak - a.streak).slice(0, 8).map((entry, index) => (
              <div 
                key={entry.name}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-muted/50 ${entry.isCurrentUser ? 'ring-2 ring-red-500/50 bg-red-500/10' : ''}`}
              >
                <div className="w-8 flex justify-center">
                  <span className="text-muted-foreground font-medium text-sm">#{index + 1}</span>
                </div>
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarFallback className={`${entry.isCurrentUser ? 'bg-red-500/20 text-red-500' : 'bg-red-500/10 text-red-500'} text-sm`}>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-foreground truncate ${entry.isCurrentUser ? 'text-red-500' : ''}`}>
                    {entry.name} {entry.isCurrentUser && '⭐'}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-streak/10 text-streak border-streak/20">
                  🔥 {entry.streak} days
                </Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BatchLeaderboard;
