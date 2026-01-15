import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { useDSAProgress } from '@/hooks/useDSAProgress';

const ActivityHeatmap = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { progress } = useDSAProgress();
  
  // Build activity data from solved problems
  const activityData = useMemo(() => {
    const data: Record<string, number> = {};
    
    // Count problems solved per day
    Object.values(progress.problems).forEach(problem => {
      if (problem.solved && problem.solvedAt) {
        const date = problem.solvedAt.split('T')[0];
        data[date] = (data[date] || 0) + 1;
      }
    });
    
    // Generate array for the year
    const yearData: number[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const count = data[dateStr] || 0;
      // Convert count to level (0-4)
      const level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
      yearData.push(level);
    }
    
    return yearData;
  }, [progress.problems, year]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-red-500/20';
      case 2: return 'bg-red-500/40';
      case 3: return 'bg-red-500/60';
      case 4: return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  const totalSubmissions = useMemo(() => {
    return Object.values(progress.problems).filter(p => p.solved).length;
  }, [progress.problems]);
  
  const activeDays = useMemo(() => {
    const days = new Set<string>();
    Object.values(progress.problems).forEach(problem => {
      if (problem.solved && problem.solvedAt) {
        days.add(problem.solvedAt.split('T')[0]);
      }
    });
    return days.size;
  }, [progress.problems]);

  // Create weeks (52 columns)
  const weeks: number[][] = [];
  for (let i = 0; i < 52; i++) {
    weeks.push(activityData.slice(i * 7, (i + 1) * 7));
  }

  return (
    <Card className="premium-card red-border-glow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Activity Heatmap
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setYear(y => y - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">{year}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setYear(y => y + 1)}
              disabled={year >= new Date().getFullYear()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Stats */}
        <div className="flex gap-6 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total submissions: </span>
            <span className="font-bold text-foreground">{totalSubmissions}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Active days: </span>
            <span className="font-bold text-foreground">{activeDays}</span>
          </div>
        </div>

        {/* Month labels */}
        <div className="flex mb-1 pl-8">
          {months.map((month, i) => (
            <div key={month} className="flex-1 text-xs text-muted-foreground">
              {i % 2 === 0 ? month : ''}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[2px]">
          {/* Weekday labels */}
          <div className="flex flex-col gap-[2px] pr-2">
            {weekdays.map((day, i) => (
              <div key={day} className="h-3 text-[10px] text-muted-foreground flex items-center">
                {i % 2 === 1 ? day : ''}
              </div>
            ))}
          </div>
          
          {/* Weeks */}
          <div className="flex gap-[2px] flex-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getColorClass(day)} transition-all hover:ring-1 hover:ring-red-500 cursor-pointer`}
                    title={`${day} submissions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
