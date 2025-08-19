import * as React from 'react';

interface ContactConfirmationEmailProps {
  name: string;
  type: 'general' | 'speaking' | 'consulting' | 'media';
  message: string;
}

export const ContactConfirmationEmail: React.FC<Readonly<ContactConfirmationEmailProps>> = ({
  name,
  type,
  message,
}) => {
  const getTypeSpecificContent = () => {
    switch (type) {
      case 'speaking':
        return {
          title: 'Your Speaking Inquiry is Received',
          description: 'Thank you for your interest in having Jarrett speak at your event. We\'ll review your request and get back to you as soon as possible with next steps.',
          responseTime: 'as soon as possible',
          nextSteps: 'Our team will review your event details and reach out to discuss topics, logistics, and availability.'
        };
      case 'consulting':
        return {
          title: 'Your Consulting Inquiry is Received',
          description: 'Thank you for considering Jarrett for your AI marketing consulting needs. We\'ll review your project requirements and schedule a discovery call.',
          responseTime: 'as soon as possible',
          nextSteps: 'We\'ll schedule a discovery call to understand your specific needs and discuss how we can help achieve your goals.'
        };
      case 'media':
        return {
          title: 'Your Media Request is Received',
          description: 'Thank you for your media inquiry. We understand the importance of meeting deadlines and will respond promptly.',
          responseTime: '4 hours',
          nextSteps: 'We\'ll review your request and provide the information you need or schedule an interview at your convenience.'
        };
      default:
        return {
          title: 'Your Message is Received',
          description: 'Thank you for reaching out. We\'ve received your message and will get back to you soon.',
          responseTime: 'as soon as possible',
          nextSteps: 'We\'ll review your message and respond with the information you need or next steps.'
        };
    }
  };

  const content = getTypeSpecificContent();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #9D7AD6 0%, #B794F6 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>Thank You, {name}!</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            {content.title}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          {content.description}
        </p>
        
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #90caf9', 
          borderRadius: '6px', 
          padding: '15px', 
          margin: '20px 0' 
        }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#1565c0' }}>
            <strong>Expected Response Time:</strong> Within {content.responseTime}
          </p>
        </div>
      </div>

      {/* What's Next */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
          What happens next?
        </h2>
        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>
          {content.nextSteps}
        </p>
      </div>

      {/* Your Message */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h3 style={{ color: '#333', marginTop: '0', fontSize: '18px', marginBottom: '15px' }}>
          Your Message:
        </h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '6px', 
          borderLeft: '3px solid #9D7AD6' 
        }}>
          <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
            {message}
          </p>
        </div>
      </div>

      {/* About Jarrett */}
      <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '18px' }}>
          About Jarrett Stanley
        </h3>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px', lineHeight: '1.5' }}>
          Jarrett is Chief Marketing Officer at Nationwide Mortgage Bankers and AI marketing pioneer. 
          He's a recognized thought leader in AI-powered marketing for the mortgage industry, combining 
          deep industry expertise with cutting-edge technology insights.
        </p>
      </div>

      {/* Social Links */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '16px' }}>
          Follow Jarrett's insights:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://linkedin.com/in/jarrettstanley" style={{ 
            backgroundColor: '#0077b5', 
            color: 'white', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontSize: '14px' 
          }}>
            LinkedIn
          </a>
          <a href="https://twitter.com/jarrettstanley" style={{ 
            backgroundColor: '#1da1f2', 
            color: 'white', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontSize: '14px' 
          }}>
            Twitter
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e9ecef' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          This email was sent because you contacted Jarrett Stanley through the website.
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
          Jarrett Stanley | AI Marketing Expert | jarrettstanley.com
        </p>
      </div>
    </div>
  );
};