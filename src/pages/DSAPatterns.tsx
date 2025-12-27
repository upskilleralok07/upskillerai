import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Award, Search, CheckCircle2, Star, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { dsaPhases, getCourseStats, DSAPhase, DSATopic } from '@/data/dsaCourseData';

const stats = getCourseStats();

const DSAPatterns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePhase, setActivePhase] = useState('all');

  const getFilteredTopics = (): DSATopic[] => {
    let topics: DSATopic[] = [];
    
    if (activePhase === 'all') {
      topics = dsaPhases.flatMap(phase => phase.topics);
    } else {
      const phaseNum = parseInt(activePhase);
      const phase = dsaPhases.find(p => p.id === phaseNum);
      topics = phase?.topics || [];
    }

    if (searchQuery) {
      topics = topics.filter(topic => 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return topics;
  };

  const renderImportanceStars = (importance: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < importance ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const filteredTopics = getFilteredTopics();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 px-4 md:px-6">
        <div className="container mx-auto">
          <Link to="/upskiller" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Upskiller
          </Link>
          
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              DSA Calendar 2026 🔥
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Master DSA in <span className="gradient-text">3 Phases</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              A structured 6-10 month journey from absolute beginner to interview-ready. 
              Focus on patterns, not random problem grinding.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="glass-card border-primary/10">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stats.totalTopics}</div>
                  <div className="text-xs text-muted-foreground">Topics</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-primary/10">
                <CardContent className="p-4 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stats.totalPatterns}+</div>
                  <div className="text-xs text-muted-foreground">Patterns</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-primary/10">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stats.totalProblems}+</div>
                  <div className="text-xs text-muted-foreground">Problems</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-primary/10">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stats.estimatedTime}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Overview */}
      <section className="pb-6 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {dsaPhases.map((phase) => (
              <Card key={phase.id} className={`glass-card border-2 cursor-pointer transition-all hover:scale-[1.02] ${activePhase === String(phase.id) ? 'border-primary' : 'border-primary/10'}`}
                onClick={() => setActivePhase(String(phase.id))}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl`}>
                      {phase.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <CardDescription className="text-xs">{phase.duration}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{phase.description}</p>
                  <div className="mt-2 text-xs text-primary">{phase.topics.length} topics</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search topics, patterns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activePhase === 'all' ? 'default' : 'outline'}
                onClick={() => setActivePhase('all')}
                size="sm"
              >
                All
              </Button>
              {dsaPhases.map(phase => (
                <Button
                  key={phase.id}
                  variant={activePhase === String(phase.id) ? 'default' : 'outline'}
                  onClick={() => setActivePhase(String(phase.id))}
                  size="sm"
                >
                  Phase {phase.id}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Link key={topic.id} to={`/dsa-patterns/${topic.id}`}>
                <Card className="glass-card border-primary/10 hover-lift h-full group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {topic.icon}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className="text-xs">
                          Phase {topic.phase}
                        </Badge>
                        <div className="flex">{renderImportanceStars(topic.importance)}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{topic.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {topic.duration}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target className="w-3 h-3" />
                        {topic.minProblems} problems
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {topic.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-[10px] px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {topic.difficulty}
                      </Badge>
                      <span className="text-xs text-primary">{topic.patterns.length} patterns →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Start Your DSA Journey?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            ❌ No shortcuts ❌ No motivation hacks ✅ Only consistent execution
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Phase 1 Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DSAPatterns;
