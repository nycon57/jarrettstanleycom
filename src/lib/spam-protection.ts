/**
 * Spam Protection Utilities
 *
 * Multi-layered defense against bot submissions:
 * 1. Gibberish detection - Catches random character spam
 * 2. Honeypot validation - Catches bots that fill hidden fields
 * 3. Rate limiting - Prevents flooding
 * 4. Suspicious pattern detection - Catches common bot behaviors
 */

// Rate limiting store (in-memory, consider Redis for production scale)
const rateLimitStore = new Map<string, {count: number;resetTime: number;}>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max submissions per window
const SPAM_KEYWORD_PATTERN = /\b(?:buy now|click here|act now|limited time|free money|make money fast|casino|viagra|bitcoin investment|crypto investment|forex trading|earn from home|work from home opportunity)\b/;

/**
 * Detects gibberish/random character strings
 * Returns true if the string appears to be gibberish
 */
function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return false;

  // Clean the text
  const cleaned = text.trim().toLowerCase();

  // Check for excessive consonant clusters (more than 4 consonants in a row)
  const consonantCluster = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
  if (consonantCluster.test(cleaned)) {
    return true;
  }

  // Check for too many capital letters mixed randomly (like CkBOGdxNmuJkVOCmwCcOkw)
  const mixedCasePattern = /([A-Z][a-z]){4,}|([a-z][A-Z]){4,}/;
  if (mixedCasePattern.test(text)) {
    return true;
  }

  // Check for excessive capital letters in "name" (more than 40% caps is suspicious)
  const capitalRatio = (text.match(/[A-Z]/g)?.length || 0) / text.replace(/\s/g, '').length;
  if (text.length > 5 && capitalRatio > 0.4) {
    return true;
  }

  // Check for strings with very low vowel ratio (less than 15% vowels is suspicious)
  const vowelCount = cleaned.match(/[aeiou]/g)?.length || 0;
  const letterCount = cleaned.replace(/[^a-z]/g, '').length;
  if (letterCount > 5 && vowelCount / letterCount < 0.15) {
    return true;
  }

  // Check for random character sequences (high entropy)
  if (hasHighEntropy(cleaned)) {
    return true;
  }

  // Check for repeated patterns that bots often generate
  const repeatedPattern = /(.{2,})\1{2,}/;
  if (repeatedPattern.test(cleaned)) {
    return true;
  }

  // Check for no spaces in long "names" (real names have spaces or are short)
  if (text.length > 15 && !text.includes(' ')) {
    return true;
  }

  return false;
}

/**
 * Calculate string entropy - high entropy suggests random generation
 */
function hasHighEntropy(text: string): boolean {
  if (text.length < 8) return false;

  const charFreq: Record<string, number> = {};
  for (const char of text) {
    charFreq[char] = (charFreq[char] || 0) + 1;
  }

  let entropy = 0;
  const len = text.length;
  for (const count of Object.values(charFreq)) {
    const freq = count / len;
    entropy -= freq * Math.log2(freq);
  }

  // High entropy (>4.5) with many unique characters suggests randomness
  const uniqueRatio = Object.keys(charFreq).length / len;
  return entropy > 4.5 && uniqueRatio > 0.7;
}

/**
 * Validates that the honeypot field is empty
 * Returns true if the submission is likely a bot (honeypot filled)
 */
function isHoneypotFilled(honeypotValue: string | null | undefined): boolean {
  return !!honeypotValue && honeypotValue.trim().length > 0;
}

/**
 * Check rate limiting for an identifier (IP or email)
 * Returns true if rate limited (should block)
 */
function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Detect suspicious patterns in form data
 */
function hasSuspiciousPatterns(data: {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  company?: string;
}): {suspicious: boolean;reason?: string;} {
  // Check names for gibberish
  const fullName = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();

  if (isGibberish(fullName)) {
    return { suspicious: true, reason: 'Name appears to be auto-generated' };
  }

  if (data.firstName && isGibberish(data.firstName)) {
    return { suspicious: true, reason: 'First name appears to be auto-generated' };
  }

  if (data.lastName && isGibberish(data.lastName)) {
    return { suspicious: true, reason: 'Last name appears to be auto-generated' };
  }

  if (data.company && isGibberish(data.company)) {
    return { suspicious: true, reason: 'Company name appears to be auto-generated' };
  }

  // Check for common spam keywords in message
  if (data.message) {
    const lowerMessage = data.message.toLowerCase();
    if (SPAM_KEYWORD_PATTERN.test(lowerMessage)) {
      return { suspicious: true, reason: 'Message contains spam keywords' };
    }
  }

  // Check for URL spam in name fields
  if (fullName.includes('http') || fullName.includes('www.')) {
    return { suspicious: true, reason: 'Name contains URL' };
  }

  // Check for excessive length in name (real names are usually under 50 chars)
  if (fullName.length > 60) {
    return { suspicious: true, reason: 'Name is suspiciously long' };
  }

  return { suspicious: false };
}

/**
 * Main spam check function - combines all checks
 */
export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  score: number; // 0-100, higher = more likely spam
}

export function checkForSpam(data: {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  company?: string;
  honeypot?: string;
  identifier?: string; // IP or email for rate limiting
}): SpamCheckResult {
  let score = 0;

  // Check honeypot (immediate fail)
  if (isHoneypotFilled(data.honeypot)) {
    return { isSpam: true, reason: 'Honeypot triggered', score: 100 };
  }

  // Check rate limiting
  if (data.identifier && isRateLimited(data.identifier)) {
    return { isSpam: true, reason: 'Rate limit exceeded', score: 100 };
  }

  // Check suspicious patterns
  const patternCheck = hasSuspiciousPatterns(data);
  if (patternCheck.suspicious) {
    return { isSpam: true, reason: patternCheck.reason, score: 90 };
  }

  // Additional scoring factors
  const fullName = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim();

  // Names with numbers are suspicious
  if (/\d/.test(fullName)) {
    score += 20;
  }

  // Very short names
  if (fullName.length < 3) {
    score += 15;
  }

  // Message is very short or empty
  if (data.message && data.message.length < 10) {
    score += 10;
  }

  // Final determination
  const isSpam = score >= 50;

  return {
    isSpam,
    reason: isSpam ? 'Multiple suspicious factors detected' : undefined,
    score
  };
}

/**
 * Timing-based bot detection
 * Legitimate users take at least a few seconds to fill forms
 */
export function isSubmittedTooFast(
startTime: number,
submitTime: number = Date.now(),
minSeconds: number = 3)
: boolean {
  const elapsedSeconds = (submitTime - startTime) / 1000;
  return elapsedSeconds < minSeconds;
}

/**
 * Clean up old rate limit entries periodically
 */
function cleanupRateLimitStore(): void {
  const now = Date.now();
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
