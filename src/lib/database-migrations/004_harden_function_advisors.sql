-- Harden Supabase advisor findings for public functions.
-- - Pin search_path to avoid role-mutable resolution.
-- - Remove direct client execution from SECURITY DEFINER helpers that should
--   only run through triggers or trusted server-side service role calls.

-- Mutable search_path findings.
ALTER FUNCTION public.get_pending_emails(integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_post_view_count(uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.get_user_email_stats(text) SET search_path = public, pg_temp;
ALTER FUNCTION public.increment_post_view(uuid, inet, text, text) SET search_path = public, pg_temp;
ALTER FUNCTION public.increment_resource_download_count() SET search_path = public, pg_temp;
ALTER FUNCTION public.log_form_submission_emails(text, uuid, text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.log_form_submission_emails(text, text, uuid, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.log_newsletter_signup_email(text, text, uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.log_newsletter_signup_email(uuid, text, text) SET search_path = public, pg_temp;
ALTER FUNCTION public.log_resource_download_email(text, text, uuid) SET search_path = public, pg_temp;
ALTER FUNCTION public.log_resource_download_email(uuid, text, text, text, text) SET search_path = public, pg_temp;
ALTER FUNCTION public.mark_email_sent(uuid, text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.process_email_webhook(jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.search_posts(text) SET search_path = public, pg_temp;
ALTER FUNCTION public.unsubscribe_user(text) SET search_path = public, pg_temp;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public, pg_temp;

-- Server-only SECURITY DEFINER helpers and trigger functions.
REVOKE ALL ON FUNCTION public.get_email_analytics_summary(date, date, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_pending_emails(integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_user_email_stats(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_form_submission_emails(text, uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_form_submission_emails(text, text, uuid, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_newsletter_signup_email(text, text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_newsletter_signup_email(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_resource_download_email(text, text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_resource_download_email(uuid, text, text, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.mark_email_sent(uuid, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.process_email_webhook(jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_contact_email_logging() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_resource_download_email_logging() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.trigger_subscriber_email_logging() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.unsubscribe_user(text, text) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.get_email_analytics_summary(date, date, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_pending_emails(integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_user_email_stats(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_form_submission_emails(text, uuid, text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_form_submission_emails(text, text, uuid, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_newsletter_signup_email(text, text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_newsletter_signup_email(uuid, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_resource_download_email(text, text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_resource_download_email(uuid, text, text, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.mark_email_sent(uuid, text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.process_email_webhook(jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.trigger_contact_email_logging() TO service_role;
GRANT EXECUTE ON FUNCTION public.trigger_resource_download_email_logging() TO service_role;
GRANT EXECUTE ON FUNCTION public.trigger_subscriber_email_logging() TO service_role;
GRANT EXECUTE ON FUNCTION public.unsubscribe_user(text, text) TO service_role;

-- Public blog read/analytics RPCs appear in generated client types. Keep anon
-- access for public site traffic while removing authenticated execution that
-- Supabase flags for SECURITY DEFINER functions.
REVOKE ALL ON FUNCTION public.get_post_view_count(uuid) FROM PUBLIC, authenticated;
REVOKE ALL ON FUNCTION public.increment_post_view(uuid, inet, text, text) FROM PUBLIC, authenticated;
REVOKE ALL ON FUNCTION public.search_posts(text) FROM PUBLIC, authenticated;

GRANT EXECUTE ON FUNCTION public.get_post_view_count(uuid) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.increment_post_view(uuid, inet, text, text) TO anon, service_role;
GRANT EXECUTE ON FUNCTION public.search_posts(text) TO anon, service_role;
