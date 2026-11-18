-- Restrict write surfaces that are now handled by trusted server-side routes.
-- Public read policies for site content remain unchanged.

-- Resource downloads are written by server code using the service-role client.
-- Drop the legacy unrestricted RLS policy and remove anonymous table INSERT.
DROP POLICY IF EXISTS "Allow public insert to resource_downloads" ON public.resource_downloads;
DROP POLICY IF EXISTS "Anyone can download resources" ON public.resource_downloads;
DROP POLICY IF EXISTS "Public can insert resource downloads" ON public.resource_downloads;
REVOKE INSERT ON TABLE public.resource_downloads FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.resource_downloads TO service_role;

-- There are no browser callers for post-view writes in this repository. Keep
-- the table available to trusted server work without accepting direct client
-- analytics events.
DROP POLICY IF EXISTS "Allow public insert to post_views" ON public.post_views;
DROP POLICY IF EXISTS "Anyone can create post views" ON public.post_views;
DROP POLICY IF EXISTS "Public can insert post views" ON public.post_views;
REVOKE INSERT ON TABLE public.post_views FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.post_views TO service_role;

-- The legacy "own views" policy has no ownership predicate; its `true`
-- condition exposes stored IP addresses and user agents to anonymous clients.
DROP POLICY IF EXISTS "Public can view own post views" ON public.post_views;
REVOKE SELECT ON TABLE public.post_views FROM PUBLIC, anon;
GRANT SELECT ON TABLE public.post_views TO authenticated, service_role;

-- The legacy public RPC was another direct path to create post-view records.
-- Its full signature is used so this does not affect unrelated overloads.
REVOKE EXECUTE ON FUNCTION public.increment_post_view(uuid, inet, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_post_view(uuid, inet, text, text) TO service_role;
