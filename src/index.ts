/**
 * Main entry point for cron-explain library
 */

export { explainCron, explainCronPt, getSupportedLanguages } from './cronExplainer';
export type { SupportedLanguage, CronTranslations, CronExplainerConfig } from './i18n';
export { getTranslations, isLanguageSupported } from './i18n/loader';
export { defaultConfig } from './config';
