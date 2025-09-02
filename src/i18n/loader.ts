import { ptBR } from './pt-BR';
import { enUS } from './en-US';
import { esES } from './es-ES';
import { frFR } from './fr-FR';
import { CronTranslations, SupportedLanguage } from './index';

/**
 * Registry of all available translations
 */
const translations: Record<SupportedLanguage, CronTranslations> = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
  'fr-FR': frFR
};

/**
 * Get translations for a specific language
 * @param language - The language to get translations for
 * @returns CronTranslations object for the specified language
 */
export function getTranslations(language: SupportedLanguage): CronTranslations {
  return translations[language] || translations['en-US'];
}

/**
 * Get list of all supported languages
 * @returns Array of supported language codes
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  return Object.keys(translations) as SupportedLanguage[];
}

/**
 * Check if a language is supported
 * @param language - Language code to check
 * @returns True if the language is supported
 */
export function isLanguageSupported(language: string): language is SupportedLanguage {
  return Object.keys(translations).includes(language);
}

/**
 * Utility function to interpolate variables in translation strings
 * @param template - Template string with {variable} placeholders
 * @param variables - Object with variables to interpolate
 * @returns Interpolated string
 */
export function interpolate(template: string, variables: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}
