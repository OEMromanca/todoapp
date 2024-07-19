import { format, isValid, parseISO } from 'date-fns';

export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36);
  return `${timestamp}-${randomStr}`;
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) {
    console.warn('formatDate is not expecting a null value');
    return '';
  }

  if (typeof date === 'string') {
    const parsedDate = parseISO(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, 'd MMMM yyyy');
    }
  } else if (date instanceof Date) {
    if (isValid(date)) {
      return format(date, 'd MMMM yyyy');
    }
  }

  console.warn('Invalid date value:', date);
  return '';
};

export const transformText = (
  text: string,
  type: 'uppercase' | 'lowercase' | 'capitalizeFirst',
): string => {
  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalizeFirst':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
};
