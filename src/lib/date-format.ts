import { format } from 'date-fns';

export function formatDateLabel(value: string, pattern: string) {
  return format(new Date(value), pattern);
}
