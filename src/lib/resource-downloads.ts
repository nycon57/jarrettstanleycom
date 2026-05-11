import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function trackResourceDownload(
  resourceId: string,
  email: string,
  firstName?: string,
  lastName?: string,
  company?: string
): Promise<void> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';

  await supabase.from('resource_downloads').insert({
    resource_id: resourceId,
    email,
    first_name: firstName,
    last_name: lastName,
    company,
    ip_address: ip,
    user_agent: userAgent,
  });

  const { data: resource } = await supabase
    .from('resources')
    .select('download_count')
    .eq('id', resourceId)
    .single();

  if (resource) {
    await supabase
      .from('resources')
      .update({ download_count: (resource.download_count || 0) + 1 })
      .eq('id', resourceId);
  }
}
