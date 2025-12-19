-- Create enum types for quiz
CREATE TYPE quiz_question_type AS ENUM ('yes_no', 'text_input', 'multi_select', 'single_select', 'slider', 'contact');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'booked', 'converted', 'not_interested');
CREATE TYPE notification_trigger AS ENUM ('new_lead', 'qualified_lead', 'high_value_lead');
CREATE TYPE notification_method AS ENUM ('email', 'webhook');

-- 1. Quiz Questions Table - Store question configuration
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_index INT NOT NULL,
  question_type quiz_question_type NOT NULL,
  main_title TEXT NOT NULL,
  subtitle TEXT,
  help_text TEXT,
  background_image TEXT,
  options JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Quiz Leads Table - Store lead/contact information
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  is_qualified BOOLEAN NOT NULL DEFAULT false,
  qualification_score INT DEFAULT 0,
  qualification_reasons JSONB,
  status lead_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Quiz Responses Table - Store user answers
CREATE TABLE public.quiz_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  lead_id UUID REFERENCES public.quiz_leads(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE SET NULL,
  question_key TEXT NOT NULL,
  answer_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Quiz Scoring Rules Table - Configure scoring logic
CREATE TABLE public.quiz_scoring_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  question_key TEXT NOT NULL,
  answer_pattern JSONB NOT NULL,
  score_value INT NOT NULL DEFAULT 0,
  is_qualifier BOOLEAN NOT NULL DEFAULT false,
  is_disqualifier BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Email Templates Table - Store email templates for Resend
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_key TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Notification Settings Table - Configure when to notify team
CREATE TABLE public.notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trigger_type notification_trigger NOT NULL,
  notification_method notification_method NOT NULL,
  destination TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_scoring_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- quiz_questions: Public read (anyone can view questions)
CREATE POLICY "Anyone can view active quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (is_active = true);

-- quiz_leads: Anyone can insert (anonymous quiz submissions)
CREATE POLICY "Anyone can submit quiz leads" 
ON public.quiz_leads 
FOR INSERT 
WITH CHECK (true);

-- quiz_responses: Anyone can insert responses
CREATE POLICY "Anyone can submit quiz responses" 
ON public.quiz_responses 
FOR INSERT 
WITH CHECK (true);

-- quiz_scoring_rules: No public access (used by edge functions with service role)
-- No policy = no public access, edge functions use service role

-- email_templates: No public access (used by edge functions with service role)
-- No policy = no public access

-- notification_settings: No public access
-- No policy = no public access

-- Create indexes for performance
CREATE INDEX idx_quiz_questions_order ON public.quiz_questions(order_index);
CREATE INDEX idx_quiz_responses_session ON public.quiz_responses(session_id);
CREATE INDEX idx_quiz_responses_lead ON public.quiz_responses(lead_id);
CREATE INDEX idx_quiz_leads_email ON public.quiz_leads(email);
CREATE INDEX idx_quiz_leads_status ON public.quiz_leads(status);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_quiz_questions_updated_at
BEFORE UPDATE ON public.quiz_questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quiz_leads_updated_at
BEFORE UPDATE ON public.quiz_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();