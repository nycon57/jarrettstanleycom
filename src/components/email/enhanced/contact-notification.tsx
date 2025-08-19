import * as React from 'react';
import {
  Section,
  Text,
  Heading,
  Link,
} from '@react-email/components';
import { EmailLayout, colors, styles } from '../components/email-layout';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  message: string;
  type?: 'general' | 'speaking' | 'consulting' | 'media';
  company?: string;
  phone?: string;
}

export const ContactNotificationEmail: React.FC<ContactNotificationEmailProps> = ({
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
      case 'speaking': return colors.success;
      case 'consulting': return colors.info;
      case 'media': return colors.warning;
      default: return colors.text.medium;
    }
  };

  const getTypeEmoji = () => {
    switch (type) {
      case 'speaking': return '🎤';
      case 'consulting': return '💼';
      case 'media': return '📺';
      default: return '📧';
    }
  };

  const getPriorityAlert = () => {
    switch (type) {
      case 'media':
        return {
          message: '⚡ URGENT: Media request - respond within 4 hours',
          style: styles.alert.warning,
          color: '#B7791F'
        };
      case 'speaking':
        return {
          message: '🎤 Speaking inquiry - respond within 24 hours',
          style: styles.alert.info,
          color: '#2B6CB0'
        };
      case 'consulting':
        return {
          message: '💼 Consulting lead - respond within 24 hours',
          style: styles.alert.info,
          color: '#2B6CB0'
        };
      default:
        return {
          message: '📧 General inquiry - respond within 24 hours',
          style: styles.alert.success,
          color: '#2F855A'
        };
    }
  };

  const priority = getPriorityAlert();
  const previewText = `New ${getTypeLabel()} from ${name} (${email})`;

  return (
    <EmailLayout previewText={previewText}>
      {/* Header */}
      <Section style={{
        ...styles.header,
        backgroundColor: getTypeColor(),
      }}>
        <Heading style={styles.headerTitle}>
          {getTypeEmoji()} New {getTypeLabel()}
        </Heading>
        <Text style={styles.headerSubtitle}>
          From: {name}
        </Text>
      </Section>

      {/* Priority Alert */}
      <Section style={priority.style}>
        <Text style={{
          margin: '0',
          fontSize: '14px',
          fontWeight: '600',
          color: priority.color,
        }}>
          {priority.message}
        </Text>
      </Section>

      {/* Contact Information */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 20px 0',
        }}>
          Contact Information
        </Heading>
        
        <Section style={{ marginBottom: '15px' }}>
          <Text style={{
            display: 'inline-block',
            minWidth: '80px',
            fontWeight: '600',
            color: colors.text.medium,
            margin: '0 10px 0 0',
            fontSize: '14px',
          }}>
            Name:
          </Text>
          <Text style={{
            display: 'inline-block',
            color: colors.text.dark,
            margin: '0',
            fontSize: '14px',
          }}>
            {name}
          </Text>
        </Section>

        <Section style={{ marginBottom: '15px' }}>
          <Text style={{
            display: 'inline-block',
            minWidth: '80px',
            fontWeight: '600',
            color: colors.text.medium,
            margin: '0 10px 0 0',
            fontSize: '14px',
          }}>
            Email:
          </Text>
          <Link href={`mailto:${email}`} style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '14px',
          }}>
            {email}
          </Link>
        </Section>

        {phone && (
          <Section style={{ marginBottom: '15px' }}>
            <Text style={{
              display: 'inline-block',
              minWidth: '80px',
              fontWeight: '600',
              color: colors.text.medium,
              margin: '0 10px 0 0',
              fontSize: '14px',
            }}>
              Phone:
            </Text>
            <Link href={`tel:${phone}`} style={{
              color: colors.primary,
              textDecoration: 'none',
              fontSize: '14px',
            }}>
              {phone}
            </Link>
          </Section>
        )}

        {company && (
          <Section style={{ marginBottom: '15px' }}>
            <Text style={{
              display: 'inline-block',
              minWidth: '80px',
              fontWeight: '600',
              color: colors.text.medium,
              margin: '0 10px 0 0',
              fontSize: '14px',
            }}>
              Company:
            </Text>
            <Text style={{
              display: 'inline-block',
              color: colors.text.dark,
              margin: '0',
              fontSize: '14px',
            }}>
              {company}
            </Text>
          </Section>
        )}

        <Section style={{ marginBottom: '0' }}>
          <Text style={{
            display: 'inline-block',
            minWidth: '80px',
            fontWeight: '600',
            color: colors.text.medium,
            margin: '0 10px 0 0',
            fontSize: '14px',
          }}>
            Type:
          </Text>
          <Text style={{
            backgroundColor: getTypeColor(),
            color: colors.background.white,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'inline-block',
            margin: '0',
          }}>
            {getTypeLabel()}
          </Text>
        </Section>
      </Section>

      {/* Message */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          Message
        </Heading>
        <Section style={{
          backgroundColor: colors.background.light,
          padding: '20px',
          borderRadius: '6px',
          borderLeft: `4px solid ${getTypeColor()}`,
        }}>
          <Text style={{
            color: colors.text.medium,
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0',
            whiteSpace: 'pre-wrap',
          }}>
            {message}
          </Text>
        </Section>
      </Section>

      {/* Quick Actions */}
      <Section style={{
        backgroundColor: '#E3F2FD',
        border: `1px solid #90CAF9`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <Heading style={{
          color: '#1565C0',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          Quick Actions
        </Heading>
        <Section style={{ textAlign: 'center' }}>
          <Link href={`mailto:${email}?subject=Re: Your ${getTypeLabel()}`} style={{
            ...styles.button,
            backgroundColor: '#1976D2',
            marginRight: '10px',
            marginBottom: '10px',
          }}>
            Reply via Email
          </Link>
          
          {phone && (
            <Link href={`tel:${phone}`} style={{
              ...styles.button,
              backgroundColor: colors.success,
              marginRight: '10px',
              marginBottom: '10px',
            }}>
              Call Now
            </Link>
          )}
          
          <Link href="https://jarrettstanley.com/admin" style={{
            ...styles.buttonSecondary,
            borderColor: '#1976D2',
            color: '#1976D2',
            marginBottom: '10px',
          }}>
            View in CRM
          </Link>
        </Section>
      </Section>

      {/* Contact Analytics */}
      <Section style={{
        backgroundColor: colors.background.light,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 10px 0',
        }}>
          📊 Contact Details
        </Heading>
        <Section>
          <Text style={{ margin: '0 0 5px 0', fontSize: '12px', color: colors.text.light }}>
            <strong>Received:</strong> {new Date().toLocaleString('en-US', {
              timeZone: 'America/Chicago',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </Text>
          <Text style={{ margin: '0 0 5px 0', fontSize: '12px', color: colors.text.light }}>
            <strong>Message Length:</strong> {message.length} characters
          </Text>
          <Text style={{ margin: '0', fontSize: '12px', color: colors.text.light }}>
            <strong>Contact Method:</strong> Website Form
          </Text>
        </Section>
      </Section>

      {/* Response Templates */}
      {type !== 'general' && (
        <Section style={styles.card}>
          <Heading style={{
            color: colors.text.dark,
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 15px 0',
          }}>
            💬 Quick Response Templates
          </Heading>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0 0 10px 0',
          }}>
            Use these templates for faster responses:
          </Text>
          <Section style={{ textAlign: 'center' }}>
            <Link href={`https://jarrettstanley.com/templates/${type}-response`} style={{
              ...styles.buttonSecondary,
              marginRight: '10px',
              marginBottom: '10px',
            }}>
              Response Templates
            </Link>
            <Link href={`https://calendly.com/jarrettstanley/${type}-call`} style={{
              ...styles.button,
              marginBottom: '10px',
            }}>
              Schedule Call
            </Link>
          </Section>
        </Section>
      )}
    </EmailLayout>
  );
};