import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components';

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

// Branded color palette
export const colors = {
  primary: '#9D7AD6',
  primaryDark: '#7C5DB8',
  secondary: '#B794F6',
  text: {
    dark: '#2D3748',
    medium: '#4A5568',
    light: '#718096',
  },
  background: {
    white: '#FFFFFF',
    light: '#F7FAFC',
    purple: '#EDF2F7',
  },
  border: '#E2E8F0',
  success: '#38A169',
  warning: '#D69E2E',
  danger: '#E53E3E',
  info: '#3182CE',
};

// Common styles
export const styles = {
  container: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: colors.background.white,
  },
  header: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: colors.background.white,
    padding: '30px 25px',
    borderRadius: '8px 8px 0 0',
    textAlign: 'center' as const,
  },
  headerTitle: {
    margin: '0',
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '1.2',
  },
  headerSubtitle: {
    margin: '8px 0 0 0',
    fontSize: '16px',
    opacity: '0.9',
    fontWeight: '400',
  },
  section: {
    backgroundColor: colors.background.light,
    padding: '25px',
    borderRadius: '0 0 8px 8px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: colors.background.white,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.background.white,
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    padding: '10px 22px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
  },
  alert: {
    info: {
      backgroundColor: '#EBF8FF',
      border: `1px solid #90CDF4`,
      borderRadius: '6px',
      padding: '15px',
      margin: '20px 0',
    },
    warning: {
      backgroundColor: '#FFFBEB',
      border: `1px solid #F6E05E`,
      borderRadius: '6px',
      padding: '15px',
      margin: '20px 0',
    },
    success: {
      backgroundColor: '#F0FFF4',
      border: `1px solid #9AE6B4`,
      borderRadius: '6px',
      padding: '15px',
      margin: '20px 0',
    },
  },
  footer: {
    textAlign: 'center' as const,
    paddingTop: '30px',
    borderTop: `1px solid ${colors.border}`,
    color: colors.text.light,
    fontSize: '12px',
  },
};

export const EmailLayout: React.FC<EmailLayoutProps> = ({ 
  children, 
  previewText = "Message from JarrettStanley.com" 
}) => {
  return (
    <Html>
      <Head>
        <title>Jarrett Stanley</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        {previewText && (
          <meta name="description" content={previewText} />
        )}
      </Head>
      <Body style={{ 
        margin: '0', 
        padding: '20px', 
        backgroundColor: colors.background.purple,
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      }}>
        <Container style={styles.container}>
          {children}
          
          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={{ margin: '0', lineHeight: '1.4' }}>
              Jarrett Stanley | Chief Marketing Officer at Nationwide Mortgage Bankers
            </Text>
            <Text style={{ margin: '8px 0', lineHeight: '1.4' }}>
              AI Marketing Expert | Thought Leader | Speaker
            </Text>
            <Hr style={{ 
              margin: '20px 0', 
              border: 'none', 
              borderTop: `1px solid ${colors.border}` 
            }} />
            <Text style={{ margin: '0', lineHeight: '1.4' }}>
              <Link 
                href="https://jarrettstanley.com" 
                style={{ color: colors.primary, textDecoration: 'none' }}
              >
                jarrettstanley.com
              </Link>
              {' | '}
              <Link 
                href="https://linkedin.com/in/jarrettstanley" 
                style={{ color: colors.primary, textDecoration: 'none' }}
              >
                LinkedIn
              </Link>
              {' | '}
              <Link 
                href="https://x.com/IAmJarrettS" 
                style={{ color: colors.primary, textDecoration: 'none' }}
              >
                Twitter
              </Link>
            </Text>
            <Text style={{ 
              margin: '15px 0 0 0', 
              fontSize: '11px',
              color: colors.text.light,
              lineHeight: '1.4' 
            }}>
              This email was sent from JarrettStanley.com. 
              If you have any questions, please reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};