import * as React from 'react';

interface ResourceDownloadEmailProps {
  firstName: string;
  resourceTitle: string;
  downloadUrl: string;
}

export const ResourceDownloadEmail: React.FC<Readonly<ResourceDownloadEmailProps>> = ({
  firstName,
  resourceTitle,
  downloadUrl,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>📥 Your Download is Ready!</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            {resourceTitle}
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#166534', marginTop: '0', fontSize: '22px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#15803d', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for downloading "{resourceTitle}". I'm excited to share this valuable resource 
          that will help you leverage AI to transform your marketing efforts.
        </p>
        <p style={{ color: '#15803d', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          This resource represents insights from my experience as CMO at Nationwide Mortgage Bankers 
          and creator of TrueTone AI.
        </p>
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center', backgroundColor: '#fff', border: '2px solid #16a34a', borderRadius: '12px', padding: '30px', marginBottom: '25px' }}>
        <h2 style={{ color: '#166534', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📄 Access Your Resource
        </h2>
        <a href={downloadUrl} style={{
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'inline-block',
          boxShadow: '0 4px 12px rgba(22, 101, 52, 0.3)'
        }}>
          🔽 Download Now
        </a>
        <p style={{ margin: '15px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
          This link is valid for 30 days. Save the file to your device for permanent access.
        </p>
      </div>

      {/* What's Inside */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          🎯 What You'll Discover
        </h2>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16a34a', fontSize: '16px', marginTop: '2px' }}>✓</span>
            <span style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              Proven strategies for implementing AI in your marketing workflow
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16a34a', fontSize: '16px', marginTop: '2px' }}>✓</span>
            <span style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              Real-world case studies from successful AI marketing campaigns
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16a34a', fontSize: '16px', marginTop: '2px' }}>✓</span>
            <span style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              Step-by-step implementation guides and actionable frameworks
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#16a34a', fontSize: '16px', marginTop: '2px' }}>✓</span>
            <span style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              Tools and resources to get started immediately
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0277bd', fontSize: '18px' }}>
          🚀 Ready for More?
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#01579b', lineHeight: '1.5' }}>
          This resource is just the beginning. Here are some ways to dive deeper into AI-powered marketing:
        </p>
        <div style={{ display: 'grid', gap: '10px' }}>
          <a href="https://jarrettstanley.com/resources" style={{
            backgroundColor: '#0277bd',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            📚 Explore More Resources
          </a>
          <a href="https://jarrettstanley.com/services/consulting" style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            💼 Learn About Consulting Services
          </a>
          <a href="https://jarrettstanley.com/speaking" style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            🎤 Book Jarrett for Speaking
          </a>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#92400e', fontSize: '18px' }}>
          📧 Stay Updated on AI Marketing
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#a16207', fontSize: '14px', lineHeight: '1.5' }}>
          Get weekly insights on AI-powered marketing, industry trends, and exclusive resources 
          delivered straight to your inbox.
        </p>
        <a href="https://jarrettstanley.com/newsletter" style={{
          backgroundColor: '#f59e0b',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          Subscribe to Newsletter
        </a>
      </div>

      {/* Share */}
      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#475569', fontSize: '18px' }}>
          🔗 Found This Valuable?
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
          Help your colleagues discover AI-powered marketing strategies by sharing this resource.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://jarrettstanley.com/resources')}&title=${encodeURIComponent('AI Marketing Resource: ' + resourceTitle)}`} style={{
            backgroundColor: '#0077b5',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '12px'
          }}>
            Share on LinkedIn
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Just downloaded this valuable AI marketing resource: ' + resourceTitle)}&url=${encodeURIComponent('https://jarrettstanley.com/resources')}&via=jarrettstanley`} style={{
            backgroundColor: '#1da1f2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '12px'
          }}>
            Share on Twitter
          </a>
          <a href={`mailto:?subject=${encodeURIComponent('AI Marketing Resource: ' + resourceTitle)}&body=${encodeURIComponent('I thought you might find this AI marketing resource valuable: ' + resourceTitle + '\n\nDownload it here: https://jarrettstanley.com/resources')}`} style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '12px'
          }}>
            Share via Email
          </a>
        </div>
      </div>

      {/* Support */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>
          🤝 Need Help Implementing These Strategies?
        </h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
          Have questions about implementing AI in your marketing? Want to discuss how these 
          strategies could work for your specific situation?
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="mailto:jarrett@jarrettstanley.com?subject=Question about AI Marketing Resource" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Ask a Question
          </a>
          <a href="https://calendly.com/jarrettstanley/consultation" style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Schedule Consultation
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280' }}>
          <strong>Jarrett Stanley</strong><br />
          Chief Marketing Officer, Nationwide Mortgage Bankers<br />
          Creator, TrueTone AI
        </p>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          This email was sent because you downloaded a resource from jarrettstanley.com
        </p>
      </div>
    </div>
  );
};