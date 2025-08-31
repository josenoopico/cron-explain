import { CronTranslations } from './index';

/**
 * Spanish (Spain) translations for cron explanations
 */
export const esES: CronTranslations = {
  daysOfWeek: {
    '0': 'domingo',
    '1': 'lunes',
    '2': 'martes',
    '3': 'miércoles',
    '4': 'jueves',
    '5': 'viernes',
    '6': 'sábado',
    '7': 'domingo' // Some systems use 7 for Sunday
  },
  months: {
    '1': 'enero',
    '2': 'febrero',
    '3': 'marzo',
    '4': 'abril',
    '5': 'mayo',
    '6': 'junio',
    '7': 'julio',
    '8': 'agosto',
    '9': 'septiembre',
    '10': 'octubre',
    '11': 'noviembre',
    '12': 'diciembre'
  },
  phrases: {
    executes: 'Ejecuta',
    everyday: 'todos los días',
    everyMinute: 'cada minuto',
    at: 'a las',
    morning: 'de la mañana',
    afternoon: 'de la tarde',
    evening: 'de la tarde',
    night: 'de la noche',
    firstDayOfMonth: 'el primer día del mes',
    dayOfMonth: 'el día {day} de cada mes',
    everyHour: 'cada hora',
    minutesOfHour: 'a los {minutes} minutos de cada hora',
    every: 'todos los',
    and: 'y',
    in: 'en',
    on: 'el',
    errorInterpreting: 'Error al interpretar la expresión cron',
    invalidExpression: 'Expresión cron inválida',
    exactlyFiveFields: 'La expresión cron debe tener exactamente 5 campos',
    dayOfWeek: 'el día de la semana {day}',
    month: 'en el mes {month}'
  }
};
