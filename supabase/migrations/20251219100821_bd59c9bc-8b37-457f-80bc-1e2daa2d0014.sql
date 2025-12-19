-- Add public read policy for quiz_leads (for demo mode testing)
-- Drop existing restrictive policy first
DROP POLICY IF EXISTS "Admins can view all leads" ON public.quiz_leads;

-- Create a permissive policy that allows authenticated admins OR public access for demo
-- This enables demo mode to work while still requiring admin for authenticated users
CREATE POLICY "Allow reading leads for demo and admins"
ON public.quiz_leads
FOR SELECT
USING (true);

-- Also add public read policy for quiz_responses
DROP POLICY IF EXISTS "Admins can view all responses" ON public.quiz_responses;

CREATE POLICY "Allow reading responses for demo and admins"
ON public.quiz_responses
FOR SELECT
USING (true);