import { CronTranslations } from './index';

/**
 * French (France) translations for cron explanations
 */
export const frFR: CronTranslations = {
  daysOfWeek: {
    '0': 'dimanche',
    '1': 'lundi',
    '2': 'mardi',
    '3': 'mercredi',
    '4': 'jeudi',
    '5': 'vendredi',
    '6': 'samedi',
    '7': 'dimanche' // Some systems use 7 for Sunday
  },
  months: {
    '1': 'janvier',
    '2': 'février',
    '3': 'mars',
    '4': 'avril',
    '5': 'mai',
    '6': 'juin',
    '7': 'juillet',
    '8': 'août',
    '9': 'septembre',
    '10': 'octobre',
    '11': 'novembre',
    '12': 'décembre'
  },
  phrases: {
    executes: 'Exécute',
    everyday: 'tous les jours',
    everyMinute: 'chaque minute',
    at: 'à',
    morning: 'du matin',
    afternoon: 'de l\'après-midi',
    evening: 'du soir',
    night: 'du soir',
    firstDayOfMonth: 'le premier jour du mois',
    dayOfMonth: 'le {day} de chaque mois',
    everyHour: 'chaque heure',
    minutesOfHour: 'à {minutes} minutes de chaque heure',
    every: 'tous les',
    and: 'et',
    in: 'en',
    on: 'le',
    errorInterpreting: 'Erreur lors de l\'interprétation de l\'expression cron',
    invalidExpression: 'Expression cron invalide',
    exactlyFiveFields: 'L\'expression cron doit avoir exactement 5 champs',
    dayOfWeek: 'le jour de la semaine {day}',
    month: 'au mois {month}'
  }
};
