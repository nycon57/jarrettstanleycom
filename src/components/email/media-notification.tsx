import * as React from 'react';

interface MediaNotificationEmailProps {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  outlet: string;
  role: string;
  deadline?: string;
  topic: string;
  interview_type: 'written' | 'phone' | 'video' | 'in-person';
  message?: string;
}

export const MediaNotificationEmail: React.FC<Readonly<MediaNotificationEmailProps>> = ({
  first_name,
  last_name,
  email,
  phone,
  outlet,
  role,
  deadline,
  topic,
  interview_type,
  message,
}) => {
  const getInterviewTypeDisplay = () => {
    switch (interview_type) {
      case 'written': return '✍️ Written Q&A';
      case 'phone': return '📞 Phone Interview';
      case 'video': return '🎥 Video Interview';
      case 'in-person': return '👥 In-Person Interview';
      default: return interview_type;
    }
  };

  const isUrgent = deadline && new Date(deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
  const getOutletTier = () => {
    const majorOutlets = ['Forbes', 'Wall Street Journal', 'Reuters', 'Bloomberg', 'CNN', 'CNBC', 'Fox Business', 'MarketWatch'];
    const industryMedia = ['National Mortgage News', 'Mortgage Professional America', 'HousingWire', 'Mortgage Banker'];
    
    if (majorOutlets.some(major => outlet.toLowerCase().includes(major.toLowerCase()))) return 'tier1';
    if (industryMedia.some(industry => outlet.toLowerCase().includes(industry.toLowerCase()))) return 'industry';
    return 'standard';
  };

  const outletTier = getOutletTier();
  const priorityColor = isUrgent ? '#dc2626' : outletTier === 'tier1' ? '#ea580c' : outletTier === 'industry' ? '#d97706' : '#16a34a';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          backgroundColor: '#f59e0b', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>📰 Media Inquiry</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>
            {outlet} • {first_name} {last_name}
          </p>
        </div>
      </div>

      {/* Priority Banner */}
      <div style={{ 
        backgroundColor: isUrgent ? '#fee2e2' : 
                        outletTier === 'tier1' ? '#fed7aa' :
                        outletTier === 'industry' ? '#fef3c7' : '#dcfce7',
        border: `3px solid ${priorityColor}`,
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <p style={{ 
          margin: '0', 
          color: priorityColor, 
          fontSize: '18px', 
          fontWeight: 'bold' 
        }}>
          {isUrgent ? '🚨 URGENT MEDIA REQUEST' : 
           outletTier === 'tier1' ? '⭐ TIER 1 MEDIA OUTLET' : 
           outletTier === 'industry' ? '🎯 INDUSTRY PUBLICATION' : 
           '📰 MEDIA REQUEST'}
        </p>
        {deadline && (
          <p style={{ 
            margin: '5px 0 0 0', 
            color: priorityColor, 
            fontSize: '14px'
          }}>
            Deadline: {new Date(deadline).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
            {isUrgent && ' (URGENT!)'}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: '#f9fafb', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          👤 Journalist Information
        </h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Name:</strong>
            <span style={{ color: '#111827' }}>{first_name} {last_name}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Email:</strong>
            <a href={`mailto:${email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
              {email}
            </a>
          </div>
          
          {phone && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Phone:</strong>
              <a href={`tel:${phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                {phone}
              </a>
            </div>
          )}
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Outlet:</strong>
            <span style={{ 
              backgroundColor: priorityColor,
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {outlet}
            </span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Role:</strong>
            <span style={{ color: '#111827' }}>{role}</span>
          </div>
        </div>
      </div>

      {/* Story Details */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📝 Story Details
        </h2>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Topic:</strong>
            <span style={{ color: '#111827', fontSize: '16px', fontWeight: '500' }}>{topic}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Interview Format:</strong>
            <span style={{ 
              backgroundColor: '#e0f2fe',
              color: '#0277bd',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {getInterviewTypeDisplay()}
            </span>
          </div>
          
          {deadline && (
            <div>
              <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Deadline:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  backgroundColor: isUrgent ? '#dc2626' : '#16a34a',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {new Date(deadline).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                {isUrgent && (
                  <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: 'bold' }}>
                    ⚡ URGENT
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
          <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
            💬 Additional Details
          </h2>
          <div style={{ 
            backgroundColor: '#fef3c7', 
            padding: '20px', 
            borderRadius: '6px', 
            borderLeft: '4px solid #f59e0b'
          }}>
            <p style={{ color: '#a16207', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ color: '#0277bd', marginTop: '0', fontSize: '18px', marginBottom: '15px' }}>
          ⚡ Quick Response Templates
        </h3>
        
        <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <a href={`mailto:${email}?subject=Re: Media Inquiry - ${topic}&body=Hi ${first_name},%0D%0A%0D%0AThank you for reaching out to me regarding ${topic}. I'd be happy to contribute to your story for ${outlet}.%0D%0A%0D%0AI'm available for ${interview_type === 'written' ? 'written responses' : interview_type === 'phone' ? 'a phone interview' : interview_type === 'video' ? 'a video interview' : 'an in-person interview'}${deadline ? ` and understand your ${new Date(deadline).toLocaleDateString()} deadline` : ''}.%0D%0A%0D%0AAs CMO at Nationwide Mortgage Bankers and AI marketing innovator, I can provide insights on:%0D%0A- AI implementation in financial services marketing%0D%0A- Current trends in mortgage industry technology%0D%0A- The intersection of artificial intelligence and authentic marketing%0D%0A%0D%0AWould ${interview_type === 'written' ? 'receiving your questions via email work best' : 'scheduling a brief call to discuss the interview details work for you'}?%0D%0A%0D%0AI can also provide additional background information, high-resolution photos, or connect you with other industry experts if needed.%0D%0A%0D%0ABest regards,%0D%0AJarrett Stanley%0D%0ACMO, Nationwide Mortgage Bankers%0D%0AAI Marketing Pioneer%0D%0Ajarrett@jarrettstanley.com`} style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            📧 Send Professional Response
          </a>
          
          {interview_type === 'written' && (
            <a href={`mailto:${email}?subject=Re: Written Interview - ${topic}&body=Hi ${first_name},%0D%0A%0D%0AThank you for the interview opportunity. I'm ready to provide written responses for your ${outlet} story on ${topic}.%0D%0A%0D%0APlease send me your questions and I'll provide detailed, quotable responses${deadline ? ` by your ${new Date(deadline).toLocaleDateString()} deadline` : ''}.%0D%0A%0D%0AFor context, here's my background relevant to this topic:%0D%0A- Chief Marketing Officer at Nationwide Mortgage Bankers%0D%0A- Pioneer in AI marketing innovation%0D%0A- Expert in AI-powered marketing for financial services%0D%0A%0D%0AIf you need any additional background information or supporting materials, please let me know.%0D%0A%0D%0ABest regards,%0D%0AJarrett Stanley`} style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              ✍️ Written Interview Response
            </a>
          )}
          
          {(interview_type === 'phone' || interview_type === 'video' || interview_type === 'in-person') && (
            <a href={`mailto:${email}?subject=Re: ${interview_type.charAt(0).toUpperCase() + interview_type.slice(1)} Interview - ${topic}&body=Hi ${first_name},%0D%0A%0D%0AThank you for the interview opportunity. I'm available for a ${interview_type === 'phone' ? 'phone interview' : interview_type === 'video' ? 'video interview' : 'in-person interview'} regarding ${topic}.%0D%0A%0D%0AI'm generally available:%0D%0A- Monday-Friday: 9 AM - 5 PM CT%0D%0A- Can accommodate urgent requests outside these hours%0D%0A%0D%0AFor scheduling, here are a few options:%0D%0A1. [Insert your available times]%0D%0A2. Use my calendar link: https://calendly.com/jarrettstanley/media-interview%0D%0A%0D%0AInterview duration: I'm flexible, but typically 15-30 minutes works well for most stories.%0D%0A%0D%0A${interview_type === 'video' ? 'For video interviews, I can use Zoom, Teams, or your preferred platform.' : interview_type === 'in-person' ? 'For in-person interviews, I\'m located in [location] but can travel if needed.' : 'I\'ll call you at the number you provide, or you can call me at [your number].'}%0D%0A%0D%0ALooking forward to contributing to your story!%0D%0A%0D%0ABest regards,%0D%0AJarrett Stanley`} style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              🎤 Schedule {interview_type.charAt(0).toUpperCase() + interview_type.slice(1)} Interview
            </a>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}?subject=Re: Your Media Inquiry`} style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '12px'
          }}>
            Custom Reply
          </a>
          
          {phone && (
            <a href={`tel:${phone}`} style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '12px'
            }}>
              Call Now
            </a>
          )}
          
          <a href="mailto:jarrett@jarrettstanley.com?subject=Press Kit Request" style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '12px'
          }}>
            Send Press Kit
          </a>
        </div>
      </div>

      {/* Response Timeline */}
      <div style={{ 
        backgroundColor: isUrgent ? '#fee2e2' : '#f0fdf4', 
        border: `1px solid ${isUrgent ? '#fecaca' : '#bbf7d0'}`, 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{ 
          margin: '0', 
          color: isUrgent ? '#b91c1c' : '#166534', 
          fontSize: '14px', 
          fontWeight: 'bold' 
        }}>
          ⏰ Response Target: {isUrgent ? 'IMMEDIATE - Respond within 2 hours!' : 
                              outletTier === 'tier1' ? 'Within 4 hours (Tier 1 Media)' : 
                              'Within 4 hours (Media Priority)'}
        </p>
      </div>

      {/* Media Kit Info */}
      <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0c4a6e', fontSize: '16px' }}>
          📎 Available Media Resources
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#0369a1', fontSize: '13px' }}>
          <li>High-resolution professional photos</li>
          <li>Detailed biography and credentials</li>
          <li>AI marketing platform case studies and examples</li>
          <li>Recent speaking topics and presentations</li>
          <li>Company background and statistics</li>
        </ul>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          Media inquiry submitted via jarrettstanley.com
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
          Received at {new Date().toLocaleString('en-US', { 
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </p>
      </div>
    </div>
  );
};