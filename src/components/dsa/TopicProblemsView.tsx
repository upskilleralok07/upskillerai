import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, CheckCircle2, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProblemCard from './ProblemCard';
import { DSATopicData, DSAProblemItem } from '@/data/dsaProblemsData';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { cn } from '@/lib/utils';

interface TopicProblemsViewProps {
  topic: DSATopicData;
}

const TopicProblemsView = ({ topic }: TopicProblemsViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const { isProblemSolved, progress } = useDSAProgress();

  const filteredProblems = topic.problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const easyProblems = topic.problems.filter(p => p.difficulty === 'Easy');
  const mediumProblems = topic.problems.filter(p => p.difficulty === 'Medium');
  const hardProblems = topic.problems.filter(p => p.difficulty === 'Hard');

  const solvedCount = topic.problems.filter(p => isProblemSolved(p.id)).length;
  const progressPercent = topic.problems.length > 0 ? (solvedCount / topic.problems.length) * 100 : 0;

  const solvedEasy = easyProblems.filter(p => isProblemSolved(p.id)).length;
  const solvedMedium = mediumProblems.filter(p => isProblemSolved(p.id)).length;
  const solvedHard = hardProblems.filter(p => isProblemSolved(p.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card-red p-6 rounded-xl">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl`}>
            {topic.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">{topic.name}</h1>
            <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">{topic.problems.length} problems</span>
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
          filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problemId={problem.id}
              title={problem.title}
              link={problem.link}
              difficulty={problem.difficulty}
              companies={problem.companies}
              solution={problem.solution}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TopicProblemsView;
