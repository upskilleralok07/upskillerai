import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  xp: number;
  problemsSolved: number;
  streak: number;
  isCurrentUser: boolean;
}

export const useDSALeaderboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      // Fetch leaderboard entries
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from('dsa_leaderboard')
        .select('user_id, xp, problems_solved, current_streak')
        .order('xp', { ascending: false })
        .limit(100);

      if (leaderboardError) {
        console.error('Error fetching leaderboard:', leaderboardError);
        setLoading(false);
        return;
      }

      if (!leaderboardData || leaderboardData.length === 0) {
        setEntries([]);
        setLoading(false);
        return;
      }

      // Get user IDs to fetch profiles
      const userIds = leaderboardData.map(entry => entry.user_id);

      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Create a map of profiles
      const profilesMap = new Map(
        (profilesData || []).map(p => [p.id, { name: p.name, avatar_url: p.avatar_url }])
      );

      // Format entries
      const formattedEntries: LeaderboardEntry[] = leaderboardData.map((entry, index) => {
        const profile = profilesMap.get(entry.user_id);
        return {
          rank: index + 1,
          userId: entry.user_id,
          name: profile?.name || 'Anonymous',
          avatar: profile?.avatar_url || undefined,
          xp: entry.xp,
          problemsSolved: entry.problems_solved,
          streak: entry.current_streak,
          isCurrentUser: entry.user_id === user?.id,
        };
      });

      setEntries(formattedEntries);

      // Find current user rank
      const userRank = formattedEntries.find(e => e.isCurrentUser)?.rank;
      setCurrentUserRank(userRank || null);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Update current user's leaderboard stats
  const syncProgress = useCallback(async (progress: {
    xp: number;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    currentStreak: number;
    longestStreak: number;
    badges: string[];
    level: number;
    lastSolvedDate: string | null;
  }) => {
    if (!user?.id) return;

    try {
      await supabase
        .from('dsa_leaderboard')
        .upsert({
          user_id: user.id,
          xp: progress.xp,
          problems_solved: progress.totalSolved,
          easy_solved: progress.easySolved,
          medium_solved: progress.mediumSolved,
          hard_solved: progress.hardSolved,
          current_streak: progress.currentStreak,
          longest_streak: progress.longestStreak,
          badges: progress.badges,
          level: progress.level,
          last_solved_date: progress.lastSolvedDate,
        }, { onConflict: 'user_id' });
      
      // Refetch leaderboard to update rankings
      fetchLeaderboard();
    } catch (error) {
      console.error('Error syncing progress:', error);
    }
  }, [user?.id, fetchLeaderboard]);

  return {
    entries,
    loading,
    currentUserRank,
    refetch: fetchLeaderboard,
    syncProgress,
  };
};
