import * as React from 'react';


const NEWSLETTER_WELCOME_STYLE_1 = {
              backgroundColor: '#7c3aed',
              color: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginRight: '15px',
              flexShrink: 0
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_2 = {
              backgroundColor: '#7c3aed',
              color: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginRight: '15px',
              flexShrink: 0
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_3 = {
              backgroundColor: '#7c3aed',
              color: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginRight: '15px',
              flexShrink: 0
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_4 = {
              backgroundColor: '#7c3aed',
              color: 'white',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              marginRight: '15px',
              flexShrink: 0
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_5 = {
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'inline-block',
          boxShadow: '0 4px 12px rgba(22, 101, 52, 0.3)'
        
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_6 = {
              backgroundColor: '#f59e0b',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0,
              marginTop: '2px'
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_7 = {
              backgroundColor: '#f59e0b',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0,
              marginTop: '2px'
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_8 = {
              backgroundColor: '#f59e0b',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              flexShrink: 0,
              marginTop: '2px'
            
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_9 = {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          
} satisfies React.CSSProperties;

const NEWSLETTER_WELCOME_STYLE_10 = {
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'inline-block'
        
} satisfies React.CSSProperties;
interface NewsletterWelcomeEmailProps {
  firstName: string;
}

const NewsletterWelcomeEmail: React.FC<Readonly<NewsletterWelcomeEmailProps>> = ({
  firstName
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
          color: 'white',
          padding: '25px',
          borderRadius: '8px'
        }}>
          <h1 style={{ margin: '0', fontSize: '32px' }}>🚀 Welcome to the AI Marketing Revolution!</h1>
          <p style={{ margin: '15px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            You're now part of an exclusive community of forward-thinking marketers
          </p>
        </div>
      </div>

      {/* Personal Welcome */}
      <div style={{ backgroundColor: '#f5f3ff', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#5b21b6', marginTop: '0', fontSize: '24px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#6d28d9', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for joining my newsletter! You've just taken the first step toward mastering 
          AI-powered marketing in an authentic, results-driven way.
        </p>
        <p style={{ color: '#6d28d9', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          As CMO at Nationwide Mortgage Bankers and AI marketing innovator, I've seen firsthand 
          how the right AI strategies can transform marketing results while maintaining authentic voice.
        </p>
      </div>

      {/* What to Expect */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📬 What You'll Receive
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={NEWSLETTER_WELCOME_STYLE_1}>
              📊
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Weekly AI Marketing Insights
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Data-driven strategies, emerging trends, and practical tips you can implement immediately.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={NEWSLETTER_WELCOME_STYLE_2}>
              🛠️
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Exclusive Tools & Resources
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Templates, checklists, and frameworks available only to newsletter subscribers.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={NEWSLETTER_WELCOME_STYLE_3}>
              💡
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Behind-the-Scenes Case Studies
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                Real examples from my work at Nationwide and AI marketing innovation.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={NEWSLETTER_WELCOME_STYLE_4}>
              🎯
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#374151' }}>
                Early Access & Special Invites
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>
                First access to new resources, webinars, and exclusive events.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Welcome Resource */}
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '2px solid #16a34a',
        borderRadius: '12px',
        padding: '25px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#166534', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
          🎁 Your Welcome Gift
        </h2>
        <p style={{ color: '#15803d', fontSize: '16px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
          As a thank you for joining, here's my most popular resource: 
          <strong>"The AI Marketing Implementation Playbook"</strong>
        </p>
        <a href="https://jarrettstanley.com/resources/ai-marketing-playbook" style={NEWSLETTER_WELCOME_STYLE_5}>
          🔽 Download Your Free Playbook
        </a>
      </div>

      {/* Quick Start Guide */}
      <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#92400e', fontSize: '18px' }}>
          🏁 Quick Start: 3 Things to Do Right Now
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={NEWSLETTER_WELCOME_STYLE_6}>
              1
            </span>
            <span style={{ color: '#a16207', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Download the welcome playbook</strong> and identify 2-3 AI tools you want to test
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={NEWSLETTER_WELCOME_STYLE_7}>
              2
            </span>
            <span style={{ color: '#a16207', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Follow me on LinkedIn</strong> for daily AI marketing insights and industry updates
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={NEWSLETTER_WELCOME_STYLE_8}>
              3
            </span>
            <span style={{ color: '#a16207', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Reply to this email</strong> and tell me your biggest AI marketing challenge
            </span>
          </div>
        </div>
      </div>

      {/* Social Connect */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0277bd', fontSize: '18px' }}>
          🤝 Let's Connect Beyond Email
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#01579b', lineHeight: '1.5' }}>
          Join me on social media for real-time insights, quick tips, and industry discussions:
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="https://linkedin.com/in/jarrettstanley" style={{
            backgroundColor: '#0077b5',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Follow on LinkedIn
          </a>
          <a href="https://x.com/IAmJarrettS" style={{
            backgroundColor: '#1da1f2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Follow on Twitter
          </a>
          <a href="https://jarrettstanley.com" style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Visit Website
          </a>
        </div>
      </div>

      {/* Personal Note */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          💬 A Personal Note
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
          "I started this newsletter because I believe AI doesn't have to replace the human element 
          in marketing; it should amplify it. Every week, I share what I'm learning, testing, and 
          implementing so you can stay ahead of the curve without losing your authentic voice."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={NEWSLETTER_WELCOME_STYLE_9}>
            👨‍💼
          </div>
          <div>
            <p style={{ margin: '0', fontSize: '14px', color: '#374151', fontWeight: 'bold' }}>
              Jarrett Stanley
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>
              CMO, Nationwide Mortgage Bankers | AI Marketing Pioneer
            </p>
          </div>
        </div>
      </div>

      {/* Reply CTA */}
      <div style={{
        backgroundColor: '#f5f3ff',
        border: '2px dashed #7c3aed',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#5b21b6', fontSize: '18px' }}>
          💭 I Want to Hear from You!
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6d28d9' }}>
          What's your biggest AI marketing challenge right now? Hit reply and let me know. I read every email!
        </p>
        <a href="mailto:jarrett@jarrettstanley.com?subject=My AI Marketing Challenge" style={NEWSLETTER_WELCOME_STYLE_10}>
          📧 Send Me Your Challenge
        </a>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280' }}>
          You're receiving this because you subscribed to AI marketing insights from Jarrett Stanley
        </p>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#9ca3af' }}>
          Jarrett Stanley | jarrettstanley.com | Chicago, IL
        </p>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          <a href="https://jarrettstanley.com/newsletter/preferences" style={{ color: '#9ca3af', textDecoration: 'underline' }}>Update preferences</a> | 
          <a href="https://jarrettstanley.com/newsletter/unsubscribe" style={{ color: '#9ca3af', textDecoration: 'underline', marginLeft: '8px' }}>Unsubscribe</a>
        </p>
      </div>
    </div>);

};
