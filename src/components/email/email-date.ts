const EMAIL_TIMESTAMP_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
});

const CONFIRMATION_DEADLINE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const COMPACT_DEADLINE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const FULL_DEADLINE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('en-US');

export function formatEmailTimestamp(date = new Date()) {
  return EMAIL_TIMESTAMP_FORMATTER.format(date);
}

export function formatConfirmationDeadline(value: string) {
  return CONFIRMATION_DEADLINE_FORMATTER.format(new Date(value));
}

export function formatCompactDeadline(value: string) {
  return COMPACT_DEADLINE_FORMATTER.format(new Date(value));
}

export function formatFullDeadline(value: string) {
  return FULL_DEADLINE_FORMATTER.format(new Date(value));
}

export function formatShortDate(value: string) {
  return SHORT_DATE_FORMATTER.format(new Date(value));
}

export function isWithinNextDay(value: string) {
  return new Date(value).getTime() <= Date.now() + 24 * 60 * 60 * 1000;
}
