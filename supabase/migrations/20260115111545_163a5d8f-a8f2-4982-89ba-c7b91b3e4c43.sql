-- Add DSA-specific fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS college text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS tshirt_size text,
ADD COLUMN IF NOT EXISTS dsa_access_date timestamp with time zone;

-- Create DSA leaderboard table for users who have accessed DSA course
CREATE TABLE IF NOT EXISTS public.dsa_leaderboard (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp integer NOT NULL DEFAULT 0,
  problems_solved integer NOT NULL DEFAULT 0,
  easy_solved integer NOT NULL DEFAULT 0,
  medium_solved integer NOT NULL DEFAULT 0,
  hard_solved integer NOT NULL DEFAULT 0,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_solved_date date,
  badges text[] DEFAULT ARRAY[]::text[],
  level integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.dsa_leaderboard ENABLE ROW LEVEL SECURITY;

-- Policies for dsa_leaderboard
-- All authenticated users can view leaderboard (for rankings)
CREATE POLICY "Anyone can view DSA leaderboard" 
ON public.dsa_leaderboard 
FOR SELECT 
USING (true);

-- Users can insert their own record
CREATE POLICY "Users can create their own leaderboard entry" 
ON public.dsa_leaderboard 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own record
CREATE POLICY "Users can update their own leaderboard entry" 
ON public.dsa_leaderboard 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE TRIGGER update_dsa_leaderboard_updated_at
BEFORE UPDATE ON public.dsa_leaderboard
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();