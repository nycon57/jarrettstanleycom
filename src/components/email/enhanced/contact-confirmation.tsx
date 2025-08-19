import * as React from 'react';
import {
  Section,
  Text,
  Heading,
  Link,
} from '@react-email/components';
import { EmailLayout, colors, styles } from '../components/email-layout';

interface ContactConfirmationEmailProps {
  name: string;
  type: 'general' | 'speaking' | 'consulting' | 'media';
  message: string;
}

export const ContactConfirmationEmail: React.FC<ContactConfirmationEmailProps> = ({
  name,
  type,
  message,
}) => {
  const getTypeSpecificContent = () => {
    switch (type) {
      case 'speaking':
        return {
          title: 'Your Speaking Inquiry Has Been Received',
          emoji: '🎤',
          description: 'Thank you for your interest in having Jarrett speak at your event. We\'ll review your request and get back to you with next steps.',
          responseTime: 'within 24 hours',
          nextSteps: 'Our team will review your event details and reach out to discuss topics, logistics, and availability. We\'ll also send you Jarrett\'s speaker kit with session topics and bio information.',
          priority: 'high',
        };
      case 'consulting':
        return {
          title: 'Your Consulting Inquiry Has Been Received',
          emoji: '💼',
          description: 'Thank you for considering Jarrett for your AI marketing consulting needs. We\'ll review your project requirements and schedule a discovery call.',
          responseTime: 'within 24 hours',
          nextSteps: 'We\'ll schedule a discovery call to understand your specific needs, current challenges, and discuss how our AI marketing expertise can help achieve your goals.',
          priority: 'high',
        };
      case 'media':
        return {
          title: 'Your Media Request Has Been Received',
          emoji: '📺',
          description: 'Thank you for your media inquiry. We understand the importance of meeting deadlines and will respond promptly.',
          responseTime: 'within 4 hours',
          nextSteps: 'We\'ll review your request and provide the information you need or schedule an interview at your convenience. Media kit and high-resolution photos can be sent immediately if needed.',
          priority: 'urgent',
        };
      default:
        return {
          title: 'Your Message Has Been Received',
          emoji: '✉️',
          description: 'Thank you for reaching out. We\'ve received your message and will get back to you soon.',
          responseTime: 'within 24 hours',
          nextSteps: 'We\'ll review your message and respond with the information you need or next steps.',
          priority: 'normal',
        };
    }
  };

  const content = getTypeSpecificContent();
  const previewText = `${content.title} - We'll respond ${content.responseTime}`;

  return (
    <EmailLayout previewText={previewText}>
      {/* Header */}
      <Section style={styles.header}>
        <Heading style={styles.headerTitle}>
          {content.emoji} Thank You, {name}!
        </Heading>
        <Text style={styles.headerSubtitle}>
          {content.title}
        </Text>
      </Section>

      {/* Main Content */}
      <Section style={styles.section}>
        <Text style={{
          color: colors.text.medium,
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0 0 20px 0',
        }}>
          {content.description}
        </Text>
        
        {/* Response Time Alert */}
        <Section style={
          content.priority === 'urgent' 
            ? styles.alert.warning 
            : content.priority === 'high' 
              ? styles.alert.info 
              : styles.alert.success
        }>
          <Text style={{ 
            margin: '0', 
            fontSize: '14px', 
            fontWeight: '600',
            color: content.priority === 'urgent' 
              ? '#B7791F' 
              : content.priority === 'high' 
                ? '#2B6CB0' 
                : '#2F855A'
          }}>
            ⏱️ Expected Response Time: {content.responseTime}
          </Text>
        </Section>
      </Section>

      {/* What's Next */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          What happens next?
        </Heading>
        <Text style={{
          color: colors.text.medium,
          fontSize: '15px',
          lineHeight: '1.6',
          margin: '0',
        }}>
          {content.nextSteps}
        </Text>
      </Section>

      {/* Your Message */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          Your Message:
        </Heading>
        <Section style={{
          backgroundColor: colors.background.light,
          padding: '15px',
          borderRadius: '6px',
          borderLeft: `3px solid ${colors.primary}`,
        }}>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.6',
            margin: '0',
            whiteSpace: 'pre-wrap',
          }}>
            {message}
          </Text>
        </Section>
      </Section>

      {/* About Jarrett */}
      <Section style={{
        backgroundColor: '#FFF8E1',
        border: `1px solid #FFE082`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <Heading style={{
          margin: '0 0 12px 0',
          color: '#E65100',
          fontSize: '18px',
          fontWeight: '600',
        }}>
          About Jarrett Stanley
        </Heading>
        <Text style={{
          margin: '0',
          color: '#E65100',
          fontSize: '14px',
          lineHeight: '1.5',
        }}>
          Jarrett is Chief Marketing Officer at Nationwide Mortgage Bankers and a pioneering force in AI-powered marketing. 
          He's a recognized thought leader who combines deep mortgage industry expertise with cutting-edge AI technology, 
          helping companies transform their marketing strategies and drive unprecedented growth.
        </Text>
      </Section>

      {/* Quick Actions */}
      {type !== 'media' && (
        <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Text style={{
            color: colors.text.medium,
            fontSize: '16px',
            margin: '0 0 15px 0',
          }}>
            While you wait, explore more:
          </Text>
          <Section>
            <Link href="https://jarrettstanley.com/insights" style={{
              ...styles.button,
              marginRight: '10px',
              marginBottom: '10px',
            }}>
              Latest Insights
            </Link>
            <Link href="https://jarrettstanley.com/speaking" style={{
              ...styles.buttonSecondary,
              marginLeft: '10px',
              marginBottom: '10px',
            }}>
              Speaking Topics
            </Link>
          </Section>
        </Section>
      )}

      {/* Urgent Media Response Info */}
      {type === 'media' && (
        <Section style={{
          backgroundColor: '#FFF3CD',
          border: `1px solid #FFEAA7`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <Text style={{
            margin: '0 0 10px 0',
            color: '#856404',
            fontSize: '16px',
            fontWeight: '600',
          }}>
            🚨 Priority Media Response
          </Text>
          <Text style={{
            margin: '0',
            color: '#856404',
            fontSize: '14px',
            lineHeight: '1.5',
          }}>
            For urgent requests or last-minute interviews, you can reach us directly at{' '}
            <Link href="mailto:jarrett@jarrettstanley.com" style={{ color: colors.primary }}>
              jarrett@jarrettstanley.com
            </Link>{' '}
            or call/text for immediate response. Media kit and photos available upon request.
          </Text>
        </Section>
      )}
    </EmailLayout>
  );
};