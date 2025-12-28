import { useState } from 'react';
import { CheckCircle2, Circle, ExternalLink, Lock, Building2, BookOpen, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProblemCardProps {
  problemId: string;
  title: string;
  link: string;
  leetcode?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies?: string[];
  prerequisites?: string[];
  solution: 'locked' | 'unlocked';
}

const ProblemCard = ({
  problemId,
  title,
  link,
  leetcode,
  difficulty,
  companies,
  prerequisites,
  solution,
}: ProblemCardProps) => {
  const { isProblemSolved, markProblemSolved, markProblemUnsolved } = useDSAProgress();
  const [isHovered, setIsHovered] = useState(false);
  
  const solved = isProblemSolved(problemId);

  const handleToggleSolved = () => {
    if (solved) {
      markProblemUnsolved(problemId);
      toast.info('Problem marked as unsolved');
    } else {
      markProblemSolved(problemId, difficulty);
      toast.success(`🎉 Problem solved! +${difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 25 : 50} XP`);
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const isLeetcode = link.includes('leetcode.com');

  return (
    <div 
      className={cn(
        "glass-card p-4 rounded-lg transition-all duration-200",
        solved && "bg-green-500/5 border-green-500/20",
        isHovered && !solved && "bg-primary/5"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Solved Toggle */}
        <button
          onClick={handleToggleSolved}
          className="flex-shrink-0 mt-1 transition-transform hover:scale-110"
          title={solved ? 'Mark as unsolved' : 'Mark as solved'}
        >
          {solved ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
          )}
        </button>

        {/* Problem Info */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {leetcode && (
              <span className="text-sm text-muted-foreground font-mono">{leetcode}</span>
            )}
            <h4 className={cn(
              "font-medium",
              solved ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {title}
            </h4>
            <Badge variant="outline" className={cn("text-xs capitalize ml-auto", getDifficultyColor())}>
              {difficulty}
            </Badge>
          </div>

          {/* Companies */}
          {companies && companies.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Building2 className="w-3 h-3 text-muted-foreground" />
              {companies.slice(0, 5).map((company, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {company}
                </Badge>
              ))}
              {companies.length > 5 && (
                <span className="text-xs text-muted-foreground">+{companies.length - 5} more</span>
              )}
            </div>
          )}

          {/* Prerequisites */}
          {prerequisites && prerequisites.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Prerequisites:</span>
              {prerequisites.map((prereq, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Button asChild size="sm" className={isLeetcode ? "bg-[#FFA116] hover:bg-[#FFB84C] text-black" : ""}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              {isLeetcode ? 'LeetCode' : 'Solve'}
            </a>
          </Button>
          <Button 
            size="sm" 
            variant={solution === 'unlocked' ? 'secondary' : 'ghost'} 
            disabled={solution === 'locked'}
          >
            {solution === 'locked' ? (
              <>
                <Lock className="w-4 h-4 mr-1" />
                Solution
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 mr-1" />
                Solution
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
