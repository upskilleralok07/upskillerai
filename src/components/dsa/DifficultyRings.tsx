import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { dsaPhases } from '@/data/dsaCourseData';

const DifficultyRings = () => {
  const { progress, isProblemSolved } = useDSAProgress();
  
  // Get all problems from course data
  const allProblems = dsaPhases.flatMap(phase => 
    phase.topics.flatMap(topic => 
      topic.patterns.flatMap(pattern => pattern.problems)
    )
  );
  
  // Calculate totals and solved counts by difficulty
  const easyProblems = allProblems.filter(p => p.difficulty === 'Easy');
  const mediumProblems = allProblems.filter(p => p.difficulty === 'Medium');
  const hardProblems = allProblems.filter(p => p.difficulty === 'Hard');
  
  const easySolved = easyProblems.filter(p => isProblemSolved(p.id)).length;
  const mediumSolved = mediumProblems.filter(p => isProblemSolved(p.id)).length;
  const hardSolved = hardProblems.filter(p => isProblemSolved(p.id)).length;
  
  const data = {
    easy: { solved: easySolved, total: easyProblems.length },
    medium: { solved: mediumSolved, total: mediumProblems.length },
    hard: { solved: hardSolved, total: hardProblems.length }
  };
  
  const totalSolved = data.easy.solved + data.medium.solved + data.hard.solved;
  const totalProblems = data.easy.total + data.medium.total + data.hard.total;

  const calculatePercentage = (solved: number, total: number) => 
    total > 0 ? (solved / total) * 100 : 0;
  
  const CircularProgress = ({ 
    percentage, 
    color, 
    size = 100, 
    strokeWidth = 8,
    label,
    solved,
    total
  }: { 
    percentage: number; 
    color: string; 
    size?: number; 
    strokeWidth?: number;
    label: string;
    solved: number;
    total: number;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          {/* Background circle */}
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 6px ${color})`
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{solved}</span>
            <span className="text-xs text-muted-foreground">/{total}</span>
          </div>
        </div>
        <span 
          className="mt-2 text-sm font-medium"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-xs text-muted-foreground">
          {percentage.toFixed(0)}%
        </span>
      </div>
    );
  };

  return (
    <Card className="premium-card red-border-glow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-red-500" />
          Difficulty Breakdown
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Total Problems Solved */}
        <div className="text-center mb-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground">Total Solved</p>
          <p className="text-4xl font-bold gradient-text-red">{totalSolved}</p>
          <p className="text-xs text-muted-foreground">of {totalProblems} problems</p>
        </div>

        {/* Difficulty Rings */}
        <div className="flex justify-around items-center">
          <CircularProgress
            percentage={calculatePercentage(data.easy.solved, data.easy.total)}
            color="hsl(var(--easy))"
            label="Easy"
            solved={data.easy.solved}
            total={data.easy.total}
          />
          <CircularProgress
            percentage={calculatePercentage(data.medium.solved, data.medium.total)}
            color="hsl(var(--medium))"
            label="Medium"
            solved={data.medium.solved}
            total={data.medium.total}
          />
          <CircularProgress
            percentage={calculatePercentage(data.hard.solved, data.hard.total)}
            color="hsl(var(--hard))"
            label="Hard"
            solved={data.hard.solved}
            total={data.hard.total}
            size={100}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultyRings;
