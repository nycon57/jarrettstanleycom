import * as React from 'react';

interface WaitlistConfirmationEmailProps {
  firstName: string;
}

export const WaitlistConfirmationEmail: React.FC<Readonly<WaitlistConfirmationEmailProps>> = ({
  firstName,
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#7c3aed', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <h1 style={{ margin: '0', fontSize: '28px' }}>🎉 Welcome to TrueTone AI!</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: '0.9' }}>
            You're officially on the beta waitlist
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '22px' }}>
          Hi {firstName}! 👋
        </h2>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          Thank you for joining the TrueTone AI beta waitlist! You're now part of an exclusive group 
          that will get early access to revolutionary AI technology that captures your unique voice 
          and creates authentic marketing content.
        </p>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
          We're working hard to bring you something amazing, and you'll be among the first to experience it.
        </p>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          🚀 What happens next?
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#7c3aed', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 }}>
              1
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                Beta Development Updates
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                We'll keep you informed about our progress with exclusive behind-the-scenes updates.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#7c3aed', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 }}>
              2
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                Early Access Invitation
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                You'll receive priority access to try TrueTone AI before anyone else.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#7c3aed', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 }}>
              3
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                Exclusive Beta Pricing
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                Get special launch pricing as a thank you for believing in us early.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '18px' }}>
          💡 In the meantime...
        </h3>
        <p style={{ margin: '0', color: '#856404', fontSize: '14px', lineHeight: '1.5' }}>
          Follow us on social media for the latest updates, or reach out if you have any questions. 
          We love hearing from our community!
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div style={{ backgroundColor: '#7c3aed', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
            🔥 You're in position #<span style={{ fontSize: '20px' }}>∞</span> on the waitlist!
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
            (We're keeping the exact number a surprise, but you're definitely early!)
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e9ecef' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
          This email was sent to you because you signed up for the TrueTone AI beta waitlist.
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
          TrueTone AI | Building the future of authentic marketing
        </p>
      </div>
    </div>
  );
}; 