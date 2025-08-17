-- Fix security issue: Restrict profile visibility to own profile only
-- Remove the current public SELECT policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Ensure the existing policies remain unchanged for INSERT and UPDATE
-- (The existing policies already correctly restrict to own profile)