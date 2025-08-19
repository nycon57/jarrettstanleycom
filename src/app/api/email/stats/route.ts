import { NextRequest, NextResponse } from 'next/server';
import { getEmailStats } from '@/lib/email-service';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const templateName = searchParams.get('template');
    const dateFromStr = searchParams.get('dateFrom');
    const dateToStr = searchParams.get('dateTo');
    const period = searchParams.get('period') || '7d'; // Default to 7 days

    // Parse dates
    let dateFrom: Date | undefined;
    let dateTo: Date | undefined;

    if (dateFromStr) {
      dateFrom = new Date(dateFromStr);
    } else {
      // Default date range based on period
      const now = new Date();
      switch (period) {
        case '24h':
          dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    if (dateToStr) {
      dateTo = new Date(dateToStr);
    }

    // Get email statistics
    const stats = await getEmailStats(
      templateName || undefined,
      dateFrom,
      dateTo
    );

    if (!stats) {
      return NextResponse.json(
        { error: 'Failed to retrieve email statistics' },
        { status: 500 }
      );
    }

    // Get additional template-specific stats if requested
    let templateStats = null;
    if (!templateName) {
      // Get stats by template
      let templateQuery = supabase
        .from('email_logs')
        .select('template_name, status');

      if (dateFrom) {
        templateQuery = templateQuery.gte('created_at', dateFrom.toISOString());
      }
      if (dateTo) {
        templateQuery = templateQuery.lte('created_at', dateTo.toISOString());
      }

      const { data: templateData, error: templateError } = await templateQuery;

      if (!templateError && templateData) {
        // Group by template
        const templateGroups = templateData.reduce((acc: any, email) => {
          const template = email.template_name || 'unknown';
          if (!acc[template]) {
            acc[template] = {
              total: 0,
              sent: 0,
              delivered: 0,
              failed: 0,
              bounced: 0,
              pending: 0
            };
          }
          
          acc[template].total++;
          
          switch (email.status) {
            case 'sent':
            case 'delivered':
              acc[template].sent++;
              if (email.status === 'delivered') {
                acc[template].delivered++;
              }
              break;
            case 'failed':
              acc[template].failed++;
              break;
            case 'bounced':
              acc[template].bounced++;
              break;
            case 'pending':
              acc[template].pending++;
              break;
          }
          
          return acc;
        }, {});

        // Calculate rates for each template
        templateStats = Object.keys(templateGroups).map(template => ({
          template_name: template,
          ...templateGroups[template],
          success_rate: templateGroups[template].total > 0 
            ? (templateGroups[template].sent / templateGroups[template].total) * 100 
            : 0,
          delivery_rate: templateGroups[template].total > 0 
            ? (templateGroups[template].delivered / templateGroups[template].total) * 100 
            : 0
        }));
      }
    }

    // Get recent activity (last 10 emails)
    const { data: recentEmails, error: recentError } = await supabase
      .from('email_logs')
      .select('id, template_name, to_email, subject, status, created_at, sent_at')
      .order('created_at', { ascending: false })
      .limit(10);

    const response = {
      success: true,
      period,
      date_range: {
        from: dateFrom?.toISOString(),
        to: dateTo?.toISOString()
      },
      overall_stats: stats,
      template_stats: templateStats,
      recent_emails: recentError ? [] : recentEmails
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Email stats API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve email statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}