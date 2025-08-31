import { CronTranslations } from './index';

/**
 * English (US) translations for cron explanations
 */
export const enUS: CronTranslations = {
  daysOfWeek: {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday',
    '5': 'Friday',
    '6': 'Saturday',
    '7': 'Sunday' // Some systems use 7 for Sunday
  },
  months: {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  },
  phrases: {
    executes: 'Runs',
    everyday: 'every day',
    everyMinute: 'every minute',
    at: 'at',
    morning: 'AM',
    afternoon: 'PM',
    evening: 'PM',
    night: 'PM',
    firstDayOfMonth: 'on the first day of the month',
    dayOfMonth: 'on day {day} of every month',
    everyHour: 'every hour',
    minutesOfHour: 'at {minutes} minutes of every hour',
    every: 'every',
    and: 'and',
    in: 'in',
    on: 'on',
    errorInterpreting: 'Error interpreting cron expression',
    invalidExpression: 'Invalid cron expression',
    exactlyFiveFields: 'Cron expression must have exactly 5 fields',
    dayOfWeek: 'on day of week {day}',
    month: 'in month {month}'
  }
};
