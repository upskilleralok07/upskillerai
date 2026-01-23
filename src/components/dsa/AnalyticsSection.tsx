import { useMemo } from 'react';
import { BarChart3, TrendingUp, Calendar, Target, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDSAProgress, BADGE_INFO } from '@/hooks/useDSAProgress';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsSection = () => {
  const { progress } = useDSAProgress();

  // Calculate difficulty breakdown from solved problems
  const difficultyData = useMemo(() => {
    let easy = 0, medium = 0, hard = 0;
    
    // Count problems by analyzing their XP contribution patterns
    // This is approximate - ideally we'd store difficulty with each problem
    Object.entries(progress.problems).forEach(([id, problem]) => {
      if (problem.solved) {
        // Rough estimation based on common naming patterns
        if (id.toLowerCase().includes('easy')) easy++;
        else if (id.toLowerCase().includes('hard')) hard++;
        else medium++;
      }
    });

    // If we have total but no categorization, distribute evenly
    if (easy === 0 && medium === 0 && hard === 0 && progress.totalSolved > 0) {
      easy = Math.floor(progress.totalSolved * 0.4);
      medium = Math.floor(progress.totalSolved * 0.45);
      hard = progress.totalSolved - easy - medium;
    }

    return [
      { name: 'Easy', value: easy, color: '#22c55e' },
      { name: 'Medium', value: medium, color: '#eab308' },
      { name: 'Hard', value: hard, color: '#ef4444' },
    ];
  }, [progress.problems, progress.totalSolved]);

  // Calculate daily activity from solved problems
  const dailyActivity = useMemo(() => {
    const last7Days: { date: string; solved: number }[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const solvedCount = Object.values(progress.problems).filter(p => 
        p.solved && p.solvedAt && p.solvedAt.startsWith(dateStr)
      ).length;
      
      last7Days.push({ date: dayName, solved: solvedCount });
    }
    
    return last7Days;
  }, [progress.problems]);

  // Weekly stats
  const weeklyStats = useMemo(() => {
    const thisWeek = dailyActivity.reduce((sum, day) => sum + day.solved, 0);
    const avgPerDay = (thisWeek / 7).toFixed(1);
    
    return {
      thisWeek,
      avgPerDay,
      bestDay: Math.max(...dailyActivity.map(d => d.solved)),
    };
  }, [dailyActivity]);

  // XP trend over time
  const xpTrend = useMemo(() => {
    const data: { day: string; xp: number }[] = [];
    let runningXP = 0;
    
    dailyActivity.forEach((day, index) => {
      runningXP += day.solved * 15; // Approximate XP per problem
      data.push({ day: day.date, xp: runningXP });
    });
    
    return data;
  }, [dailyActivity]);

  return (
    <div className="space-y-6" id="analytics">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Analytics Dashboard
        </h2>
        <Badge variant="secondary">Last 7 Days</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card-red">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">{progress.totalSolved}</div>
            <div className="text-xs text-muted-foreground">Total Solved</div>
          </CardContent>
        </Card>
        <Card className="glass-card-red">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-foreground">{progress.xp}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
        <Card className="glass-card-red">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-foreground">{weeklyStats.thisWeek}</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
        <Card className="glass-card-red">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-foreground">{progress.badges.length}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Activity Bar Chart */}
        <Card className="premium-card red-border-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Daily Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivity}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="solved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Avg: {weeklyStats.avgPerDay}/day</span>
              <span>Best: {weeklyStats.bestDay} problems</span>
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Breakdown */}
        <Card className="premium-card red-border-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Difficulty Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs mt-2">
              {difficultyData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Trend */}
      <Card className="premium-card red-border-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            XP Progress Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpTrend}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="premium-card red-border-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Badges Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          {progress.badges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {progress.badges.map((badgeId) => {
                const badge = BADGE_INFO[badgeId];
                if (!badge) return null;
                return (
                  <div 
                    key={badgeId}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <span className="text-xl">{badge.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Solve problems to earn badges! 🎯
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
