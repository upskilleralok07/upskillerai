import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Lock, Globe, UserPlus, Clock, BookOpen, Target, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyGroupsProps {
  studentId: string;
  campus: string;
}

const StudyGroups = ({ studentId, campus }: StudyGroupsProps) => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<any[]>([]);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    study_target: "",
    privacy: "public",
    roadmap_category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
    fetchMyGroups();
  }, [studentId]);

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .select("*, group_members(count)")
        .eq("campus", campus)
        .eq("privacy", "public")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error: any) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("group_members")
        .select("*, study_groups(*)")
        .eq("student_id", studentId);

      if (error) throw error;
      setMyGroups(data?.map(m => m.study_groups) || []);
    } catch (error: any) {
      console.error("Error fetching my groups:", error);
    }
  };

  const createGroup = async () => {
    try {
      const { data, error } = await supabase
        .from("study_groups")
        .insert({
          ...newGroup,
          creator_id: studentId,
          campus,
          roadmap_category: newGroup.roadmap_category || null,
        } as any)
        .select()
        .single();

      if (error) throw error;

      // Add creator as member
      await supabase.from("group_members").insert({
        group_id: data.id,
        student_id: studentId,
      });

      toast({
        title: "Group Created! 🎉",
        description: `${newGroup.name} is ready for collaboration.`,
      });

      setCreateDialogOpen(false);
      setNewGroup({ name: "", study_target: "", privacy: "public", roadmap_category: "" });
      fetchGroups();
      fetchMyGroups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const joinGroup = async (groupId: string) => {
    try {
      const { error } = await supabase.from("group_members").insert({
        group_id: groupId,
        student_id: studentId,
      });

      if (error) throw error;

      toast({
        title: "Joined Group! 🤝",
        description: "You're now part of this study group.",
      });

      fetchGroups();
      fetchMyGroups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isInGroup = (groupId: string) => {
    return myGroups.some(g => g.id === groupId);
  };

  const deleteGroup = async (groupId: string) => {
    try {
      // Delete all related data first
      await supabase.from("group_members").delete().eq("group_id", groupId);
      await supabase.from("group_resources").delete().eq("group_id", groupId);
      await supabase.from("group_discussions").delete().eq("group_id", groupId);
      await supabase.from("group_targets").delete().eq("group_id", groupId);
      await supabase.from("group_invites").delete().eq("group_id", groupId);
      
      // Delete the group
      const { error } = await supabase
        .from("study_groups")
        .delete()
        .eq("id", groupId);

      if (error) throw error;

      toast({
        title: "🏆 Group deleted!",
        description: "Your management badge has been awarded!",
      });
      fetchGroups();
      fetchMyGroups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading groups...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Study Groups</h2>
          <p className="text-muted-foreground">Collaborate with peers from {campus}</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Study Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name *</Label>
                <Input
                  id="groupName"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., Data Structures Warriors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roadmap">Learning Roadmap</Label>
                <Select
                  value={newGroup.roadmap_category}
                  onValueChange={(value) => setNewGroup({ ...newGroup, roadmap_category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a roadmap (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web_development">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Web Development
                      </div>
                    </SelectItem>
                    <SelectItem value="data_science_ai">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Data Science & AI
                      </div>
                    </SelectItem>
                    <SelectItem value="app_development">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        App Development
                      </div>
                    </SelectItem>
                    <SelectItem value="dsa">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Data Structures & Algorithms
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Study Target *</Label>
                <Input
                  id="target"
                  value={newGroup.study_target}
                  onChange={(e) => setNewGroup({ ...newGroup, study_target: e.target.value })}
                  placeholder="e.g., Complete DSA in 60 days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacy">Privacy</Label>
                <Select
                  value={newGroup.privacy}
                  onValueChange={(value) => setNewGroup({ ...newGroup, privacy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Public - Anyone can join
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Private - Invite only
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={createGroup} className="w-full" disabled={!newGroup.name || !newGroup.study_target}>
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {myGroups.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            My Groups
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {myGroups.map((group) => (
              <Card key={group.id} className="p-6 glass-card border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{group.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{group.study_target}</p>
                  </div>
                  {group.privacy === "private" ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{group.total_study_hours || 0}h</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/online-college/group/${group.id}`)}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Group?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure? Delete group and claim your badge for managing group history! This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteGroup(group.id)}>
                            Delete & Claim Badge
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Available Groups</h3>
        {groups.length === 0 ? (
          <Card className="p-8 text-center glass-card">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No public groups yet. Be the first to create one!</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="p-6 glass-card hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{group.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{group.study_target}</p>
                  </div>
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{group.total_study_hours || 0}h</span>
                    </div>
                    {group.roadmap_category && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-xs">
                          {group.roadmap_category.replace('_', ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {!isInGroup(group.id) && (
                    <Button size="sm" onClick={() => joinGroup(group.id)} variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroups;