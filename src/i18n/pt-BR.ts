import { CronTranslations } from './index';

/**
 * Portuguese (Brazil) translations for cron explanations
 */
export const ptBR: CronTranslations = {
  daysOfWeek: {
    '0': 'domingo',
    '1': 'segunda-feira',
    '2': 'terça-feira',
    '3': 'quarta-feira',
    '4': 'quinta-feira',
    '5': 'sexta-feira',
    '6': 'sábado',
    '7': 'domingo' // Some systems use 7 for Sunday
  },
  months: {
    '1': 'janeiro',
    '2': 'fevereiro',
    '3': 'março',
    '4': 'abril',
    '5': 'maio',
    '6': 'junho',
    '7': 'julho',
    '8': 'agosto',
    '9': 'setembro',
    '10': 'outubro',
    '11': 'novembro',
    '12': 'dezembro'
  },
  phrases: {
    executes: 'Executa',
    everyday: 'todos os dias',
    everyMinute: 'a cada minuto',
    at: 'às',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da tarde',
    night: 'da noite',
    firstDayOfMonth: 'no primeiro dia do mês',
    dayOfMonth: 'no dia {day} de cada mês',
    everyHour: 'a cada hora',
    minutesOfHour: 'aos {minutes} minutos de cada hora',
    every: 'toda',
    and: 'e',
    in: 'em',
    on: 'no',
    errorInterpreting: 'Erro ao interpretar a expressão cron',
    invalidExpression: 'Expressão cron inválida',
    exactlyFiveFields: 'Expressão cron deve ter exatamente 5 campos',
    dayOfWeek: 'no dia da semana {day}',
    month: 'no mês {month}'
  }
};
