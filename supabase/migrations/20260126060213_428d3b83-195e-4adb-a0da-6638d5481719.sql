-- Drop all RLS policies first
DROP POLICY IF EXISTS "Anyone can view active quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Allow reading responses for demo and admins" ON public.quiz_responses;
DROP POLICY IF EXISTS "Anyone can submit quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update leads" ON public.quiz_leads;
DROP POLICY IF EXISTS "Allow reading leads for demo and admins" ON public.quiz_leads;
DROP POLICY IF EXISTS "Anyone can submit quiz leads" ON public.quiz_leads;

-- Drop tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS public.quiz_responses CASCADE;
DROP TABLE IF EXISTS public.quiz_scoring_rules CASCADE;
DROP TABLE IF EXISTS public.quiz_leads CASCADE;
DROP TABLE IF EXISTS public.quiz_questions CASCADE;
DROP TABLE IF EXISTS public.notification_settings CASCADE;
DROP TABLE IF EXISTS public.email_templates CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop enums
DROP TYPE IF EXISTS public.app_role;
DROP TYPE IF EXISTS public.lead_status;
DROP TYPE IF EXISTS public.notification_method;
DROP TYPE IF EXISTS public.notification_trigger;
DROP TYPE IF EXISTS public.quiz_question_type;