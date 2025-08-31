/**
 * Convert cron expressions into readable phrases in multiple languages
 */

import { CronTranslations, SupportedLanguage } from './i18n';
import { getTranslations, interpolate, isLanguageSupported } from './i18n/loader';
import { defaultConfig, TIME_PERIODS } from './config';

interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

/**
 * Convert a cron expression into a descriptive phrase
 * @param cronExpression - Cron expression in format "minute hour day month day-of-week"
 * @param language - Target language for the description
 * @returns Descriptive phrase in the specified language
 */
export function explainCron(
  cronExpression: string, 
  language: string = defaultConfig.defaultLanguage
): string {
  try {
    const fields = parseCronExpression(cronExpression);
    const validLanguage = isLanguageSupported(language) ? language : defaultConfig.defaultLanguage;
    const translations = getTranslations(validLanguage as SupportedLanguage);
    return buildDescription(fields, translations);
  } catch (error) {
    const validLanguage = isLanguageSupported(language) ? language : defaultConfig.defaultLanguage;
    const translations = getTranslations(validLanguage as SupportedLanguage);
    return `${translations.phrases.errorInterpreting}: ${cronExpression}`;
  }
}

/**
 * Parse cron expression into individual fields
 */
function parseCronExpression(cronExpression: string): CronFields {
  const parts = cronExpression.trim().split(/\s+/);

  if (parts.length !== 5) {
    throw new Error('Cron expression must have exactly 5 fields');
  }

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4]
  };
}

/**
 * Build description based on cron fields using translations
 */
function buildDescription(fields: CronFields, translations: CronTranslations): string {
  let description = `${translations.phrases.executes} `;

  // Determine frequency based on fields
  if (fields.dayOfWeek !== '*') {
    description += buildDayOfWeekDescription(fields.dayOfWeek, translations);
  } else if (fields.dayOfMonth !== '*') {
    description += buildDayOfMonthDescription(fields.dayOfMonth, translations);
  } else if (fields.month !== '*') {
    description += buildMonthDescription(fields.month, translations);
  } else {
    description += translations.phrases.everyday;
  }

  // Add time information
  const timeDescription = buildTimeDescription(fields.minute, fields.hour, translations);
  if (timeDescription) {
    description += ` ${timeDescription}`;
  }

  return description;
}

/**
 * Build description for days of week
 */
function buildDayOfWeekDescription(dayOfWeek: string, translations: CronTranslations): string {
  if (dayOfWeek === '*') {
    return translations.phrases.everyday;
  }

  if (translations.daysOfWeek[dayOfWeek]) {
    return `${translations.phrases.every} ${translations.daysOfWeek[dayOfWeek]}`;
  }

  // For multiple days or ranges
  if (dayOfWeek.includes(',')) {
    const days = dayOfWeek.split(',')
      .map(day => translations.daysOfWeek[day.trim()])
      .filter(Boolean);
    if (days.length > 1) {
      const lastDay = days.pop();
      return `${translations.phrases.every} ${days.join(', ')} ${translations.phrases.and} ${lastDay}`;
    }
  }

  return interpolate(translations.phrases.dayOfWeek, { day: dayOfWeek });
}

/**
 * Build description for days of month
 */
function buildDayOfMonthDescription(dayOfMonth: string, translations: CronTranslations): string {
  if (dayOfMonth === '*') {
    return translations.phrases.everyday;
  }

  if (dayOfMonth === '1') {
    return translations.phrases.firstDayOfMonth;
  }

  return interpolate(translations.phrases.dayOfMonth, { day: dayOfMonth });
}

/**
 * Build description for months
 */
function buildMonthDescription(month: string, translations: CronTranslations): string {
  if (month === '*') {
    return translations.phrases.everyday;
  }

  if (translations.months[month]) {
    return `${translations.phrases.in} ${translations.months[month]}`;
  }

  return interpolate(translations.phrases.month, { month: month });
}

/**
 * Build time description
 */
function buildTimeDescription(minute: string, hour: string, translations: CronTranslations): string {
  if (minute === '*' && hour === '*') {
    return translations.phrases.everyMinute;
  }

  if (minute === '0' && hour !== '*') {
    const hourNum = parseInt(hour);
    const period = getPeriodOfDay(hourNum, translations);
    const displayHour = hourNum.toString().padStart(2, '0');
    return `${translations.phrases.at} ${displayHour}:00 ${period}`;
  }

  if (minute !== '*' && hour !== '*') {
    const hourNum = parseInt(hour);
    const period = getPeriodOfDay(hourNum, translations);
    const displayHour = hourNum.toString().padStart(2, '0');
    const displayMinute = minute.padStart(2, '0');
    return `${translations.phrases.at} ${displayHour}:${displayMinute} ${period}`;
  }

  if (hour === '*' && minute !== '*') {
    return interpolate(translations.phrases.minutesOfHour, { minutes: minute });
  }

  return '';
}

/**
 * Get period of day based on hour
 */
function getPeriodOfDay(hour: number, translations: CronTranslations): string {
  if (hour < TIME_PERIODS.MORNING_END) {
    return translations.phrases.morning;
  } else if (hour < TIME_PERIODS.AFTERNOON_END) {
    return translations.phrases.afternoon;
  } else {
    return translations.phrases.night;
  }
}

/**
 * Get list of supported languages
 * @returns Array of supported language codes
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return ['pt-BR', 'en-US', 'es-ES', 'fr-FR'];
}

/**
 * Legacy function for backward compatibility (Portuguese only)
 * @deprecated Use explainCron with language parameter instead
 */
export function explainCronPt(cronExpression: string): string {
  return explainCron(cronExpression, 'pt-BR');
}
