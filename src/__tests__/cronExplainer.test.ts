import { explainCron, getSupportedLanguages } from '../cronExplainer';

describe('cronExplainer', () => {
  describe('explainCron - Portuguese (default)', () => {
    // Testes para expressões cron básicas
    describe('Basic expressions', () => {
      test('should explain execution every minute', () => {
        expect(explainCron('* * * * *')).toBe('Executa todos os dias a cada minuto');
      });

      test('should explain daily execution at 9:00 AM', () => {
        expect(explainCron('0 9 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('should explain execution at 14:30 PM', () => {
        expect(explainCron('30 14 * * *')).toBe('Executa todos os dias às 14:30 da tarde');
      });

      test('should explain execution at 20:15 PM', () => {
        expect(explainCron('15 20 * * *')).toBe('Executa todos os dias às 20:15 da noite');
      });

      test('should explain execution at 30 minutes of every hour', () => {
        expect(explainCron('30 * * * *')).toBe('Executa todos os dias aos 30 minutos de cada hora');
      });
    });

    // Testes para dias da semana
    describe('Days of week', () => {
      test('should explain execution every Monday', () => {
        expect(explainCron('0 9 * * 1')).toBe('Executa toda segunda-feira às 09:00 da manhã');
      });

      test('should explain execution every Friday', () => {
        expect(explainCron('0 17 * * 5')).toBe('Executa toda sexta-feira às 17:00 da tarde');
      });

      test('should explain execution every Sunday (using 0)', () => {
        expect(explainCron('0 10 * * 0')).toBe('Executa toda domingo às 10:00 da manhã');
      });

      test('should explain execution every Sunday (using 7)', () => {
        expect(explainCron('0 10 * * 7')).toBe('Executa toda domingo às 10:00 da manhã');
      });

      test('should explain execution multiple days of week', () => {
        expect(explainCron('0 9 * * 1,3,5')).toBe('Executa toda segunda-feira, quarta-feira e sexta-feira às 09:00 da manhã');
      });
    });

    // Testes para dias do mês
    describe('Days of month', () => {
      test('should explain execution on first day of month', () => {
        expect(explainCron('0 0 1 * *')).toBe('Executa no primeiro dia do mês às 00:00 da manhã');
      });

      test('should explain execution on day 15 of every month', () => {
        expect(explainCron('0 12 15 * *')).toBe('Executa no dia 15 de cada mês às 12:00 da tarde');
      });

      test('should explain execution on day 31 of every month', () => {
        expect(explainCron('0 23 31 * *')).toBe('Executa no dia 31 de cada mês às 23:00 da noite');
      });

      test('should explain execution on specific day of month', () => {
        expect(explainCron('0 8 5 * *')).toBe('Executa no dia 5 de cada mês às 08:00 da manhã');
      });
    });

    // Testes para meses específicos
    describe('Specific months', () => {
      test('should explain execution in January', () => {
        expect(explainCron('0 9 * 1 *')).toBe('Executa em janeiro às 09:00 da manhã');
      });

      test('should explain execution in December', () => {
        expect(explainCron('0 15 * 12 *')).toBe('Executa em dezembro às 15:00 da tarde');
      });

      test('should explain execution in June', () => {
        expect(explainCron('30 11 * 6 *')).toBe('Executa em junho às 11:30 da manhã');
      });
    });

    // Testes para diferentes horários e períodos
    describe('Time periods', () => {
      test('should classify morning time (00:00-11:59)', () => {
        expect(explainCron('0 0 * * *')).toBe('Executa todos os dias às 00:00 da manhã');
        expect(explainCron('0 6 * * *')).toBe('Executa todos os dias às 06:00 da manhã');
        expect(explainCron('0 11 * * *')).toBe('Executa todos os dias às 11:00 da manhã');
      });

      test('should classify afternoon time (12:00-17:59)', () => {
        expect(explainCron('0 12 * * *')).toBe('Executa todos os dias às 12:00 da tarde');
        expect(explainCron('0 15 * * *')).toBe('Executa todos os dias às 15:00 da tarde');
        expect(explainCron('0 17 * * *')).toBe('Executa todos os dias às 17:00 da tarde');
      });

      test('should classify night time (18:00-23:59)', () => {
        expect(explainCron('0 18 * * *')).toBe('Executa todos os dias às 18:00 da noite');
        expect(explainCron('0 21 * * *')).toBe('Executa todos os dias às 21:00 da noite');
        expect(explainCron('0 23 * * *')).toBe('Executa todos os dias às 23:00 da noite');
      });
    });

    // Testes para casos especiais
    describe('Special cases', () => {
      test('should handle minutes with leading zero', () => {
        expect(explainCron('05 9 * * *')).toBe('Executa todos os dias às 09:05 da manhã');
      });

      test('should handle hours with leading zero', () => {
        expect(explainCron('0 01 * * *')).toBe('Executa todos os dias às 01:00 da manhã');
      });

      test('should prioritize day of week over day of month', () => {
        expect(explainCron('0 9 15 * 1')).toBe('Executa toda segunda-feira às 09:00 da manhã');
      });

      test('should use day of month when day of week is *', () => {
        expect(explainCron('0 9 15 * *')).toBe('Executa no dia 15 de cada mês às 09:00 da manhã');
      });
    });

    // Testes para dias da semana não mapeados
    describe('Unmapped days of week', () => {
      test('should return generic format for unmapped day', () => {
        expect(explainCron('0 9 * * 8')).toBe('Executa no dia da semana 8 às 09:00 da manhã');
      });
    });

    // Testes para meses não mapeados
    describe('Unmapped months', () => {
      test('should return generic format for unmapped month', () => {
        expect(explainCron('0 9 * 13 *')).toBe('Executa no mês 13 às 09:00 da manhã');
      });
    });

    // Testes de erro
    describe('Error handling', () => {
      test('should return error message for expression with few fields', () => {
        const result = explainCron('0 9 * *');
        expect(result).toBe('Erro ao interpretar a expressão cron: 0 9 * *');
      });

      test('should support 6-field node-cron format (seconds field)', () => {
        const result = explainCron('0 9 * * * *');
        expect(result).toBe('Executa todos os dias aos 9 minutos de cada hora');
      });

      test('should return error message for empty expression', () => {
        const result = explainCron('');
        expect(result).toBe('Erro ao interpretar a expressão cron: ');
      });

      test('should return error message for expression with only spaces', () => {
        const result = explainCron('   ');
        expect(result).toBe('Erro ao interpretar a expressão cron:    ');
      });

      test('should return error message for expression with one field', () => {
        const result = explainCron('*');
        expect(result).toBe('Erro ao interpretar a expressão cron: *');
      });
    });

    // Testes para múltiplos espaços entre campos
    describe('Input formatting', () => {
      test('should handle multiple spaces between fields', () => {
        expect(explainCron('0   9   *   *   *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('should handle tabs between fields', () => {
        expect(explainCron('0\t9\t*\t*\t*')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('should handle spaces at beginning and end', () => {
        expect(explainCron('  0 9 * * *  ')).toBe('Executa todos os dias às 09:00 da manhã');
      });
    });

    // Testes para edge cases de horários
    describe('Time edge cases', () => {
      test('should handle minute 0 and non-specific hour correctly', () => {
        expect(explainCron('0 9 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('should handle specific hour and minute', () => {
        expect(explainCron('45 13 * * *')).toBe('Executa todos os dias às 13:45 da tarde');
      });

      test('should handle parsing numbers with parseInt', () => {
        expect(explainCron('0 09 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });
    });
  });

  describe('explainCron - English', () => {
    test('should explain basic expression in English', () => {
      expect(explainCron('0 9 * * *', 'en-US')).toBe('Runs every day at 09:00 AM');
    });

    test('should explain Monday execution in English', () => {
      expect(explainCron('0 9 * * 1', 'en-US')).toBe('Runs every Monday at 09:00 AM');
    });

    test('should explain first day of month in English', () => {
      expect(explainCron('0 0 1 * *', 'en-US')).toBe('Runs on the first day of the month at 00:00 AM');
    });

    test('should explain January execution in English', () => {
      expect(explainCron('0 9 * 1 *', 'en-US')).toBe('Runs in January at 09:00 AM');
    });

    test('should explain every minute in English', () => {
      expect(explainCron('* * * * *', 'en-US')).toBe('Runs every day every minute');
    });

    test('should handle error in English', () => {
      const result = explainCron('0 9 * *', 'en-US');
      expect(result).toBe('Error interpreting cron expression: 0 9 * *');
    });
  });

  describe('explainCron - Spanish', () => {
    test('should explain basic expression in Spanish', () => {
      expect(explainCron('0 9 * * *', 'es-ES')).toBe('Ejecuta todos los días a las 09:00 de la mañana');
    });

    test('should explain Monday execution in Spanish', () => {
      expect(explainCron('0 9 * * 1', 'es-ES')).toBe('Ejecuta todos los lunes a las 09:00 de la mañana');
    });

    test('should explain first day of month in Spanish', () => {
      expect(explainCron('0 0 1 * *', 'es-ES')).toBe('Ejecuta el primer día del mes a las 00:00 de la mañana');
    });

    test('should handle error in Spanish', () => {
      const result = explainCron('0 9 * *', 'es-ES');
      expect(result).toBe('Error al interpretar la expresión cron: 0 9 * *');
    });
  });

  describe('explainCron - French', () => {
    test('should explain basic expression in French', () => {
      expect(explainCron('0 9 * * *', 'fr-FR')).toBe('Exécute tous les jours à 09:00 du matin');
    });

    test('should explain Monday execution in French', () => {
      expect(explainCron('0 9 * * 1', 'fr-FR')).toBe('Exécute tous les lundi à 09:00 du matin');
    });

    test('should handle error in French', () => {
      const result = explainCron('0 9 * *', 'fr-FR');
      expect(result).toBe('Erreur lors de l\'interprétation de l\'expression cron: 0 9 * *');
    });
  });

  describe('explainCron - Unsupported Language', () => {
    test('should fallback to Portuguese for unsupported language', () => {
      expect(explainCron('0 9 * * *', 'de-DE')).toBe('Executa todos os dias às 09:00 da manhã');
    });

    test('should fallback to Portuguese for invalid language code', () => {
      expect(explainCron('0 9 * * *', 'invalid')).toBe('Executa todos os dias às 09:00 da manhã');
    });
  });

  describe('getSupportedLanguages', () => {
    test('should return array of supported language codes', () => {
      const languages = getSupportedLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages).toContain('pt-BR');
      expect(languages).toContain('en-US');
      expect(languages).toContain('es-ES');
      expect(languages).toContain('fr-FR');
    });

    test('should not include unsupported languages', () => {
      const languages = getSupportedLanguages();
      expect(languages).not.toContain('de-DE');
      expect(languages).not.toContain('it-IT');
    });
  });

  describe('explainCron - Complex expressions with ranges', () => {
    test('should handle range expressions in minutes', () => {
      expect(explainCron('0-30 9 * * *')).toBe('Executa todos os dias dos minutos 0-30 às 09:00 da manhã');
    });

    test('should handle range expressions in hours', () => {
      expect(explainCron('0 9-17 * * *')).toBe('Executa todos os dias das 09:00-17:00');
    });
  });

  describe('explainCron - Step values', () => {
    test('should handle step values in minutes', () => {
      expect(explainCron('*/15 * * * *')).toBe('Executa todos os dias a cada 15 minutos');
    });

    test('should handle step values in hours', () => {
      expect(explainCron('0 */2 * * *')).toBe('Executa todos os dias a cada 2 horas');
    });
  });
});
