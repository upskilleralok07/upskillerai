import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Users, TrendingUp } from "lucide-react";

interface LeaderboardProps {
  campus: string;
}

const Leaderboard = ({ campus }: LeaderboardProps) => {
  const [studentLeaderboard, setStudentLeaderboard] = useState<any[]>([]);
  const [groupLeaderboard, setGroupLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboards();
  }, [campus]);

  const fetchLeaderboards = async () => {
    try {
      // Fetch top students by study hours
      const { data: students, error: studentsError } = await supabase
        .from("students")
        .select("*")
        .eq("campus", campus)
        .order("total_study_hours", { ascending: false })
        .limit(10);

      if (studentsError) throw studentsError;

      // Fetch top groups by study hours
      const { data: groups, error: groupsError } = await supabase
        .from("study_groups")
        .select("*, group_members(count)")
        .eq("campus", campus)
        .order("total_study_hours", { ascending: false })
        .limit(10);

      if (groupsError) throw groupsError;

      setStudentLeaderboard(students || []);
      setGroupLeaderboard(groups || []);
    } catch (error: any) {
      console.error("Error fetching leaderboards:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</div>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇 Champion";
    if (rank === 2) return "🥈 Runner-up";
    if (rank === 3) return "🥉 Third Place";
    if (rank <= 10) return "⭐ Top 10";
    return "";
  };

  if (loading) {
    return <div className="text-center py-8">Loading leaderboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Campus Leaderboard</h2>
        <p className="text-muted-foreground">{campus} - This Week</p>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4 mt-6">
          {studentLeaderboard.length === 0 ? (
            <Card className="p-8 text-center glass-card">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No study data yet. Start studying to appear on the leaderboard!</p>
            </Card>
          ) : (
            studentLeaderboard.map((student, index) => (
              <Card
                key={student.id}
                className={`p-6 glass-card hover:border-primary/50 transition-all ${
                  index < 3 ? "border-primary/30 shadow-lg" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg truncate">{student.name}</h3>
                      {index < 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                          {getRankBadge(index + 1)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{student.grade_semester}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">
                      {(student.total_study_hours || 0).toFixed(1)}h
                    </div>
                    <div className="text-xs text-muted-foreground">studied</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="groups" className="space-y-4 mt-6">
          {groupLeaderboard.length === 0 ? (
            <Card className="p-8 text-center glass-card">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No group data yet. Create a group to compete!</p>
            </Card>
          ) : (
            groupLeaderboard.map((group, index) => (
              <Card
                key={group.id}
                className={`p-6 glass-card hover:border-primary/50 transition-all ${
                  index < 3 ? "border-primary/30 shadow-lg" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg truncate">{group.name}</h3>
                      {index < 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                          {getRankBadge(index + 1)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{group.study_target}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">
                      {(group.total_study_hours || 0).toFixed(1)}h
                    </div>
                    <div className="text-xs text-muted-foreground">studied</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Card className="p-6 glass-card">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Weekly Rankings Reset
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Leaderboards refresh every Monday at 12:00 AM. Keep studying to maintain your position!
        </p>
        <p className="text-xs text-muted-foreground">
          💡 Pro tip: Join a study group to combine efforts and climb both leaderboards
        </p>
      </Card>
    </div>
  );
};

export default Leaderboard;