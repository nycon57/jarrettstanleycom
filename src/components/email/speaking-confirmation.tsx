import * as React from 'react';

interface SpeakingConfirmationEmailProps {
  firstName: string;
  data: {
    event_name?: string;
    event_date?: string;
    audience_size?: string;
    budget_range?: string;
    topic_preferences?: string[];
  };
}

export const SpeakingConfirmationEmail: React.FC<Readonly<SpeakingConfirmationEmailProps>> = ({
  firstName,
  data,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>🎤 Thanks for Your Interest!</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            Your speaking inquiry has been received
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#166534', marginTop: '0', fontSize: '22px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#15803d', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for considering me as a speaker for your event. I'm excited about the possibility 
          of sharing insights on AI-powered marketing with your audience.
        </p>
        <p style={{ color: '#15803d', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          I've received your inquiry and will review the details to ensure I can provide maximum 
          value to your attendees.
        </p>
      </div>

      {/* Event Summary */}
      {(data.event_name || data.event_date || data.audience_size) && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
          <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
            📋 Event Summary
          </h2>
          
          {data.event_name && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#6b7280' }}>Event:</strong>
              <span style={{ color: '#111827', marginLeft: '8px' }}>{data.event_name}</span>
            </div>
          )}
          
          {data.event_date && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#6b7280' }}>Date:</strong>
              <span style={{ color: '#111827', marginLeft: '8px' }}>{data.event_date}</span>
            </div>
          )}
          
          {data.audience_size && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#6b7280' }}>Audience Size:</strong>
              <span style={{ color: '#111827', marginLeft: '8px' }}>{data.audience_size}</span>
            </div>
          )}
          
          {data.budget_range && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#6b7280' }}>Budget Range:</strong>
              <span style={{ color: '#111827', marginLeft: '8px' }}>{data.budget_range}</span>
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          🚀 What happens next?
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#22c55e', 
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
                Review & Availability Check
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                I'll review your event details and check my availability for your requested date.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#22c55e', 
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
                Initial Response
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                You'll receive an initial response within 24 hours with availability confirmation.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ 
              backgroundColor: '#22c55e', 
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
                Detailed Discussion
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                We'll schedule a call to discuss your specific goals, audience, and customize the presentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Speaking Topics Preview */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#166534', fontSize: '18px' }}>
          🎯 Popular Speaking Topics
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#15803d' }}>
          <li style={{ marginBottom: '8px' }}>The Future of AI in Mortgage Marketing</li>
          <li style={{ marginBottom: '8px' }}>Building Authentic Voice in AI-Generated Content</li>
          <li style={{ marginBottom: '8px' }}>Implementing AI Tools Without Losing the Human Touch</li>
          <li style={{ marginBottom: '8px' }}>Data-Driven Marketing Strategies for Mortgage Professionals</li>
          <li style={{ marginBottom: '8px' }}>Creating TrueTone AI: Lessons from Building an AI Platform</li>
        </ul>
        <p style={{ margin: '15px 0 0 0', fontSize: '14px', color: '#166534', fontStyle: 'italic' }}>
          All presentations are customized to your audience and event goals.
        </p>
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          📞 Need to Reach Me Directly?
        </h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280' }}>
          For urgent requests or additional questions:
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="mailto:jarrett@jarrettstanley.com" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Email Directly
          </a>
          <a href="https://calendly.com/jarrettstanley/speaking" style={{
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Schedule Call
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          This email was sent because you submitted a speaking inquiry through jarrettstanley.com
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
          Jarrett Stanley | AI Marketing Expert & Professional Speaker
        </p>
      </div>
    </div>
  );
};