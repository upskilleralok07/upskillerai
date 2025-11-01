import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Award, Search, Filter, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';

const patterns = [
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    icon: '🪟',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    problems: 15,
    estimatedTime: '6-8 hours',
    description: 'Master the technique of maintaining a window over sequential data to solve optimization problems efficiently.',
    tags: ['Arrays', 'Strings', 'Optimization'],
    badge: 'Most Popular',
    progress: 0
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    icon: '👉',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Beginner',
    problems: 15,
    estimatedTime: '5-7 hours',
    description: 'Learn to use two pointers to solve array and linked list problems with optimal space complexity.',
    tags: ['Arrays', 'Linked Lists', 'Sorting'],
    progress: 0
  },
  {
    id: 'binary-search',
    name: 'Modified Binary Search',
    icon: '🔍',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Intermediate',
    problems: 15,
    estimatedTime: '7-9 hours',
    description: 'Apply binary search variations to solve complex search problems in sorted and rotated arrays.',
    tags: ['Arrays', 'Search', 'Divide & Conquer'],
    progress: 0
  },
  {
    id: 'tree-bfs',
    name: 'Binary Tree BFS',
    icon: '🌲',
    color: 'from-cyan-500 to-blue-500',
    difficulty: 'Intermediate',
    problems: 15,
    estimatedTime: '6-8 hours',
    description: 'Traverse trees level by level using breadth-first search to solve tree-based problems.',
    tags: ['Trees', 'BFS', 'Queue'],
    progress: 0
  },
  {
    id: 'tree-dfs',
    name: 'Binary Tree DFS',
    icon: '🎄',
    color: 'from-orange-500 to-red-500',
    difficulty: 'Intermediate',
    problems: 15,
    estimatedTime: '7-9 hours',
    description: 'Master depth-first search techniques for trees including preorder, inorder, and postorder traversals.',
    tags: ['Trees', 'DFS', 'Recursion'],
    progress: 0
  },
  {
    id: 'top-k-elements',
    name: 'Top K Elements',
    icon: '⛰️',
    color: 'from-red-500 to-rose-500',
    difficulty: 'Intermediate',
    problems: 15,
    estimatedTime: '6-8 hours',
    description: 'Use heaps to efficiently find top K elements in arrays and solve priority-based problems.',
    tags: ['Heap', 'Priority Queue', 'Sorting'],
    progress: 0
  },
  {
    id: 'subsets',
    name: 'Subset Pattern',
    icon: '{ }',
    color: 'from-pink-500 to-purple-500',
    difficulty: 'Advanced',
    problems: 15,
    estimatedTime: '8-10 hours',
    description: 'Generate all possible subsets and combinations using backtracking and bit manipulation.',
    tags: ['Backtracking', 'Bit Manipulation', 'Recursion'],
    progress: 0
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    icon: '🔗',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Advanced',
    problems: 15,
    estimatedTime: '7-9 hours',
    description: 'Solve dependency resolution and graph ordering problems using topological sorting.',
    tags: ['Graph', 'DFS', 'BFS'],
    progress: 0
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointer',
    icon: '🐢',
    color: 'from-teal-500 to-cyan-500',
    difficulty: 'Intermediate',
    problems: 15,
    estimatedTime: '5-7 hours',
    description: 'Detect cycles and find middle elements in linked lists using the tortoise and hare algorithm.',
    tags: ['Linked Lists', 'Two Pointers', 'Cycles'],
    progress: 0
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '🔙',
    color: 'from-indigo-500 to-purple-500',
    difficulty: 'Advanced',
    problems: 15,
    estimatedTime: '9-12 hours',
    description: 'Solve constraint satisfaction problems using backtracking to explore all possible solutions.',
    tags: ['Recursion', 'Search', 'Optimization'],
    progress: 0
  }
];

const stats = [
  { label: 'Essential Patterns', value: '10', icon: Target },
  { label: 'Curated Problems', value: '150+', icon: CheckCircle2 },
  { label: 'Students Enrolled', value: '5000+', icon: Award },
  { label: 'Interview Success', value: '95%', icon: Award }
];

const DSAPatterns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredPatterns = patterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || pattern.difficulty.toLowerCase() === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <div className="container mx-auto">
          <Link to="/upskiller" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Upskiller
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Master DSA in <span className="gradient-text">10 Patterns</span>
              <br />Not 1000 Problems
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stop random grinding. Learn the patterns. Crack any interview.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card border-primary/10">
                  <CardContent className="p-4 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Learning Free
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-6 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                <Button
                  key={level}
                  variant={filterDifficulty === level ? 'default' : 'outline'}
                  onClick={() => setFilterDifficulty(level)}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Grid */}
      <section className="pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatterns.map((pattern) => (
              <Link key={pattern.id} to={`/dsa-patterns/${pattern.id}`}>
                <Card className="glass-card border-primary/10 hover-lift h-full group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                        {pattern.icon}
                      </div>
                      {pattern.badge && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {pattern.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{pattern.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {pattern.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Target className="w-4 h-4" />
                        {pattern.problems} problems
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {pattern.estimatedTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {pattern.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{pattern.progress}%</span>
                      </div>
                      <Progress value={pattern.progress} className="h-2" />
                    </div>
                    
                    <Badge variant="secondary" className="w-full justify-center">
                      {pattern.difficulty}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Master DSA Patterns?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of students who have cracked their dream job interviews using pattern-based learning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DSAPatterns;
