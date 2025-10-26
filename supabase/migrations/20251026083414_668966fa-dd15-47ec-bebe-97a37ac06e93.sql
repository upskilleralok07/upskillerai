-- Create enum for roadmap types
CREATE TYPE public.roadmap_type AS ENUM (
  'ace_semester_exams',
  'master_python',
  'crack_placements',
  'web_development',
  'data_science',
  'competitive_programming'
);

-- Create enum for group privacy
CREATE TYPE public.group_privacy AS ENUM ('public', 'private');

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  campus TEXT NOT NULL,
  grade_semester TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  selected_roadmap roadmap_type NOT NULL,
  total_study_hours DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create study groups table
CREATE TABLE public.study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  campus TEXT NOT NULL,
  creator_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  study_target TEXT NOT NULL,
  privacy group_privacy DEFAULT 'public',
  total_study_hours DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create group members table
CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(group_id, student_id)
);

-- Create study sessions table
CREATE TABLE public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE SET NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create roadmaps table
CREATE TABLE public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type roadmap_type UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  total_milestones INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create student progress table
CREATE TABLE public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  roadmap_type roadmap_type NOT NULL,
  milestones_completed INTEGER DEFAULT 0,
  progress_percentage DECIMAL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, roadmap_type)
);

-- Create weekly leaderboard table
CREATE TABLE public.weekly_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus TEXT NOT NULL,
  week_start DATE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE,
  study_hours DECIMAL NOT NULL,
  rank INTEGER NOT NULL,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT check_student_or_group CHECK (
    (student_id IS NOT NULL AND group_id IS NULL) OR 
    (student_id IS NULL AND group_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students
CREATE POLICY "Users can view all students"
  ON public.students FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own student profile"
  ON public.students FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own student profile"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for study groups
CREATE POLICY "Public groups are viewable by everyone"
  ON public.study_groups FOR SELECT
  USING (privacy = 'public' OR creator_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ) OR id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  ));

CREATE POLICY "Students can create study groups"
  ON public.study_groups FOR INSERT
  WITH CHECK (creator_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

CREATE POLICY "Group creators can update their groups"
  ON public.study_groups FOR UPDATE
  USING (creator_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

-- RLS Policies for group members
CREATE POLICY "Group members are viewable by group members"
  ON public.group_members FOR SELECT
  USING (true);

CREATE POLICY "Students can join groups"
  ON public.group_members FOR INSERT
  WITH CHECK (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

CREATE POLICY "Students can leave groups"
  ON public.group_members FOR DELETE
  USING (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

-- RLS Policies for study sessions
CREATE POLICY "Students can view their own sessions"
  ON public.study_sessions FOR SELECT
  USING (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ) OR group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (SELECT id FROM public.students WHERE user_id = auth.uid())
  ));

CREATE POLICY "Students can create their own sessions"
  ON public.study_sessions FOR INSERT
  WITH CHECK (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

CREATE POLICY "Students can update their own sessions"
  ON public.study_sessions FOR UPDATE
  USING (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

-- RLS Policies for roadmaps
CREATE POLICY "Roadmaps are viewable by everyone"
  ON public.roadmaps FOR SELECT
  USING (true);

-- RLS Policies for student progress
CREATE POLICY "Students can view their own progress"
  ON public.student_progress FOR SELECT
  USING (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

CREATE POLICY "Students can update their own progress"
  ON public.student_progress FOR INSERT
  WITH CHECK (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

CREATE POLICY "Students can modify their own progress"
  ON public.student_progress FOR UPDATE
  USING (student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  ));

-- RLS Policies for weekly leaderboard
CREATE POLICY "Leaderboard is viewable by everyone"
  ON public.weekly_leaderboard FOR SELECT
  USING (true);

-- Insert default roadmaps
INSERT INTO public.roadmaps (type, title, description, total_milestones) VALUES
  ('ace_semester_exams', 'Ace Semester Exams', 'Complete preparation strategy for semester examinations', 10),
  ('master_python', 'Master Python', 'Comprehensive Python programming journey from basics to advanced', 15),
  ('crack_placements', 'Crack Campus Placements', 'Full preparation roadmap for campus recruitment', 20),
  ('web_development', 'Web Development', 'Modern web development with frontend and backend technologies', 18),
  ('data_science', 'Data Science', 'Data analysis, machine learning, and AI fundamentals', 16),
  ('competitive_programming', 'Competitive Programming', 'Algorithm mastery and competitive coding skills', 12);

-- Create triggers for updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_study_groups_updated_at
  BEFORE UPDATE ON public.study_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();