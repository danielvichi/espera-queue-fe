import { TIME_PATTERN_REGEX } from '~/configs/regex';

export default function formatTime(timeString: string) {
  if (timeString.match(TIME_PATTERN_REGEX)) {
    return timeString;
  }

  // Remove all non-digit characters
  const digits = timeString.replace(/\D/g, '');

  if (digits.length <= 0) {
    return '';
  }

  const hours = parseInt(digits.substring(0, 2));
  const minutes = parseInt(digits.substring(2, 4));

  const formattedMinutes = minutes ? `:${minutes.toString()}` : '';

  return `${hours}${minutes ? formattedMinutes : ''}`;
}
