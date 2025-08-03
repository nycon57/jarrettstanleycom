import * as React from 'react';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
  type?: 'general' | 'speaking' | 'consulting' | 'media';
  company?: string;
  phone?: string;
}

export const ContactNotificationEmail: React.FC<Readonly<ContactNotificationEmailProps>> = ({
  name,
  email,
  message,
  type = 'general',
  company,
  phone,
}) => {
  const getTypeLabel = () => {
    switch (type) {
      case 'speaking': return 'Speaking Inquiry';
      case 'consulting': return 'Consulting Inquiry';
      case 'media': return 'Media Request';
      default: return 'General Contact';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'speaking': return '#22c55e';
      case 'consulting': return '#3b82f6';
      case 'media': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          backgroundColor: getTypeColor(), 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>New {getTypeLabel()}</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>
            From: {name}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          Contact Information
        </h2>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ color: '#555', minWidth: '80px' }}>Name:</strong>
            <span style={{ color: '#333' }}>{name}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ color: '#555', minWidth: '80px' }}>Email:</strong>
            <a href={`mailto:${email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
              {email}
            </a>
          </div>
          
          {phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ color: '#555', minWidth: '80px' }}>Phone:</strong>
              <a href={`tel:${phone}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                {phone}
              </a>
            </div>
          )}
          
          {company && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong style={{ color: '#555', minWidth: '80px' }}>Company:</strong>
              <span style={{ color: '#333' }}>{company}</span>
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ color: '#555', minWidth: '80px' }}>Type:</strong>
            <span style={{ 
              backgroundColor: getTypeColor(), 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '12px' 
            }}>
              {getTypeLabel()}
            </span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
          Message
        </h2>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '6px', 
          borderLeft: '4px solid ' + getTypeColor()
        }}>
          <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
            {message}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#e3f2fd', border: '1px solid #90caf9', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ color: '#1565c0', marginTop: '0', fontSize: '18px', marginBottom: '15px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}?subject=Re: Your ${getTypeLabel()}`} style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Reply via Email
          </a>
          
          {phone && (
            <a href={`tel:${phone}`} style={{
              backgroundColor: '#388e3c',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Call Now
            </a>
          )}
          
          <a href="https://jarrettstanley.com/admin" style={{
            backgroundColor: '#7b1fa2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            View in CRM
          </a>
        </div>
      </div>

      {/* Response Priority */}
      <div style={{ 
        backgroundColor: type === 'media' ? '#fff3cd' : '#d4edda', 
        border: `1px solid ${type === 'media' ? '#ffeaa7' : '#c3e6cb'}`, 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{ 
          margin: '0', 
          color: type === 'media' ? '#856404' : '#155724', 
          fontSize: '14px', 
          fontWeight: 'bold' 
        }}>
          {type === 'media' ? '⚡ URGENT: Media request - respond within 4 hours' : 
           type === 'speaking' ? '🎤 Speaking inquiry - respond within 24 hours' :
           type === 'consulting' ? '💼 Consulting lead - respond within 24 hours' :
           '📧 General inquiry - respond within 24 hours'}
        </p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e9ecef' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          This notification was sent from the JarrettStanley.com contact form.
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
          Sent at {new Date().toLocaleString('en-US', { 
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