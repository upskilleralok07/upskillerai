-- Create enum for roadmap categories
CREATE TYPE public.roadmap_category AS ENUM (
  'web_development',
  'data_science_ai',
  'app_development',
  'dsa'
);

-- Create roadmap_topics table to store learning paths
CREATE TABLE public.roadmap_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category roadmap_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sequence_order INTEGER NOT NULL,
  parent_topic_id UUID REFERENCES public.roadmap_topics(id) ON DELETE CASCADE,
  estimated_hours INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group_resources table for YouTube playlists and videos
CREATE TABLE public.group_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  topic_id UUID REFERENCES public.roadmap_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('playlist', 'video', 'article', 'other')),
  url TEXT NOT NULL,
  language TEXT DEFAULT 'hindi',
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.students(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_topic_progress table
CREATE TABLE public.student_topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  topic_id UUID REFERENCES public.roadmap_topics(id) ON DELETE CASCADE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(student_id, group_id, topic_id)
);

-- Create group_discussions table
CREATE TABLE public.group_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  topic_id UUID REFERENCES public.roadmap_topics(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  parent_message_id UUID REFERENCES public.group_discussions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group_invites table for shareable links
CREATE TABLE public.group_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  expires_at TIMESTAMPTZ,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create group_targets table for learning goals
CREATE TABLE public.group_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add roadmap_category to study_groups
ALTER TABLE public.study_groups ADD COLUMN roadmap_category roadmap_category;

-- Enable RLS
ALTER TABLE public.roadmap_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_targets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roadmap_topics
CREATE POLICY "Roadmap topics are viewable by everyone"
ON public.roadmap_topics FOR SELECT
USING (true);

-- RLS Policies for group_resources
CREATE POLICY "Group members can view resources"
ON public.group_resources FOR SELECT
USING (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Group members can add resources"
ON public.group_resources FOR INSERT
WITH CHECK (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

-- RLS Policies for student_topic_progress
CREATE POLICY "Students can view their own progress"
ON public.student_topic_progress FOR SELECT
USING (
  student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Students can update their own progress"
ON public.student_topic_progress FOR INSERT
WITH CHECK (
  student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Students can modify their progress"
ON public.student_topic_progress FOR UPDATE
USING (
  student_id IN (
    SELECT id FROM public.students WHERE user_id = auth.uid()
  )
);

-- RLS Policies for group_discussions
CREATE POLICY "Group members can view discussions"
ON public.group_discussions FOR SELECT
USING (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Group members can post discussions"
ON public.group_discussions FOR INSERT
WITH CHECK (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

-- RLS Policies for group_invites
CREATE POLICY "Anyone can view active invites"
ON public.group_invites FOR SELECT
USING (
  expires_at IS NULL OR expires_at > NOW()
);

CREATE POLICY "Group members can create invites"
ON public.group_invites FOR INSERT
WITH CHECK (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

-- RLS Policies for group_targets
CREATE POLICY "Group members can view targets"
ON public.group_targets FOR SELECT
USING (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Group members can create targets"
ON public.group_targets FOR INSERT
WITH CHECK (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);

CREATE POLICY "Group members can update targets"
ON public.group_targets FOR UPDATE
USING (
  group_id IN (
    SELECT group_id FROM public.group_members 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()
    )
  )
);