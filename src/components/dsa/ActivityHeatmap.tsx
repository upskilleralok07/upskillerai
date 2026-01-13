import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ActivityHeatmapProps {
  data?: number[];
}

const ActivityHeatmap = ({ data }: ActivityHeatmapProps) => {
  const [year, setYear] = useState(2024);
  
  // Generate mock data for 365 days if not provided
  const activityData = data || Array.from({ length: 365 }, () => 
    Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
  );

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getColorClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/20';
      case 2: return 'bg-primary/40';
      case 3: return 'bg-primary/60';
      case 4: return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const totalContributions = activityData.reduce((a, b) => a + b, 0);
  const activeDays = activityData.filter(d => d > 0).length;

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
            <Calendar className="w-5 h-5 text-primary" />
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
            <span className="font-bold text-foreground">{totalContributions}</span>
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
                    className={`w-3 h-3 rounded-sm ${getColorClass(day)} transition-all hover:ring-1 hover:ring-primary cursor-pointer`}
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
