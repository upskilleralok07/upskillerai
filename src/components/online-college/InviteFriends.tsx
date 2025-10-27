import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Check, Users } from "lucide-react";

interface InviteFriendsProps {
  groupId: string;
  studentId: string;
}

const InviteFriends = ({ groupId, studentId }: InviteFriendsProps) => {
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrCreateInvite();
  }, [groupId]);

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const fetchOrCreateInvite = async () => {
    try {
      // Check for existing invite
      const { data: existing, error: fetchError } = await supabase
        .from("group_invites")
        .select("*")
        .eq("group_id", groupId)
        .is("expires_at", null)
        .single();

      if (existing) {
        setInviteCode(existing.invite_code);
      } else {
        // Create new invite
        const code = generateInviteCode();
        const { error: insertError } = await supabase
          .from("group_invites")
          .insert({
            group_id: groupId,
            created_by: studentId,
            invite_code: code,
          });

        if (insertError) throw insertError;
        setInviteCode(code);
      }
    } catch (error: any) {
      console.error("Error with invite:", error);
      toast({
        title: "Error",
        description: "Failed to generate invite code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/online-college/join/${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({
      title: "Link Copied! 📋",
      description: "Share this link with your friends",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="text-center py-8">Generating invite...</div>;
  }

  const inviteLink = `${window.location.origin}/online-college/join/${inviteCode}`;

  return (
    <div className="space-y-6">
      <Card className="p-8 glass-card border-primary/20">
        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
            <Share2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Invite Friends to Your Group</h2>
          <p className="text-muted-foreground">
            Share this link with friends so they can join your learning journey
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-background/50 border">
            <p className="text-sm text-muted-foreground mb-2">Your Invite Code</p>
            <p className="text-2xl font-bold font-mono text-primary">{inviteCode}</p>
          </div>

          <div className="flex gap-2">
            <Input
              value={inviteLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={copyInviteLink} size="icon" variant="outline">
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <Button onClick={copyInviteLink} className="w-full" size="lg">
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Invite Link
              </>
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <div className="flex items-start gap-4">
          <Users className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold mb-2">How It Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Share the invite link with your friends via WhatsApp, Telegram, or any platform</li>
              <li>• They click the link and join your group instantly</li>
              <li>• Learn together, track progress, and achieve your goals as a team</li>
              <li>• The invite link never expires and can be used multiple times</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InviteFriends;
