import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Target, Plus, CheckCircle2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface GroupTargetsProps {
  groupId: string;
  studentId: string;
}

const GroupTargets = ({ groupId, studentId }: GroupTargetsProps) => {
  const { toast } = useToast();
  const [targets, setTargets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTarget, setNewTarget] = useState({
    title: "",
    description: "",
    target_date: "",
  });

  useEffect(() => {
    fetchTargets();
  }, [groupId]);

  const fetchTargets = async () => {
    try {
      const { data, error } = await supabase
        .from("group_targets")
        .select("*")
        .eq("group_id", groupId)
        .order("target_date", { ascending: true });

      if (error) throw error;
      setTargets(data || []);
    } catch (error: any) {
      console.error("Error fetching targets:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTarget = async () => {
    try {
      const { error } = await supabase.from("group_targets").insert({
        group_id: groupId,
        created_by: studentId,
        ...newTarget,
      });

      if (error) throw error;

      toast({
        title: "Target Set! 🎯",
        description: "New learning goal added for the group",
      });

      setDialogOpen(false);
      setNewTarget({ title: "", description: "", target_date: "" });
      fetchTargets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleComplete = async (target: any) => {
    try {
      const { error } = await supabase
        .from("group_targets")
        .update({ is_completed: !target.is_completed })
        .eq("id", target.id);

      if (error) throw error;

      toast({
        title: target.is_completed ? "Target Reopened" : "Target Completed! 🎉",
        description: target.is_completed ? "Keep working on this goal" : "Great job achieving this milestone!",
      });

      fetchTargets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading targets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Group Targets</h2>
          <p className="text-muted-foreground">Set and track collective learning goals</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add Target
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Group Target</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Target Title *</Label>
                <Input
                  id="title"
                  value={newTarget.title}
                  onChange={(e) => setNewTarget({ ...newTarget, title: e.target.value })}
                  placeholder="e.g., Complete React Basics Module"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTarget.description}
                  onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })}
                  placeholder="Add details about this target..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Target Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newTarget.target_date}
                  onChange={(e) => setNewTarget({ ...newTarget, target_date: e.target.value })}
                />
              </div>
              <Button onClick={addTarget} className="w-full" disabled={!newTarget.title || !newTarget.target_date}>
                Set Target
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {targets.length === 0 ? (
        <Card className="p-8 text-center glass-card">
          <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No targets set yet. Create your first learning goal!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {targets.map((target) => (
            <Card
              key={target.id}
              className={`p-6 glass-card transition-all ${
                target.is_completed ? "border-primary/30 bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {target.is_completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <Target className="w-5 h-5 text-muted-foreground" />
                    )}
                    <h3 className={`font-semibold ${target.is_completed ? "text-primary" : ""}`}>
                      {target.title}
                    </h3>
                  </div>
                  {target.description && (
                    <p className="text-sm text-muted-foreground mb-3 ml-8">{target.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground ml-8">
                    <Calendar className="w-4 h-4" />
                    <span>Target: {format(new Date(target.target_date), "PPP")}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={target.is_completed ? "outline" : "default"}
                  onClick={() => toggleComplete(target)}
                >
                  {target.is_completed ? "Reopen" : "Complete"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupTargets;
