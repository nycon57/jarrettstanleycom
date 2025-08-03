import * as React from 'react';

interface MediaConfirmationEmailProps {
  firstName: string;
  data: {
    outlet: string;
    deadline?: string;
    topic: string;
    interview_type: 'written' | 'phone' | 'video' | 'in-person';
  };
}

export const MediaConfirmationEmail: React.FC<Readonly<MediaConfirmationEmailProps>> = ({
  firstName,
  data,
}) => {
  const getInterviewTypeDisplay = () => {
    switch (data.interview_type) {
      case 'written': return 'Written Q&A';
      case 'phone': return 'Phone Interview';
      case 'video': return 'Video Interview';
      case 'in-person': return 'In-Person Interview';
      default: return data.interview_type;
    }
  };

  const isUrgent = data.deadline && new Date(data.deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>📰 Media Request Received</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            We'll get back to you promptly
          </p>
        </div>
      </div>

      {/* Urgent Banner */}
      {isUrgent && (
        <div style={{ 
          backgroundColor: '#fee2e2', 
          border: '2px solid #dc2626', 
          borderRadius: '8px', 
          padding: '15px', 
          marginBottom: '25px',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: '0', 
            color: '#dc2626', 
            fontSize: '16px', 
            fontWeight: 'bold' 
          }}>
            ⚡ URGENT REQUEST NOTED - We understand your deadline and will prioritize this request
          </p>
        </div>
      )}

      {/* Personal Message */}
      <div style={{ backgroundColor: '#fef3c7', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#92400e', marginTop: '0', fontSize: '22px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#a16207', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for reaching out to {data.outlet}. I appreciate your interest in my insights 
          on AI-powered marketing and the mortgage industry.
        </p>
        <p style={{ color: '#a16207', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          I understand the importance of meeting media deadlines and will respond to your request 
          as quickly as possible.
        </p>
      </div>

      {/* Request Summary */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📋 Your Request Summary
        </h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Outlet:</strong>
            <span style={{ color: '#111827' }}>{data.outlet}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Topic:</strong>
            <span style={{ color: '#111827' }}>{data.topic}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Interview Type:</strong>
            <span style={{ 
              backgroundColor: '#e0f2fe',
              color: '#0277bd',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {getInterviewTypeDisplay()}
            </span>
          </div>
          
          {data.deadline && (
            <div>
              <strong style={{ color: '#6b7280', marginRight: '8px' }}>Deadline:</strong>
              <span style={{ 
                backgroundColor: isUrgent ? '#dc2626' : '#16a34a',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {new Date(data.deadline).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                {isUrgent && ' (URGENT)'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Response Timeline */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          ⏰ Response Timeline
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              borderRadius: '50%', 
              width: '24px', 
              height: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginRight: '15px', 
              flexShrink: 0 
            }}>
              1
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Initial Response ({isUrgent ? '2 hours' : '4 hours'})
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Confirmation of availability and any clarifying questions about your request.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              borderRadius: '50%', 
              width: '24px', 
              height: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginRight: '15px', 
              flexShrink: 0 
            }}>
              2
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Content Delivery
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Written responses, interview scheduling, or completed interview based on your format preference.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              borderRadius: '50%', 
              width: '24px', 
              height: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              marginRight: '15px', 
              flexShrink: 0 
            }}>
              3
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Follow-up Support
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Available for any follow-up questions or additional context you may need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Areas */}
      <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#92400e', fontSize: '18px' }}>
          🎯 Areas of Expertise
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#a16207', fontSize: '14px', fontWeight: 'bold' }}>
              AI & Technology
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e', fontSize: '13px' }}>
              <li>AI-powered marketing tools</li>
              <li>Machine learning in finance</li>
              <li>Marketing automation</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#a16207', fontSize: '14px', fontWeight: 'bold' }}>
              Mortgage Industry
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#92400e', fontSize: '13px' }}>
              <li>Digital transformation</li>
              <li>Consumer behavior trends</li>
              <li>Regulatory compliance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bio & Credentials */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          📄 Quick Bio & Credentials
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
          Jarrett Stanley is Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI, 
          a revolutionary platform that captures authentic voice for AI-generated marketing content. He's a 
          recognized thought leader in AI-powered marketing for the financial services industry.
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            color: '#374151' 
          }}>
            CMO, Nationwide Mortgage Bankers
          </div>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            color: '#374151' 
          }}>
            Creator, TrueTone AI
          </div>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '8px 12px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            color: '#374151' 
          }}>
            AI Marketing Expert
          </div>
        </div>
      </div>

      {/* Press Kit */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0277bd', fontSize: '18px' }}>
          📎 Digital Press Kit Available
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#01579b' }}>
          High-resolution photos, detailed bio, company information, and recent achievements available upon request.
        </p>
        <a href="mailto:jarrett@jarrettstanley.com?subject=Press Kit Request - ${data.outlet}" style={{
          backgroundColor: '#0277bd',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          Request Press Kit
        </a>
      </div>

      {/* Direct Contact */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          📞 For Urgent Requests
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6b7280' }}>
          If you have a breaking news deadline or urgent request:
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="mailto:jarrett@jarrettstanley.com" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Email Directly
          </a>
          <a href="tel:+1-555-MEDIA-01" style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Media Hotline
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          This email was sent because you submitted a media inquiry through jarrettstanley.com
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
          Jarrett Stanley | Available for Media Interviews | jarrettstanley.com/media
        </p>
      </div>
    </div>
  );
};