import * as React from 'react';

interface ConsultingNotificationEmailProps {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company: string;
  role: string;
  company_size: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  current_challenges: string;
  preferred_contact_method: string;
}

export const ConsultingNotificationEmail: React.FC<Readonly<ConsultingNotificationEmailProps>> = ({
  first_name,
  last_name,
  email,
  phone,
  company,
  role,
  company_size,
  budget_range,
  timeline,
  project_description,
  current_challenges,
  preferred_contact_method,
}) => {
  const getBudgetPriority = () => {
    if (budget_range.includes('$500k+') || budget_range.includes('$250k-$500k')) return 'high';
    if (budget_range.includes('$100k-$250k')) return 'medium';
    return 'standard';
  };

  const getTimelinePriority = () => {
    if (timeline === 'Immediate') return 'urgent';
    if (timeline === '1-3 months') return 'high';
    return 'normal';
  };

  const budgetPriority = getBudgetPriority();
  const timelinePriority = getTimelinePriority();
  const overallPriority = budgetPriority === 'high' && timelinePriority === 'urgent' ? 'critical' : 
                         budgetPriority === 'high' || timelinePriority === 'urgent' ? 'high' : 
                         budgetPriority === 'medium' ? 'medium' : 'standard';

  const priorityColor = overallPriority === 'critical' ? '#dc2626' : 
                       overallPriority === 'high' ? '#ea580c' :
                       overallPriority === 'medium' ? '#d97706' : '#16a34a';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px' 
        }}>
          <h1 style={{ margin: '0', fontSize: '24px' }}>💼 New Consulting Inquiry</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>
            {company} • {first_name} {last_name}
          </p>
        </div>
      </div>

      {/* Priority Banner */}
      <div style={{ 
        backgroundColor: overallPriority === 'critical' ? '#fee2e2' : 
                        overallPriority === 'high' ? '#fed7aa' :
                        overallPriority === 'medium' ? '#fef3c7' : '#dcfce7',
        border: `3px solid ${priorityColor}`,
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <p style={{ 
          margin: '0', 
          color: priorityColor, 
          fontSize: '18px', 
          fontWeight: 'bold' 
        }}>
          {overallPriority === 'critical' ? '🚨 CRITICAL PRIORITY' : 
           overallPriority === 'high' ? '🔥 HIGH PRIORITY' : 
           overallPriority === 'medium' ? '⭐ MEDIUM PRIORITY' : 
           '✅ STANDARD INQUIRY'}
        </p>
        <p style={{ 
          margin: '5px 0 0 0', 
          color: priorityColor, 
          fontSize: '14px'
        }}>
          Budget: {budget_range} • Timeline: {timeline}
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
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Company:</strong>
            <span style={{ color: '#111827' }}>{company}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Role:</strong>
            <span style={{ color: '#111827' }}>{role}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', marginRight: '8px' }}>Preferred Contact:</strong>
            <span style={{ 
              backgroundColor: '#e0f2fe',
              color: '#0277bd',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              {preferred_contact_method}
            </span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '20px' }}>
          📊 Project Details
        </h2>
        
        <div style={{ display: 'grid', gap: '15px' }}>
          <div>
            <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Company Size:</strong>
            <span style={{ color: '#111827' }}>{company_size}</span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Budget Range:</strong>
            <span style={{ 
              backgroundColor: priorityColor,
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {budget_range}
            </span>
          </div>
          
          <div>
            <strong style={{ color: '#6b7280', display: 'block', marginBottom: '4px' }}>Timeline:</strong>
            <span style={{ 
              backgroundColor: timelinePriority === 'urgent' ? '#dc2626' : 
                             timelinePriority === 'high' ? '#ea580c' : '#16a34a',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {timeline}
            </span>
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
          🎯 Project Description
        </h2>
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '20px', 
          borderRadius: '6px', 
          borderLeft: '4px solid #3b82f6'
        }}>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
            {project_description}
          </p>
        </div>
      </div>

      {/* Current Challenges */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '25px', marginBottom: '25px' }}>
        <h2 style={{ color: '#374151', marginTop: '0', fontSize: '20px', marginBottom: '15px' }}>
          🚧 Current Challenges
        </h2>
        <div style={{ 
          backgroundColor: '#fef2f2', 
          padding: '20px', 
          borderRadius: '6px', 
          borderLeft: '4px solid #ef4444'
        }}>
          <p style={{ color: '#7f1d1d', fontSize: '16px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
            {current_challenges}
          </p>
        </div>
      </div>

      {/* Opportunity Analysis */}
      <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#166534', fontSize: '18px' }}>
          💡 Opportunity Assessment
        </h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: budgetPriority === 'high' ? '#dc2626' : budgetPriority === 'medium' ? '#f59e0b' : '#22c55e', fontSize: '16px' }}>
              {budgetPriority === 'high' ? '🔥' : budgetPriority === 'medium' ? '⭐' : '✅'}
            </span>
            <span style={{ color: '#166534', fontSize: '14px' }}>
              Budget Fit: {budgetPriority === 'high' ? 'Excellent' : budgetPriority === 'medium' ? 'Good' : 'Standard'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: timelinePriority === 'urgent' ? '#dc2626' : timelinePriority === 'high' ? '#f59e0b' : '#22c55e', fontSize: '16px' }}>
              {timelinePriority === 'urgent' ? '⚡' : timelinePriority === 'high' ? '🔥' : '✅'}
            </span>
            <span style={{ color: '#166534', fontSize: '14px' }}>
              Timeline Urgency: {timelinePriority === 'urgent' ? 'Immediate' : timelinePriority === 'high' ? 'High' : 'Normal'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: company_size.includes('500+') ? '#dc2626' : company_size.includes('200') ? '#f59e0b' : '#22c55e', fontSize: '16px' }}>
              🏢
            </span>
            <span style={{ color: '#166534', fontSize: '14px' }}>
              Company Size: {company_size} - {company_size.includes('500+') ? 'Enterprise' : company_size.includes('200') ? 'Mid-Market' : 'SMB'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#e0f2fe', border: '1px solid #81d4fa', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
        <h3 style={{ color: '#0277bd', marginTop: '0', fontSize: '18px', marginBottom: '15px' }}>
          ⚡ Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <a href={`mailto:${email}?subject=Re: Your Consulting Inquiry - ${company}&body=Hi ${first_name},%0D%0A%0D%0AThank you for reaching out about your AI marketing consulting needs. I'm excited about the opportunity to help ${company} transform your marketing with artificial intelligence.%0D%0A%0D%0ABased on your inquiry, I see significant potential to address your current challenges and achieve your goals within your ${timeline.toLowerCase()} timeline.%0D%0A%0D%0AI'd love to schedule a discovery call to discuss:%0D%0A- Your specific goals and success metrics%0D%0A- Current marketing challenges and pain points%0D%0A- How AI can be strategically implemented in your organization%0D%0A- A customized approach for your ${budget_range} investment range%0D%0A%0D%0AWould you be available for a 45-minute discovery call this week? I have openings on [insert availability].%0D%0A%0D%0AAlternatively, you can schedule directly using this link: https://calendly.com/jarrettstanley/consulting-discovery%0D%0A%0D%0ABest regards,%0D%0AJarrett Stanley%0D%0ACMO, Nationwide Mortgage Bankers%0D%0ACreator, TrueTone AI`} style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Reply with Template
          </a>
          
          <a href={`mailto:${email}?subject=Re: Your Consulting Inquiry`} style={{
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
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="https://calendly.com/jarrettstanley/consulting-discovery" style={{
            backgroundColor: '#7b1fa2',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px'
          }}>
            Send Calendly Link
          </a>
          
          <a href="https://jarrettstanley.com/admin/consulting-leads" style={{
            backgroundColor: '#6b7280',
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

      {/* Response Timeline */}
      <div style={{ 
        backgroundColor: overallPriority === 'critical' ? '#fee2e2' : '#fff3cd', 
        border: `1px solid ${overallPriority === 'critical' ? '#fecaca' : '#ffeaa7'}`, 
        borderRadius: '8px', 
        padding: '15px',
        marginBottom: '25px'
      }}>
        <p style={{ 
          margin: '0', 
          color: overallPriority === 'critical' ? '#b91c1c' : '#856404', 
          fontSize: '14px', 
          fontWeight: 'bold' 
        }}>
          ⏰ Response Target: {overallPriority === 'critical' ? 'IMMEDIATE - Respond within 2 hours!' : 
                              overallPriority === 'high' ? 'Within 4 hours' : 
                              'Within 24 hours'}
        </p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
          Consulting inquiry submitted via jarrettstanley.com
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