import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals Data:', data)
    }
    
    // In production, you would send this to your analytics service
    // Examples:
    
    // Send to Google Analytics Measurement Protocol
    // await sendToGoogleAnalytics(data)
    
    // Send to custom analytics service
    // await sendToCustomAnalytics(data)
    
    // Store in database for later analysis
    // await storeInDatabase(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing vitals data:', error)
    return NextResponse.json(
      { error: 'Failed to process vitals data' },
      { status: 500 }
    )
  }
}

// Example function to send to Google Analytics
async function sendToGoogleAnalytics(data: any) {
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID
  const GA_API_SECRET = process.env.GA_API_SECRET
  
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    return
  }
  
  const payload = {
    client_id: data.clientId || 'anonymous',
    events: [{
      name: 'web_vitals',
      params: {
        metric_name: data.metric,
        metric_value: data.data.value || data.data,
        page_location: data.url,
        custom_parameter_1: data.data.id,
        custom_parameter_2: data.data.delta,
      }
    }]
  }
  
  try {
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Failed to send to Google Analytics:', error)
  }
}

// Example function to store in database
async function storeInDatabase(data: any) {
  // This would integrate with your database (Supabase, etc.)
  // Example with Supabase:
  /*
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  await supabase
    .from('web_vitals')
    .insert({
      metric_name: data.metric,
      metric_value: data.data.value || data.data,
      url: data.url,
      user_agent: data.userAgent,
      timestamp: new Date(data.timestamp),
      metric_id: data.data.id,
      metric_delta: data.data.delta,
    })
  */
}