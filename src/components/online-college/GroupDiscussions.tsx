import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GroupDiscussionsProps {
  groupId: string;
  studentId: string;
}

const GroupDiscussions = ({ groupId, studentId }: GroupDiscussionsProps) => {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscussions();
    const channel = supabase
      .channel('group-discussions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'group_discussions',
          filter: `group_id=eq.${groupId}`
        },
        () => fetchDiscussions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  const fetchDiscussions = async () => {
    try {
      const { data, error } = await supabase
        .from("group_discussions")
        .select(`
          *,
          students (
            name
          )
        `)
        .eq("group_id", groupId)
        .is("parent_message_id", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDiscussions(data || []);
    } catch (error: any) {
      console.error("Error fetching discussions:", error);
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase.from("group_discussions").insert({
        group_id: groupId,
        student_id: studentId,
        message: newMessage,
      });

      if (error) throw error;

      setNewMessage("");
      toast({
        title: "Message Posted! 💬",
        description: "Your message has been shared with the group",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading discussions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-card border-primary/20">
        <h3 className="text-lg font-semibold mb-4">Start a Discussion</h3>
        <div className="space-y-4">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share your thoughts, ask questions, or help others..."
            className="min-h-[100px]"
          />
          <Button onClick={postMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Post Message
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card className="p-8 text-center glass-card">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No discussions yet. Start the conversation!</p>
          </Card>
        ) : (
          discussions.map((discussion) => (
            <Card key={discussion.id} className="p-6 glass-card hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{discussion.students?.name || "Anonymous"}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{discussion.message}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupDiscussions;
