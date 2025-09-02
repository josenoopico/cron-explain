import { CronExplainerConfig, SupportedLanguage } from './i18n';

/**
 * Default configuration for CronExplainer
 */
export const defaultConfig: CronExplainerConfig = {
  defaultLanguage: 'en-US' as SupportedLanguage,
  timeFormat: '24h'
};

/**
 * Available time formats
 */
export const TIME_FORMATS = {
  '12h': '12h',
  '24h': '24h'
} as const;

/**
 * Time period boundaries for different periods of the day
 */
export const TIME_PERIODS = {
  MORNING_END: 12,
  AFTERNOON_END: 18,
  NIGHT_START: 18
} as const;
