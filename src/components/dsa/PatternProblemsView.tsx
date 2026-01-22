import { useState } from 'react';
import { ExternalLink, CheckCircle2, Circle, Lock, Search, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DSAPattern } from '@/data/dsaPatternsData';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { cn } from '@/lib/utils';

interface PatternProblemsViewProps {
  pattern: DSAPattern;
  onBack: () => void;
}

const PatternProblemsView = ({ pattern, onBack }: PatternProblemsViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const { isProblemSolved, markProblemSolved, markProblemUnsolved } = useDSAProgress();

  const toggleProblemSolved = (problemId: string, difficulty: 'Easy' | 'Medium' | 'Hard') => {
    if (isProblemSolved(problemId)) {
      markProblemUnsolved(problemId);
    } else {
      markProblemSolved(problemId, difficulty);
    }
  };

  const filteredProblems = pattern.problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const easyProblems = pattern.problems.filter(p => p.difficulty === 'Easy');
  const mediumProblems = pattern.problems.filter(p => p.difficulty === 'Medium');
  const hardProblems = pattern.problems.filter(p => p.difficulty === 'Hard');

  const solvedCount = pattern.problems.filter(p => isProblemSolved(p.id)).length;
  const progressPercent = pattern.problems.length > 0 ? (solvedCount / pattern.problems.length) * 100 : 0;

  const solvedEasy = easyProblems.filter(p => isProblemSolved(p.id)).length;
  const solvedMedium = mediumProblems.filter(p => isProblemSolved(p.id)).length;
  const solvedHard = hardProblems.filter(p => isProblemSolved(p.id)).length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card-red p-6 rounded-xl">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-3xl`}>
            {pattern.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{pattern.name}</h2>
            <p className="text-muted-foreground text-sm mb-4">{pattern.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">{pattern.problems.length} problems</span>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">{solvedCount} solved</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Progress value={progressPercent} className="flex-1 h-2" />
              <span className="text-sm font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats by Difficulty */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card-red border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{solvedEasy}/{easyProblems.length}</div>
            <div className="text-xs text-muted-foreground">Easy</div>
          </CardContent>
        </Card>
        <Card className="glass-card-red border-yellow-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{solvedMedium}/{mediumProblems.length}</div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </CardContent>
        </Card>
        <Card className="glass-card-red border-red-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{solvedHard}/{hardProblems.length}</div>
            <div className="text-xs text-muted-foreground">Hard</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <Button
              key={diff}
              variant={difficultyFilter === diff ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDifficultyFilter(diff)}
              className={cn(
                difficultyFilter === diff && 'bg-primary hover:bg-primary/90'
              )}
            >
              {diff === 'all' ? 'All' : diff}
            </Button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {filteredProblems.length === 0 ? (
          <Card className="glass-card-red">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No problems found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredProblems.map((problem, index) => {
            const isSolved = isProblemSolved(problem.id);
            
            return (
              <Card 
                key={problem.id} 
                className={cn(
                  "glass-card-red transition-all hover:scale-[1.01]",
                  isSolved && "border-green-500/30 bg-green-500/5"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Solved Toggle */}
                    <button
                      onClick={() => toggleProblemSolved(problem.id, problem.difficulty)}
                      className="flex-shrink-0"
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Problem Number */}
                    <span className="text-sm text-muted-foreground w-8">
                      {problem.problemNumber || '-'}
                    </span>

                    {/* Problem Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-medium truncate",
                          isSolved && "text-green-500"
                        )}>
                          {problem.title}
                        </span>
                        {problem.isPremium && (
                          <Lock className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <Badge className={cn("text-xs", getDifficultyColor(problem.difficulty))}>
                      {problem.difficulty}
                    </Badge>

                    {/* Link */}
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="w-full"
      >
        ← Back to Patterns
      </Button>
    </div>
  );
};

export default PatternProblemsView;
