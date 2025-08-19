import * as React from 'react';

interface ConsultingConfirmationEmailProps {
  firstName: string;
  data: {
    company?: string;
    budget_range?: string;
    timeline?: string;
    project_description?: string;
    current_challenges?: string;
  };
}

export const ConsultingConfirmationEmail: React.FC<Readonly<ConsultingConfirmationEmailProps>> = ({
  firstName,
  data,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>💼 Let's Transform Your Marketing</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            Your consulting inquiry has been received
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#1e40af', marginTop: '0', fontSize: '22px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#1e3a8a', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for reaching out about your AI marketing consulting needs. I'm excited about 
          the opportunity to help {data.company || 'your organization'} leverage artificial intelligence 
          to transform your marketing efforts.
        </p>
        <p style={{ color: '#1e3a8a', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          Based on your inquiry, I can see there's significant potential to drive meaningful results 
          for your business.
        </p>
      </div>

      {/* Project Summary */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📋 Your Project Overview
        </h2>
        
        {data.company && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#6b7280' }}>Company:</strong>
            <span style={{ color: '#111827', marginLeft: '8px' }}>{data.company}</span>
          </div>
        )}
        
        {data.timeline && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#6b7280' }}>Timeline:</strong>
            <span style={{ color: '#111827', marginLeft: '8px' }}>{data.timeline}</span>
          </div>
        )}
        
        {data.budget_range && (
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#6b7280' }}>Investment Range:</strong>
            <span style={{ 
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              marginLeft: '8px'
            }}>
              {data.budget_range}
            </span>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          🚀 What happens next?
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#3b82f6', 
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
                Initial Assessment
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                I'll review your project details and current challenges to prepare a customized approach.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ 
              backgroundColor: '#3b82f6', 
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
                Discovery Call (Week 1)
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                We'll schedule a 45-minute call to dive deep into your goals, challenges, and success metrics.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ 
              backgroundColor: '#3b82f6', 
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
                Custom Proposal
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                You'll receive a detailed proposal with strategy, timeline, deliverables, and investment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#1e40af', fontSize: '18px' }}>
          🎯 Popular Consulting Services
        </h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
            <span style={{ color: '#1e3a8a', fontSize: '14px' }}>AI Marketing Strategy Development</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
            <span style={{ color: '#1e3a8a', fontSize: '14px' }}>Custom AI Tool Implementation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
            <span style={{ color: '#1e3a8a', fontSize: '14px' }}>Marketing Automation & Workflow Design</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
            <span style={{ color: '#1e3a8a', fontSize: '14px' }}>Team Training & Change Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
            <span style={{ color: '#1e3a8a', fontSize: '14px' }}>Performance Measurement & Optimization</span>
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#166534', fontSize: '18px' }}>
          📈 What Clients Achieve
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
            <div style={{ color: '#15803d', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>150%</div>
            <div style={{ color: '#166534', fontSize: '12px' }}>Average increase in marketing qualified leads</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
            <div style={{ color: '#15803d', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>60%</div>
            <div style={{ color: '#166534', fontSize: '12px' }}>Reduction in content creation time</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #dcfce7' }}>
            <div style={{ color: '#15803d', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>3.2x</div>
            <div style={{ color: '#166534', fontSize: '12px' }}>ROI improvement within 6 months</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          📞 Ready to Move Forward?
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6b7280' }}>
          Don't wait to start seeing results. Let's schedule our discovery call:
        </p>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://calendly.com/jarrettstanley/consulting-discovery" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            Schedule Discovery Call
          </a>
          <a href="mailto:jarrett@jarrettstanley.com" style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Email Directly
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          This email was sent because you submitted a consulting inquiry through jarrettstanley.com
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
          Jarrett Stanley | AI Marketing Consultant | CMO at Nationwide Mortgage Bankers
        </p>
      </div>
    </div>
  );
};