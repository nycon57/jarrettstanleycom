import * as React from 'react';

interface SpeakingNotificationEmailProps {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  event_name?: string;
  event_date?: string;
  audience_size?: string;
  budget_range?: string;
  topic_preferences?: string[];
  message?: string;
}

export const SpeakingNotificationEmail: React.FC<Readonly<SpeakingNotificationEmailProps>> = ({
  first_name,
  last_name,
  email,
  phone,
  company,
  role,
  event_name,
  event_date,
  audience_size,
  budget_range,
  topic_preferences,
  message,
}) => {
  const getBudgetPriority = () => {
    if (!budget_range) return 'unknown';
    if (budget_range.includes('$25k+') || budget_range.includes('$50k+')) return 'high';
    if (budget_range.includes('$10k-$25k') || budget_range.includes('$15k-$25k')) return 'medium';
    return 'standard';
  };

  const priority = getBudgetPriority();
  const priorityColor = priority === 'high' ? '#dc2626' : priority === 'medium' ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          backgroundColor: '#22c55e', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>🎤 New Speaking Inquiry</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>
            {event_name || 'Event TBD'} • {first_name} {last_name}
          </p>
        </div>
      </div>

      {/* Priority Banner */}
      <div style={{ 
        backgroundColor: priority === 'high' ? '#fee2e2' : priority === 'medium' ? '#fef3c7' : '#dcfce7',
        border: `2px solid ${priorityColor}`,
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <p style={{ 
          margin: '0', 
          color: priorityColor, 
          fontSize: '16px', 
          fontWeight: 'bold' 
        }}>
          {priority === 'high' ? '🔥 HIGH VALUE OPPORTUNITY' : 
           priority === 'medium' ? '⭐ MEDIUM PRIORITY' : 
           '✅ STANDARD INQUIRY'}
          {budget_range && ` • Budget: ${budget_range}`}
        </p>
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: '#f9fafb', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          👤 Contact Information
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
          
          {company && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Company:</strong>
              <span style={{ color: '#111827' }}>{company}</span>
            </div>
          )}
          
          {role && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Role:</strong>
              <span style={{ color: '#111827' }}>{role}</span>
            </div>
          )}
        </div>
      </div>

      {/* Event Details */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          🎯 Event Details
        </h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          {event_name && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Event Name:</strong>
              <span style={{ color: '#111827' }}>{event_name}</span>
            </div>
          )}
          
          {event_date && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Date:</strong>
              <span style={{ color: '#111827' }}>{event_date}</span>
            </div>
          )}
          
          {audience_size && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Audience Size:</strong>
              <span style={{ color: '#111827' }}>{audience_size}</span>
            </div>
          )}
          
          {budget_range && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Budget:</strong>
              <span style={{ 
                backgroundColor: priorityColor,
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                {budget_range}
              </span>
            </div>
          )}
          
          {topic_preferences && topic_preferences.length > 0 && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Topic Preferences:</strong>
              <div style={{ marginTop: '8px' }}>
                {topic_preferences.map((topic, index) => (
                  <span key={index} style={{
                    backgroundColor: '#e0f2fe',
                    color: '#0277bd',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    marginRight: '8px',
                    marginBottom: '4px',
                    display: 'inline-block'
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
          <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
            💬 Message
          </h2>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '20px', 
            borderRadius: '6px', 
            borderLeft: '4px solid #22c55e'
          }}>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
              {message}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ color: '#0277bd', marginTop: '0', fontSize: '18px', marginBottom: '15px' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}?subject=Re: Speaking Inquiry - ${event_name || 'Your Event'}&body=Hi ${first_name},%0D%0A%0D%0AThank you for your interest in having me speak at ${event_name || 'your event'}. I'm excited about the opportunity to share insights with your audience.%0D%0A%0D%0ABased on your inquiry, I'd love to discuss:%0D%0A- Customizing the presentation for your specific audience%0D%0A- Available topics and how they align with your goals%0D%0A- Logistics and technical requirements%0D%0A%0D%0AWould you be available for a brief call this week to discuss the details?%0D%0A%0D%0ABest regards,%0D%0AJarrett Stanley`} style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Reply with Template
          </a>
          
          <a href={`mailto:${email}?subject=Re: Your Speaking Inquiry`} style={{
            backgroundColor: '#388e3c',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Custom Reply
          </a>
          
          {phone && (
            <a href={`tel:${phone}`} style={{
              backgroundColor: '#f57c00',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Call Now
            </a>
          )}
          
          <a href="https://calendly.com/jarrettstanley/speaking-consultation" style={{
            backgroundColor: '#7b1fa2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Send Calendly Link
          </a>
        </div>
      </div>

      {/* Response Timeline */}
      <div style={{ 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7', 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{ 
          margin: '0', 
          color: '#856404', 
          fontSize: '14px', 
          fontWeight: 'bold' 
        }}>
          ⏰ Response Target: Within 24 hours
          {priority === 'high' ? ' • HIGH PRIORITY - Respond ASAP!' : ''}
        </p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          Speaking inquiry submitted via jarrettstanley.com
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