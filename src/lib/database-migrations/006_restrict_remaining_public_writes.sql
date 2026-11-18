-- Route all mutation traffic through the app's protected server-side handlers.
-- Those handlers use the service-role client after BotID, authentication, and
-- edge rate-limit checks have run.

DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contacts;
REVOKE INSERT ON TABLE public.contacts FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.contacts TO service_role;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
REVOKE INSERT ON TABLE public.subscribers FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.subscribers TO service_role;

DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
REVOKE INSERT ON TABLE public.waitlist FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.waitlist TO service_role;

DROP POLICY IF EXISTS "email_events_anon_create" ON public.email_events;
REVOKE INSERT ON TABLE public.email_events FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.email_events TO service_role;

-- These read-only functions do not need owner privileges. SECURITY INVOKER
-- preserves public-content RLS and prevents them from bypassing table policy.
ALTER FUNCTION public.get_post_view_count(uuid) SECURITY INVOKER;
ALTER FUNCTION public.search_posts(text) SECURITY INVOKER;
