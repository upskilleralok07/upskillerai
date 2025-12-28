import { useState, useEffect, useCallback } from 'react';

export interface ProblemProgress {
  solved: boolean;
  solvedAt?: string;
  attempts: number;
  lastAttemptAt?: string;
}

export interface DSAUserProgress {
  problems: Record<string, ProblemProgress>;
  streak: {
    current: number;
    longest: number;
    lastSolvedDate: string | null;
  };
  xp: number;
  level: number;
  totalSolved: number;
  dailyGoal: number;
  dailyProgress: number;
  badges: string[];
}

const STORAGE_KEY = 'dsa_user_progress';
const XP_PER_EASY = 10;
const XP_PER_MEDIUM = 25;
const XP_PER_HARD = 50;
const XP_PER_LEVEL = 100;

const getInitialProgress = (): DSAUserProgress => ({
  problems: {},
  streak: {
    current: 0,
    longest: 0,
    lastSolvedDate: null,
  },
  xp: 0,
  level: 1,
  totalSolved: 0,
  dailyGoal: 3,
  dailyProgress: 0,
  badges: [],
});

const loadProgress = (): DSAUserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getInitialProgress(), ...parsed };
    }
  } catch (error) {
    console.error('Failed to load DSA progress:', error);
  }
  return getInitialProgress();
};

const saveProgress = (progress: DSAUserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save DSA progress:', error);
  }
};

const getTodayDate = () => new Date().toISOString().split('T')[0];

const isConsecutiveDay = (lastDate: string | null) => {
  if (!lastDate) return false;
  const last = new Date(lastDate);
  const today = new Date(getTodayDate());
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

const isSameDay = (lastDate: string | null) => {
  if (!lastDate) return false;
  return lastDate === getTodayDate();
};

export const useDSAProgress = () => {
  const [progress, setProgress] = useState<DSAUserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Check and reset daily progress if it's a new day
  useEffect(() => {
    const today = getTodayDate();
    const lastDate = progress.streak.lastSolvedDate;
    
    if (lastDate && lastDate !== today) {
      // Check if streak should be reset (more than 1 day gap)
      const last = new Date(lastDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        setProgress(prev => ({
          ...prev,
          streak: {
            ...prev.streak,
            current: 0,
          },
          dailyProgress: 0,
        }));
      } else if (diffDays === 1) {
        setProgress(prev => ({
          ...prev,
          dailyProgress: 0,
        }));
      }
    }
  }, []);

  const markProblemSolved = useCallback((problemId: string, difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setProgress(prev => {
      const existingProblem = prev.problems[problemId];
      
      // If already solved, just update attempts
      if (existingProblem?.solved) {
        return prev;
      }

      const today = getTodayDate();
      const xpGain = difficulty === 'Easy' ? XP_PER_EASY : difficulty === 'Medium' ? XP_PER_MEDIUM : XP_PER_HARD;
      const newXp = prev.xp + xpGain;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      const newTotalSolved = prev.totalSolved + 1;
      const newDailyProgress = isSameDay(prev.streak.lastSolvedDate) ? prev.dailyProgress + 1 : 1;
      
      // Update streak
      let newStreak = prev.streak.current;
      if (!isSameDay(prev.streak.lastSolvedDate)) {
        if (isConsecutiveDay(prev.streak.lastSolvedDate) || !prev.streak.lastSolvedDate) {
          newStreak = prev.streak.current + 1;
        } else {
          newStreak = 1;
        }
      }

      // Check for new badges
      const newBadges = [...prev.badges];
      if (newTotalSolved === 1 && !newBadges.includes('first_blood')) newBadges.push('first_blood');
      if (newTotalSolved === 10 && !newBadges.includes('problem_solver')) newBadges.push('problem_solver');
      if (newTotalSolved === 50 && !newBadges.includes('dsa_warrior')) newBadges.push('dsa_warrior');
      if (newTotalSolved === 100 && !newBadges.includes('century')) newBadges.push('century');
      if (newStreak === 7 && !newBadges.includes('week_streak')) newBadges.push('week_streak');
      if (newStreak === 30 && !newBadges.includes('month_streak')) newBadges.push('month_streak');
      if (difficulty === 'Hard' && !newBadges.includes('hard_crusher')) newBadges.push('hard_crusher');

      return {
        ...prev,
        problems: {
          ...prev.problems,
          [problemId]: {
            solved: true,
            solvedAt: new Date().toISOString(),
            attempts: (existingProblem?.attempts || 0) + 1,
            lastAttemptAt: new Date().toISOString(),
          },
        },
        xp: newXp,
        level: newLevel,
        totalSolved: newTotalSolved,
        dailyProgress: newDailyProgress,
        streak: {
          current: newStreak,
          longest: Math.max(prev.streak.longest, newStreak),
          lastSolvedDate: today,
        },
        badges: newBadges,
      };
    });
  }, []);

  const markProblemUnsolved = useCallback((problemId: string) => {
    setProgress(prev => {
      const existingProblem = prev.problems[problemId];
      if (!existingProblem?.solved) return prev;

      const newProblems = { ...prev.problems };
      delete newProblems[problemId];

      return {
        ...prev,
        problems: newProblems,
        totalSolved: Math.max(0, prev.totalSolved - 1),
      };
    });
  }, []);

  const isProblemSolved = useCallback((problemId: string) => {
    return progress.problems[problemId]?.solved || false;
  }, [progress.problems]);

  const getProblemProgress = useCallback((problemId: string) => {
    return progress.problems[problemId] || null;
  }, [progress.problems]);

  const setDailyGoal = useCallback((goal: number) => {
    setProgress(prev => ({ ...prev, dailyGoal: goal }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(getInitialProgress());
  }, []);

  return {
    progress,
    markProblemSolved,
    markProblemUnsolved,
    isProblemSolved,
    getProblemProgress,
    setDailyGoal,
    resetProgress,
  };
};

export const BADGE_INFO: Record<string, { name: string; icon: string; description: string }> = {
  first_blood: { name: 'First Blood', icon: '🎯', description: 'Solved your first problem' },
  problem_solver: { name: 'Problem Solver', icon: '💡', description: 'Solved 10 problems' },
  dsa_warrior: { name: 'DSA Warrior', icon: '⚔️', description: 'Solved 50 problems' },
  century: { name: 'Century', icon: '💯', description: 'Solved 100 problems' },
  week_streak: { name: 'Week Streak', icon: '🔥', description: '7 day streak' },
  month_streak: { name: 'Month Master', icon: '🏆', description: '30 day streak' },
  hard_crusher: { name: 'Hard Crusher', icon: '💪', description: 'Solved a hard problem' },
};
