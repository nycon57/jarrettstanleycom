import * as React from 'react';
import {
  Section,
  Text,
  Heading,
  Link,
} from '@react-email/components';
import { EmailLayout, colors, styles } from '../components/email-layout';

interface NewsletterWelcomeEmailProps {
  firstName: string;
}

export const NewsletterWelcomeEmail: React.FC<NewsletterWelcomeEmailProps> = ({
  firstName,
}) => {
  const previewText = `Welcome to the AI Marketing Revolution, ${firstName}!`;

  return (
    <EmailLayout previewText={previewText}>
      {/* Header */}
      <Section style={styles.header}>
        <Heading style={styles.headerTitle}>
          🚀 Welcome to the AI Marketing Revolution!
        </Heading>
        <Text style={styles.headerSubtitle}>
          Hi {firstName}, you're now part of an exclusive community
        </Text>
      </Section>

      {/* Welcome Message */}
      <Section style={styles.section}>
        <Text style={{
          color: colors.text.medium,
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 20px 0',
          fontWeight: '500',
        }}>
          Welcome to the future of mortgage marketing! 🎯
        </Text>
        
        <Text style={{
          color: colors.text.medium,
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0 0 20px 0',
        }}>
          You've just joined an exclusive community of mortgage professionals who are ahead of the curve 
          on AI-powered marketing strategies. As Chief Marketing Officer at Nationwide Mortgage Bankers, 
          I've seen firsthand how AI can transform marketing results.
        </Text>

        <Text style={{
          color: colors.text.medium,
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0',
        }}>
          Here's what you can expect in your inbox:
        </Text>
      </Section>

      {/* What to Expect */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 20px 0',
        }}>
          📬 What You'll Receive
        </Heading>
        
        <Section style={{ marginBottom: '20px' }}>
          <Text style={{
            color: colors.primary,
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 5px 0',
          }}>
            🧠 AI Marketing Insights
          </Text>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0',
          }}>
            Weekly deep-dives into AI tools and strategies that are actually working in mortgage marketing
          </Text>
        </Section>

        <Section style={{ marginBottom: '20px' }}>
          <Text style={{
            color: colors.primary,
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 5px 0',
          }}>
            📊 Real Results & Case Studies
          </Text>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0',
          }}>
            Behind-the-scenes look at campaigns that generated real ROI and lead conversion
          </Text>
        </Section>

        <Section style={{ marginBottom: '20px' }}>
          <Text style={{
            color: colors.primary,
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 5px 0',
          }}>
            🔧 Practical Implementation Tips
          </Text>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0',
          }}>
            Step-by-step guides you can implement immediately to improve your marketing results
          </Text>
        </Section>

        <Section style={{ marginBottom: '0' }}>
          <Text style={{
            color: colors.primary,
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 5px 0',
          }}>
            🎯 Industry Trend Analysis
          </Text>
          <Text style={{
            color: colors.text.medium,
            fontSize: '14px',
            lineHeight: '1.5',
            margin: '0',
          }}>
            Exclusive insights on where mortgage marketing is heading and how to stay ahead
          </Text>
        </Section>
      </Section>

      {/* First Action */}
      <Section style={{
        backgroundColor: '#F0FFF4',
        border: `1px solid #9AE6B4`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <Heading style={{
          color: colors.success,
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          🎯 Start Here: Your First AI Win
        </Heading>
        <Text style={{
          color: colors.success,
          fontSize: '15px',
          lineHeight: '1.6',
          margin: '0 0 15px 0',
        }}>
          Want to see immediate results? Download our free AI Marketing Toolkit that includes 
          the exact prompts and frameworks I use to generate high-converting marketing content.
        </Text>
        <Section style={{ textAlign: 'center' }}>
          <Link href="https://jarrettstanley.com/resources/ai-marketing-toolkit" style={{
            ...styles.button,
            backgroundColor: colors.success,
          }}>
            Download Free AI Toolkit
          </Link>
        </Section>
      </Section>

      {/* Latest Content */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          📚 Recent Insights You Might Have Missed
        </Heading>
        
        <Section style={{ marginBottom: '15px' }}>
          <Link href="https://jarrettstanley.com/insights/ai-personalization-mortgage-marketing" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
          }}>
            How AI Personalization Increased Our Loan Applications by 340%
          </Link>
          <Text style={{
            color: colors.text.light,
            fontSize: '13px',
            margin: '5px 0 0 0',
          }}>
            A deep dive into the exact AI personalization strategy we used
          </Text>
        </Section>

        <Section style={{ marginBottom: '15px' }}>
          <Link href="https://jarrettstanley.com/insights/chatgpt-mortgage-content" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
          }}>
            The ChatGPT Prompts That Write Better Mortgage Content Than Humans
          </Link>
          <Text style={{
            color: colors.text.light,
            fontSize: '13px',
            margin: '5px 0 0 0',
          }}>
            Copy-paste prompts that generate high-converting mortgage content
          </Text>
        </Section>

        <Section style={{ marginBottom: '0' }}>
          <Link href="https://jarrettstanley.com/insights/ai-lead-scoring" style={{
            color: colors.primary,
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
          }}>
            AI Lead Scoring: How We Identify Hot Prospects 10x Faster
          </Link>
          <Text style={{
            color: colors.text.light,
            fontSize: '13px',
            margin: '5px 0 0 0',
          }}>
            The AI framework that revolutionized our sales pipeline
          </Text>
        </Section>
      </Section>

      {/* Connect Section */}
      <Section style={styles.card}>
        <Heading style={{
          color: colors.text.dark,
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 15px 0',
        }}>
          🤝 Let's Connect
        </Heading>
        <Text style={{
          color: colors.text.medium,
          fontSize: '15px',
          lineHeight: '1.6',
          margin: '0 0 15px 0',
        }}>
          I love connecting with fellow mortgage professionals who are as excited about AI as I am. 
          Feel free to reach out with questions, ideas, or just to share what's working for you.
        </Text>
        <Section style={{ textAlign: 'center' }}>
          <Link href="https://linkedin.com/in/jarrettstanley" style={{
            ...styles.button,
            backgroundColor: '#0077B5',
            marginRight: '10px',
            marginBottom: '10px',
          }}>
            Connect on LinkedIn
          </Link>
          <Link href="mailto:jarrett@jarrettstanley.com" style={{
            ...styles.buttonSecondary,
            marginBottom: '10px',
          }}>
            Email Me Directly
          </Link>
        </Section>
      </Section>

      {/* P.S. Section */}
      <Section style={{
        backgroundColor: colors.background.light,
        padding: '20px',
        borderRadius: '8px',
        borderLeft: `4px solid ${colors.primary}`,
        marginBottom: '20px',
      }}>
        <Text style={{
          color: colors.text.medium,
          fontSize: '14px',
          lineHeight: '1.6',
          margin: '0',
          fontStyle: 'italic',
        }}>
          <strong>P.S.</strong> If you ever want to chat about 
          AI marketing strategy, speaking opportunities, or consulting for your organization, 
          just reply to any email. I read every single one personally.
        </Text>
      </Section>

      {/* Preferences */}
      <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Text style={{
          color: colors.text.light,
          fontSize: '12px',
          margin: '0 0 10px 0',
        }}>
          Want to manage your preferences?
        </Text>
        <Link href="https://jarrettstanley.com/newsletter/preferences" style={{
          color: colors.primary,
          fontSize: '12px',
          textDecoration: 'none',
        }}>
          Update Email Preferences
        </Link>
        <Text style={{ color: colors.text.light, fontSize: '12px', margin: '0' }}>
          {' | '}
          <Link href="https://jarrettstanley.com/newsletter/unsubscribe" style={{
            color: colors.text.light,
            fontSize: '12px',
            textDecoration: 'none',
          }}>
            Unsubscribe
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
};