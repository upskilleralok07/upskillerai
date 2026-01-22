import { useState } from 'react';
import { Target, Clock, CheckCircle2, Star, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { dsaPatterns, getPatternStats, DSAPattern } from '@/data/dsaPatternsData';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import PatternProblemsView from './PatternProblemsView';

const PatternPracticeSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<DSAPattern | null>(null);
  const { isProblemSolved } = useDSAProgress();
  const patternStats = getPatternStats();

  const filteredPatterns = dsaPatterns.filter(pattern => 
    pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatternProgress = (pattern: DSAPattern) => {
    const solved = pattern.problems.filter(p => isProblemSolved(p.id)).length;
    return { solved, total: pattern.problems.length };
  };

  if (selectedPattern) {
    return (
      <PatternProblemsView 
        pattern={selectedPattern} 
        onBack={() => setSelectedPattern(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 red-glow-sm">
          <Zap className="w-3 h-3 mr-1" /> Pattern-wise Practice
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Master DSA <span className="gradient-text">Patterns</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Learn the most important algorithmic patterns used in coding interviews. Each pattern includes curated problems from LeetCode.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Card className="glass-card-red">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{patternStats.totalPatterns}</div>
              <div className="text-xs text-muted-foreground">Patterns</div>
            </CardContent>
          </Card>
          <Card className="glass-card-red">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{patternStats.totalProblems}</div>
              <div className="text-xs text-muted-foreground">Problems</div>
            </CardContent>
          </Card>
          <Card className="glass-card-red">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{patternStats.easyCount}</div>
              <div className="text-xs text-muted-foreground">Easy</div>
            </CardContent>
          </Card>
          <Card className="glass-card-red">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{patternStats.hardCount}</div>
              <div className="text-xs text-muted-foreground">Hard</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Pattern Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map((pattern) => {
          const { solved, total } = getPatternProgress(pattern);
          const progressPercent = total > 0 ? (solved / total) * 100 : 0;
          const easyCount = pattern.problems.filter(p => p.difficulty === 'Easy').length;
          const mediumCount = pattern.problems.filter(p => p.difficulty === 'Medium').length;
          const hardCount = pattern.problems.filter(p => p.difficulty === 'Hard').length;

          return (
            <Card 
              key={pattern.id} 
              className="premium-card red-border-glow hover-lift h-full group cursor-pointer"
              onClick={() => setSelectedPattern(pattern)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {pattern.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                      {total} Problems
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{pattern.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {pattern.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-streak transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{solved}/{total}</span>
                </div>
                
                {/* Difficulty Breakdown */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-500">Easy: {easyCount}</span>
                  <span className="text-yellow-500">Medium: {mediumCount}</span>
                  <span className="text-red-500">Hard: {hardCount}</span>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-xs" size="sm">
                  Start Practice →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PatternPracticeSection;
