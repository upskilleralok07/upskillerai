import { useStudentStats } from "@/hooks/useStudentStats";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { Clock, Calendar, TrendingUp, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsDashboardProps {
  studentId: string;
  className?: string;
}

const COLORS = [
  "hsl(142, 76%, 36%)", // coding
  "hsl(217, 91%, 60%)", // learning
  "hsl(280, 68%, 60%)", // research
  "hsl(25, 95%, 53%)",  // writing
  "hsl(48, 96%, 53%)",  // planning
  "hsl(215, 16%, 47%)", // other
];

export function AnalyticsDashboard({ studentId, className }: AnalyticsDashboardProps) {
  const { stats, isLoading } = useStudentStats({ studentId });

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Prepare chart data
  const dailyData = stats.dailyHistory.slice(0, 14).reverse().map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
    minutes: day.totalMinutes,
    sessions: day.sessions,
  }));

  // Mock category data (in real app, would come from sessions with activity_type)
  const categoryData = [
    { name: "Coding", value: Math.round(stats.allTimeMinutes * 0.35), color: COLORS[0] },
    { name: "Learning", value: Math.round(stats.allTimeMinutes * 0.25), color: COLORS[1] },
    { name: "Research", value: Math.round(stats.allTimeMinutes * 0.15), color: COLORS[2] },
    { name: "Writing", value: Math.round(stats.allTimeMinutes * 0.12), color: COLORS[3] },
    { name: "Planning", value: Math.round(stats.allTimeMinutes * 0.08), color: COLORS[4] },
    { name: "Other", value: Math.round(stats.allTimeMinutes * 0.05), color: COLORS[5] },
  ];

  const summaryCards = [
    { label: "Today", value: formatTime(stats.todayMinutes), icon: Clock, color: "text-primary" },
    { label: "This Week", value: formatTime(stats.weekMinutes), icon: Calendar, color: "text-info" },
    { label: "This Month", value: formatTime(stats.monthMinutes), icon: TrendingUp, color: "text-success" },
    { label: "All Time", value: formatTime(stats.allTimeMinutes), icon: BarChart2, color: "text-streak" },
  ];

  if (isLoading) {
    return (
      <Card className={cn("glass-card p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <Icon className={cn("w-5 h-5", card.color)} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Card className="glass-card p-6">
        <Tabs defaultValue="daily">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Study Analytics</h3>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="trend">Trend</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="daily">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickFormatter={(value) => `${value}m`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value} minutes`, "Study Time"]}
                  />
                  <Bar 
                    dataKey="minutes" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="category">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-[250px] w-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [formatTime(value), ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="flex-1 text-sm">{cat.name}</span>
                    <span className="font-mono text-sm">{formatTime(cat.value)}</span>
                    <span className="text-xs text-muted-foreground">
                      {stats.allTimeMinutes > 0
                        ? `${Math.round((cat.value / stats.allTimeMinutes) * 100)}%`
                        : "0%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trend">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Sessions</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
