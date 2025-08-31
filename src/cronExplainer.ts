/**
 * Converte expressões cron em frases descritivas em português
 */

interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

const DAYS_OF_WEEK: Record<string, string> = {
  '0': 'domingo',
  '1': 'segunda-feira',
  '2': 'terça-feira',
  '3': 'quarta-feira',
  '4': 'quinta-feira',
  '5': 'sexta-feira',
  '6': 'sábado',
  '7': 'domingo' // Alguns sistemas usam 7 para domingo
};

const MONTHS: Record<string, string> = {
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
};

/**
 * Converte uma expressão cron em uma frase descritiva em português
 * @param cronExpression - Expressão cron no formato "minuto hora dia mês dia-semana"
 * @returns Frase descritiva em português
 */
export function explainCron(cronExpression: string): string {
  try {
    const fields = parseCronExpression(cronExpression);
    return buildDescription(fields);
  } catch (error) {
    return `Erro ao interpretar a expressão cron: ${cronExpression}`;
  }
}

/**
 * Faz o parse da expressão cron em campos individuais
 */
function parseCronExpression(cronExpression: string): CronFields {
  const parts = cronExpression.trim().split(/\s+/);

  if (parts.length !== 5) {
    throw new Error('Expressão cron deve ter exatamente 5 campos');
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
 * Constrói a descrição em português baseada nos campos da expressão cron
 */
function buildDescription(fields: CronFields): string {
  let description = 'Executa ';

  // Determinar a frequência baseada nos campos
  if (fields.dayOfWeek !== '*') {
    description += buildDayOfWeekDescription(fields.dayOfWeek);
  } else if (fields.dayOfMonth !== '*') {
    description += buildDayOfMonthDescription(fields.dayOfMonth);
  } else if (fields.month !== '*') {
    description += buildMonthDescription(fields.month);
  } else {
    description += 'todos os dias';
  }

  // Adicionar informações de horário
  const timeDescription = buildTimeDescription(fields.minute, fields.hour);
  if (timeDescription) {
    description += ` ${timeDescription}`;
  }

  return description;
}

/**
 * Constrói a descrição para dias da semana
 */
function buildDayOfWeekDescription(dayOfWeek: string): string {
  if (dayOfWeek === '*') {
    return 'todos os dias';
  }

  if (DAYS_OF_WEEK[dayOfWeek]) {
    return `toda ${DAYS_OF_WEEK[dayOfWeek]}`;
  }

  // Para múltiplos dias ou intervalos
  if (dayOfWeek.includes(',')) {
    const days = dayOfWeek.split(',').map(day => DAYS_OF_WEEK[day.trim()]).filter(Boolean);
    if (days.length > 1) {
      const lastDay = days.pop();
      return `toda ${days.join(', ')} e ${lastDay}`;
    }
  }

  return `no dia da semana ${dayOfWeek}`;
}

/**
 * Constrói a descrição para dias do mês
 */
function buildDayOfMonthDescription(dayOfMonth: string): string {
  if (dayOfMonth === '*') {
    return 'todos os dias';
  }

  if (dayOfMonth === '1') {
    return 'no primeiro dia do mês';
  }

  if (dayOfMonth === '15') {
    return 'no dia 15 de cada mês';
  }

  return `no dia ${dayOfMonth} de cada mês`;
}

/**
 * Constrói a descrição para meses
 */
function buildMonthDescription(month: string): string {
  if (month === '*') {
    return 'todos os meses';
  }

  if (MONTHS[month]) {
    return `em ${MONTHS[month]}`;
  }

  return `no mês ${month}`;
}

/**
 * Constrói a descrição do horário
 */
function buildTimeDescription(minute: string, hour: string): string {
  if (minute === '*' && hour === '*') {
    return 'a cada minuto';
  }

  if (minute === '0' && hour !== '*') {
    const hourNum = parseInt(hour);
    const period = hourNum < 12 ? 'da manhã' : hourNum < 18 ? 'da tarde' : 'da noite';
    const displayHour = hourNum.toString().padStart(2, '0');
    return `às ${displayHour}:00 ${period}`;
  }

  if (minute !== '*' && hour !== '*') {
    const hourNum = parseInt(hour);
    const period = hourNum < 12 ? 'da manhã' : hourNum < 18 ? 'da tarde' : 'da noite';
    const displayHour = hourNum.toString().padStart(2, '0');
    const displayMinute = minute.padStart(2, '0');
    return `às ${displayHour}:${displayMinute} ${period}`;
  }

  if (hour === '*' && minute !== '*') {
    return `aos ${minute} minutos de cada hora`;
  }

  return '';
}
