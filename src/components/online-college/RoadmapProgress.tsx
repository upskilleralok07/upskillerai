import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { CheckCircle, Lock, Trophy, Flame, Star, Play } from "lucide-react";
import ModuleQuiz from "./ModuleQuiz";

interface RoadmapProgressProps {
  groupId: string;
  studentId: string;
  roadmapCategory: string;
}

const RoadmapProgress = ({ groupId, studentId, roadmapCategory }: RoadmapProgressProps) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [studentData, setStudentData] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  useEffect(() => {
    fetchTopics();
    fetchProgress();
    fetchQuizAttempts();
    checkPremiumStatus();
    fetchStudentData();
  }, [roadmapCategory, studentId]);

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from("roadmap_topics")
        .select("*")
        .eq("category", roadmapCategory as any)
        .order("sequence_order");

      if (error) throw error;
      setTopics(data || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from("student_topic_progress")
        .select("*")
        .eq("student_id", studentId)
        .eq("group_id", groupId);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const fetchQuizAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_attempts" as any)
        .select("*")
        .eq("student_id", studentId)
        .eq("passed", true);

      if (error) throw error;
      setQuizAttempts(data || []);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
  };

  const checkPremiumStatus = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setIsPremium(data?.subscription_tier === 'premium');
    } catch (error) {
      console.error("Error checking premium status:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("current_streak, longest_streak, badges")
        .eq("id", studentId)
        .single();

      if (error) throw error;
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const isTopicCompleted = (topicId: string) => {
    return progress.some(p => p.topic_id === topicId && p.is_completed);
  };

  const hasPassedQuiz = (topicId: string) => {
    return quizAttempts.some(a => a.topic_id === topicId);
  };

  const isTopicUnlocked = (index: number) => {
    if (index === 0) return true; // First topic always unlocked
    const previousTopic = topics[index - 1];
    return isTopicCompleted(previousTopic.id) && hasPassedQuiz(previousTopic.id);
  };

  const handleStartQuiz = (topic: any) => {
    if (!isPremium) {
      toast.error("⭐ Upgrade to Premium to take quizzes and unlock modules!");
      return;
    }
    setSelectedTopic(topic);
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    fetchProgress();
    fetchQuizAttempts();
    toast.success("🎉 Next module unlocked!");
  };

  const completedCount = progress.filter(p => p.is_completed).length;
  const progressPercentage = topics.length > 0
    ? Math.round((completedCount / topics.length) * 100)
    : 0;

  if (loading) {
    return <div className="text-center py-8">Loading roadmap...</div>;
  }

  if (topics.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No topics available yet. Topics will be added soon for this roadmap.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gamification Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">🏆 Compete, Complete, and Win!</h3>
            <p className="text-muted-foreground">
              Become the Leaderboard Topper and get free mentorship every month. Unlock premium study roadmaps and resources now.
            </p>
          </div>
          {studentData && (
            <div className="flex gap-4">
              <div className="text-center">
                <Flame className="w-8 h-8 mx-auto mb-1 text-orange-500" />
                <div className="text-2xl font-bold">{studentData.current_streak || 0}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-1 text-yellow-500" />
                <div className="text-2xl font-bold">{studentData.longest_streak || 0}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-1 text-blue-500" />
                <div className="text-2xl font-bold">{JSON.parse(studentData.badges || '[]').length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Learning Progress</h3>
          {!isPremium && (
            <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              ⭐ Premium Feature
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completed</span>
            <span>{completedCount} / {topics.length} modules</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            Complete quizzes to unlock new modules and earn badges!
          </p>
        </div>
      </Card>

      <div className="grid gap-4">
        {topics.map((topic, index) => {
          const completed = isTopicCompleted(topic.id);
          const unlocked = isTopicUnlocked(index);
          const quizPassed = hasPassedQuiz(topic.id);
          
          return (
            <Card 
              key={topic.id} 
              className={`p-6 transition-all ${
                !unlocked ? 'opacity-60 bg-secondary/50' : 'hover:shadow-lg'
              } ${completed && quizPassed ? 'border-2 border-green-500' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    completed && quizPassed 
                      ? 'bg-green-500 text-white' 
                      : unlocked 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    {completed && quizPassed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : unlocked ? (
                      <Play className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Module {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h4 className="font-bold text-lg">{topic.title}</h4>
                    {!unlocked && (
                      <Badge variant="secondary" className="text-xs">
                        🔒 Locked
                      </Badge>
                    )}
                    {completed && quizPassed && (
                      <Badge className="text-xs bg-green-500">
                        ✓ Completed
                      </Badge>
                    )}
                    {completed && !quizPassed && (
                      <Badge variant="outline" className="text-xs">
                        Quiz Pending
                      </Badge>
                    )}
                    {!isPremium && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        ⭐ Premium
                      </Badge>
                    )}
                  </div>
                  
                  {topic.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      📚 {topic.estimated_hours} hours
                    </span>
                  </div>

                  {/* Resources Section */}
                  {topic.resources && JSON.parse(topic.resources as any).length > 0 && unlocked && (
                    <div className="mt-3 p-3 bg-secondary/30 rounded-lg">
                      <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        📖 Learning Resources
                        {!isPremium && (
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            ⭐ Premium
                          </Badge>
                        )}
                      </h5>
                      {isPremium ? (
                        <div className="space-y-2">
                          {JSON.parse(topic.resources as any).map((resource: any, idx: number) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <span>
                                {resource.type === 'video' && '🎥'}
                                {resource.type === 'playlist' && '📺'}
                                {resource.type === 'article' && '📄'}
                                {resource.type === 'course' && '🎓'}
                              </span>
                              <span>{resource.title}</span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Upgrade to Premium to access curated learning resources for each module
                        </p>
                      )}
                    </div>
                  )}

                  {unlocked && !quizPassed && (
                    <Button 
                      onClick={() => handleStartQuiz(topic)}
                      disabled={!isPremium}
                      className="mt-2"
                      variant={isPremium ? "default" : "outline"}
                    >
                      {isPremium ? "Take Quiz to Unlock Next" : "⭐ Upgrade to Take Quiz"}
                    </Button>
                  )}
                  
                  {!unlocked && (
                    <p className="text-sm text-muted-foreground italic mt-2">
                      Complete previous module's quiz to unlock
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-2xl">
          {selectedTopic && (
            <ModuleQuiz
              topicId={selectedTopic.id}
              studentId={studentId}
              topicTitle={selectedTopic.title}
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapProgress;
