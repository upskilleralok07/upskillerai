import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Youtube, Plus, ExternalLink, Video, List } from "lucide-react";

interface GroupResourcesProps {
  groupId: string;
  studentId: string;
}

const GroupResources = ({ groupId, studentId }: GroupResourcesProps) => {
  const { toast } = useToast();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    url: "",
    resource_type: "video",
    language: "hindi",
  });

  useEffect(() => {
    fetchResources();
  }, [groupId]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("group_resources")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error: any) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const addResource = async () => {
    try {
      const { error } = await supabase.from("group_resources").insert({
        group_id: groupId,
        created_by: studentId,
        ...newResource,
      });

      if (error) throw error;

      toast({
        title: "Resource Added! 📚",
        description: "Successfully added new learning resource",
      });

      setDialogOpen(false);
      setNewResource({ title: "", url: "", resource_type: "video", language: "hindi" });
      fetchResources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Learning Resources</h2>
          <p className="text-muted-foreground">YouTube playlists and videos for your roadmap</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Learning Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g., Complete Web Development in Hindi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">YouTube URL *</Label>
                <Input
                  id="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Resource Type</Label>
                <Select
                  value={newResource.resource_type}
                  onValueChange={(value) => setNewResource({ ...newResource, resource_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Single Video</SelectItem>
                    <SelectItem value="playlist">Playlist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={newResource.language}
                  onValueChange={(value) => setNewResource({ ...newResource, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hinglish">Hinglish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addResource} className="w-full" disabled={!newResource.title || !newResource.url}>
                Add Resource
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {resources.length === 0 ? (
        <Card className="p-8 text-center glass-card">
          <Youtube className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No resources added yet. Be the first to add one!</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="p-6 glass-card hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  {resource.resource_type === 'playlist' ? (
                    <List className="w-6 h-6 text-primary" />
                  ) : (
                    <Video className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="capitalize">{resource.language}</span>
                    <span>•</span>
                    <span className="capitalize">{resource.resource_type}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupResources;
