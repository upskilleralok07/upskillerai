import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapProgressProps {
  groupId: string;
  studentId: string;
  roadmapCategory: string;
}

const RoadmapProgress = ({ groupId, studentId, roadmapCategory }: RoadmapProgressProps) => {
  const { toast } = useToast();
  const [topics, setTopics] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
    fetchProgress();
  }, [groupId, roadmapCategory]);

  const fetchTopics = async () => {
    try {
      const { data, error } = await supabase
        .from("roadmap_topics")
        .select("*")
        .eq("category", roadmapCategory as any)
        .order("sequence_order");

      if (error) throw error;
      setTopics(data || []);
    } catch (error: any) {
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
    } catch (error: any) {
      console.error("Error fetching progress:", error);
    }
  };

  const toggleTopicCompletion = async (topicId: string, isCompleted: boolean) => {
    try {
      const existing = progress.find(p => p.topic_id === topicId);

      if (existing) {
        const { error } = await supabase
          .from("student_topic_progress")
          .update({
            is_completed: !isCompleted,
            completed_at: !isCompleted ? new Date().toISOString() : null,
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("student_topic_progress")
          .insert({
            student_id: studentId,
            group_id: groupId,
            topic_id: topicId,
            is_completed: true,
            completed_at: new Date().toISOString(),
          });

        if (error) throw error;
      }

      fetchProgress();
      toast({
        title: !isCompleted ? "Topic Completed! 🎉" : "Progress Updated",
        description: !isCompleted ? "Keep up the great work!" : "Topic marked as incomplete",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isTopicCompleted = (topicId: string) => {
    return progress.some(p => p.topic_id === topicId && p.is_completed);
  };

  const completionPercentage = topics.length > 0
    ? Math.round((progress.filter(p => p.is_completed).length / topics.length) * 100)
    : 0;

  if (loading) {
    return <div className="text-center py-8">Loading roadmap...</div>;
  }

  if (topics.length === 0) {
    return (
      <Card className="p-8 text-center glass-card">
        <p className="text-muted-foreground">
          No topics available yet. Topics will be added soon for this roadmap.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-card border-primary/20">
        <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
        <Progress value={completionPercentage} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {progress.filter(p => p.is_completed).length} of {topics.length} topics completed ({completionPercentage}%)
        </p>
      </Card>

      <div className="space-y-3">
        {topics.map((topic) => {
          const completed = isTopicCompleted(topic.id);
          return (
            <Card
              key={topic.id}
              className={`p-4 glass-card transition-all hover:border-primary/50 ${
                completed ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={completed}
                  onCheckedChange={() => toggleTopicCompletion(topic.id, completed)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <h4 className={`font-medium ${completed ? "text-primary" : ""}`}>
                      {topic.title}
                    </h4>
                  </div>
                  {topic.description && (
                    <p className="text-sm text-muted-foreground mt-1 ml-7">
                      {topic.description}
                    </p>
                  )}
                  {topic.estimated_hours > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 ml-7">
                      Estimated: {topic.estimated_hours}h
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapProgress;
