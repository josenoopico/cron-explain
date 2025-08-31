/**
 * Interface for cron translations supporting multiple languages
 */
export interface CronTranslations {
  daysOfWeek: Record<string, string>;
  months: Record<string, string>;
  phrases: {
    executes: string;
    everyday: string;
    everyMinute: string;
    at: string;
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
    firstDayOfMonth: string;
    dayOfMonth: string;
    everyHour: string;
    minutesOfHour: string;
    every: string;
    and: string;
    in: string;
    on: string;
    errorInterpreting: string;
    invalidExpression: string;
    exactlyFiveFields: string;
    dayOfWeek: string;
    month: string;
  };
}

/**
 * Supported languages for cron explanations
 */
export type SupportedLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR';

/**
 * Configuration options for CronExplainer
 */
export interface CronExplainerConfig {
  defaultLanguage: SupportedLanguage;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
}
