import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle2, Clock, ChevronDown, ChevronRight, BookOpen, Sparkles, Video, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import { genAIModules, getGenAIStats } from '@/data/genAICourseData';

const GenAICourse = () => {
  const [completedSubmodules, setCompletedSubmodules] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const stats = getGenAIStats();

  const toggleComplete = (submoduleId: string) => {
    setCompletedSubmodules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submoduleId)) {
        newSet.delete(submoduleId);
      } else {
        newSet.add(submoduleId);
      }
      return newSet;
    });
  };

  const getModuleProgress = (moduleId: string) => {
    const module = genAIModules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = module.submodules.filter(s => completedSubmodules.has(s.id)).length;
    return Math.round((completed / module.submodules.length) * 100);
  };

  const totalProgress = Math.round((completedSubmodules.size / stats.totalSubmodules) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Back Link */}
          <Link to="/upskiller" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" /> Complete GenAI Course
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Generative AI & <span className="gradient-text">LLMs Mastery</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              From Python basics to production-ready AI agents. Build real-world projects with GPT, LangChain, RAG, and more.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalModules}</div>
                  <div className="text-xs text-muted-foreground">Modules</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalSubmodules}</div>
                  <div className="text-xs text-muted-foreground">Lessons</div>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalHours}h</div>
                  <div className="text-xs text-muted-foreground">Content</div>
                </CardContent>
              </Card>
            </div>

            {/* Overall Progress */}
            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedSubmodules.size} of {stats.totalSubmodules} lessons completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            <Accordion type="multiple" className="space-y-4">
              {genAIModules.map((module) => {
                const moduleProgress = getModuleProgress(module.id);
                const completedCount = module.submodules.filter(s => completedSubmodules.has(s.id)).length;
                
                return (
                  <AccordionItem 
                    key={module.id} 
                    value={module.id}
                    className="border-0"
                  >
                    <Card className="premium-card overflow-hidden">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>div>.chevron]:rotate-90">
                        <div className="flex items-center gap-4 w-full">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                            {module.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-foreground">{module.title}</h3>
                            <p className="text-xs text-muted-foreground">{module.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={moduleProgress} className="h-1 flex-1 max-w-[200px]" />
                              <span className="text-xs text-muted-foreground">
                                {completedCount}/{module.submodules.length}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform chevron" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-6 pb-4 space-y-2">
                          {module.submodules.map((submodule) => {
                            const isCompleted = completedSubmodules.has(submodule.id);
                            return (
                              <div 
                                key={submodule.id}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                  isCompleted ? 'bg-primary/10' : 'hover:bg-muted/50'
                                }`}
                              >
                                <div 
                                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer ${
                                    isCompleted ? 'bg-primary text-primary-foreground' : 'border-2 border-muted-foreground'
                                  }`}
                                  onClick={() => toggleComplete(submodule.id)}
                                >
                                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                                    {submodule.title}
                                  </p>
                                </div>
                                {submodule.videoUrl ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-1 text-xs border-primary/30 text-primary hover:bg-primary/10"
                                    onClick={() => {
                                      const videoId = submodule.videoUrl!.split('v=')[1];
                                      setActiveVideo({ url: videoId, title: submodule.title });
                                    }}
                                  >
                                    <Video className="w-3 h-3" />
                                    Watch
                                  </Button>
                                ) : (
                                  <Badge variant="secondary" className="text-xs opacity-50">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Coming Soon
                                  </Badge>
                                )}
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {submodule.duration}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Master GenAI?</h3>
                <p className="text-muted-foreground mb-6">
                  Start your journey from Python basics to building production AI systems.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenAICourse;
