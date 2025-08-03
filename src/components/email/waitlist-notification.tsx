import * as React from 'react';

interface WaitlistNotificationEmailProps {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  ipAddress?: string;
  userAgent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  signupDate: string;
}

export const WaitlistNotificationEmail: React.FC<Readonly<WaitlistNotificationEmailProps>> = ({
  firstName,
  lastName,
  email,
  company,
  ipAddress,
  userAgent,
  utmSource,
  utmMedium,
  utmCampaign,
  signupDate,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '24px' }}>
          🎉 New TrueTone AI Waitlist Signup!
        </h1>
        <p style={{ color: '#666', margin: '0', fontSize: '16px' }}>
          Someone just joined the beta waitlist
        </p>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', borderBottom: '2px solid #7c3aed', paddingBottom: '10px' }}>
          Contact Information
        </h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333', width: '30%' }}>Name:</td>
            <td style={{ padding: '8px 0', color: '#666' }}>
              {firstName} {lastName || ''}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Email:</td>
            <td style={{ padding: '8px 0', color: '#666' }}>
              <a href={`mailto:${email}`} style={{ color: '#7c3aed', textDecoration: 'none' }}>
                {email}
              </a>
            </td>
          </tr>
          {company && (
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Company:</td>
              <td style={{ padding: '8px 0', color: '#666' }}>{company}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Signup Date:</td>
            <td style={{ padding: '8px 0', color: '#666' }}>{signupDate}</td>
          </tr>
        </table>
      </div>

      {(utmSource || utmMedium || utmCampaign) && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', borderBottom: '2px solid #7c3aed', paddingBottom: '10px' }}>
            📊 Marketing Attribution
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            {utmSource && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333', width: '30%' }}>Source:</td>
                <td style={{ padding: '8px 0', color: '#666' }}>{utmSource}</td>
              </tr>
            )}
            {utmMedium && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Medium:</td>
                <td style={{ padding: '8px 0', color: '#666' }}>{utmMedium}</td>
              </tr>
            )}
            {utmCampaign && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Campaign:</td>
                <td style={{ padding: '8px 0', color: '#666' }}>{utmCampaign}</td>
              </tr>
            )}
          </table>
        </div>
      )}

      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', borderBottom: '2px solid #7c3aed', paddingBottom: '10px' }}>
          🔍 Technical Details
        </h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {ipAddress && (
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333', width: '30%' }}>IP Address:</td>
              <td style={{ padding: '8px 0', color: '#666', fontSize: '14px' }}>{ipAddress}</td>
            </tr>
          )}
          {userAgent && (
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333', verticalAlign: 'top' }}>User Agent:</td>
              <td style={{ padding: '8px 0', color: '#666', fontSize: '12px', wordBreak: 'break-all' }}>
                {userAgent}
              </td>
            </tr>
          )}
        </table>
      </div>

      <div style={{ backgroundColor: '#7c3aed', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          🚀 <strong>Action Required:</strong> Follow up with this lead to maximize conversion!
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999' }}>
        <p>This notification was sent automatically by TrueTone AI waitlist system.</p>
      </div>
    </div>
  );
}; 