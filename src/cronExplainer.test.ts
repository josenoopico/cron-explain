import { explainCron } from './cronExplainer';

describe('cronExplainer', () => {
  describe('explainCron', () => {
    // Testes para expressões cron básicas
    describe('Expressões básicas', () => {
      test('deve explicar execução a cada minuto', () => {
        expect(explainCron('* * * * *')).toBe('Executa todos os dias a cada minuto');
      });

      test('deve explicar execução diária às 9:00 da manhã', () => {
        expect(explainCron('0 9 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('deve explicar execução às 14:30 da tarde', () => {
        expect(explainCron('30 14 * * *')).toBe('Executa todos os dias às 14:30 da tarde');
      });

      test('deve explicar execução às 20:15 da noite', () => {
        expect(explainCron('15 20 * * *')).toBe('Executa todos os dias às 20:15 da noite');
      });

      test('deve explicar execução aos 30 minutos de cada hora', () => {
        expect(explainCron('30 * * * *')).toBe('Executa todos os dias aos 30 minutos de cada hora');
      });
    });

    // Testes para dias da semana
    describe('Dias da semana', () => {
      test('deve explicar execução toda segunda-feira', () => {
        expect(explainCron('0 9 * * 1')).toBe('Executa toda segunda-feira às 09:00 da manhã');
      });

      test('deve explicar execução toda sexta-feira', () => {
        expect(explainCron('0 17 * * 5')).toBe('Executa toda sexta-feira às 17:00 da tarde');
      });

      test('deve explicar execução todo domingo (usando 0)', () => {
        expect(explainCron('0 10 * * 0')).toBe('Executa toda domingo às 10:00 da manhã');
      });

      test('deve explicar execução todo domingo (usando 7)', () => {
        expect(explainCron('0 10 * * 7')).toBe('Executa toda domingo às 10:00 da manhã');
      });

      test('deve explicar execução múltiplos dias da semana', () => {
        expect(explainCron('0 9 * * 1,3,5')).toBe('Executa toda segunda-feira, quarta-feira e sexta-feira às 09:00 da manhã');
      });
    });

    // Testes para dias do mês
    describe('Dias do mês', () => {
      test('deve explicar execução no primeiro dia do mês', () => {
        expect(explainCron('0 0 1 * *')).toBe('Executa no primeiro dia do mês às 00:00 da manhã');
      });

      test('deve explicar execução no dia 15 de cada mês', () => {
        expect(explainCron('0 12 15 * *')).toBe('Executa no dia 15 de cada mês às 12:00 da tarde');
      });

      test('deve explicar execução no dia 31 de cada mês', () => {
        expect(explainCron('0 23 31 * *')).toBe('Executa no dia 31 de cada mês às 23:00 da noite');
      });

      test('deve explicar execução em dia específico do mês', () => {
        expect(explainCron('0 8 5 * *')).toBe('Executa no dia 5 de cada mês às 08:00 da manhã');
      });
    });

    // Testes para meses específicos
    describe('Meses específicos', () => {
      test('deve explicar execução em janeiro', () => {
        expect(explainCron('0 9 * 1 *')).toBe('Executa em janeiro às 09:00 da manhã');
      });

      test('deve explicar execução em dezembro', () => {
        expect(explainCron('0 15 * 12 *')).toBe('Executa em dezembro às 15:00 da tarde');
      });

      test('deve explicar execução em junho', () => {
        expect(explainCron('30 11 * 6 *')).toBe('Executa em junho às 11:30 da manhã');
      });
    });

    // Testes para diferentes horários e períodos
    describe('Períodos do dia', () => {
      test('deve classificar horário da manhã (00:00-11:59)', () => {
        expect(explainCron('0 0 * * *')).toBe('Executa todos os dias às 00:00 da manhã');
        expect(explainCron('0 6 * * *')).toBe('Executa todos os dias às 06:00 da manhã');
        expect(explainCron('0 11 * * *')).toBe('Executa todos os dias às 11:00 da manhã');
      });

      test('deve classificar horário da tarde (12:00-17:59)', () => {
        expect(explainCron('0 12 * * *')).toBe('Executa todos os dias às 12:00 da tarde');
        expect(explainCron('0 15 * * *')).toBe('Executa todos os dias às 15:00 da tarde');
        expect(explainCron('0 17 * * *')).toBe('Executa todos os dias às 17:00 da tarde');
      });

      test('deve classificar horário da noite (18:00-23:59)', () => {
        expect(explainCron('0 18 * * *')).toBe('Executa todos os dias às 18:00 da noite');
        expect(explainCron('0 21 * * *')).toBe('Executa todos os dias às 21:00 da noite');
        expect(explainCron('0 23 * * *')).toBe('Executa todos os dias às 23:00 da noite');
      });
    });

    // Testes para casos especiais
    describe('Casos especiais', () => {
      test('deve lidar com minutos com zero à esquerda', () => {
        expect(explainCron('05 9 * * *')).toBe('Executa todos os dias às 09:05 da manhã');
      });

      test('deve lidar com horas com zero à esquerda', () => {
        expect(explainCron('0 01 * * *')).toBe('Executa todos os dias às 01:00 da manhã');
      });

      test('deve priorizar dia da semana sobre dia do mês', () => {
        expect(explainCron('0 9 15 * 1')).toBe('Executa toda segunda-feira às 09:00 da manhã');
      });

      test('deve usar dia do mês quando dia da semana é *', () => {
        expect(explainCron('0 9 15 * *')).toBe('Executa no dia 15 de cada mês às 09:00 da manhã');
      });
    });

    // Testes para dias da semana não mapeados
    describe('Dias da semana não mapeados', () => {
      test('deve retornar formato genérico para dia não mapeado', () => {
        expect(explainCron('0 9 * * 8')).toBe('Executa no dia da semana 8 às 09:00 da manhã');
      });
    });

    // Testes para meses não mapeados
    describe('Meses não mapeados', () => {
      test('deve retornar formato genérico para mês não mapeado', () => {
        expect(explainCron('0 9 * 13 *')).toBe('Executa no mês 13 às 09:00 da manhã');
      });
    });

    // Testes de erro
    describe('Tratamento de erros', () => {
      test('deve retornar mensagem de erro para expressão com poucos campos', () => {
        const result = explainCron('0 9 * *');
        expect(result).toBe('Erro ao interpretar a expressão cron: 0 9 * *');
      });

      test('deve retornar mensagem de erro para expressão com muitos campos', () => {
        const result = explainCron('0 9 * * * *');
        expect(result).toBe('Erro ao interpretar a expressão cron: 0 9 * * * *');
      });

      test('deve retornar mensagem de erro para expressão vazia', () => {
        const result = explainCron('');
        expect(result).toBe('Erro ao interpretar a expressão cron: ');
      });

      test('deve retornar mensagem de erro para expressão com apenas espaços', () => {
        const result = explainCron('   ');
        expect(result).toBe('Erro ao interpretar a expressão cron:    ');
      });

      test('deve retornar mensagem de erro para expressão com um campo', () => {
        const result = explainCron('*');
        expect(result).toBe('Erro ao interpretar a expressão cron: *');
      });
    });

    // Testes para múltiplos espaços entre campos
    describe('Formatação de entrada', () => {
      test('deve lidar com múltiplos espaços entre campos', () => {
        expect(explainCron('0   9   *   *   *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('deve lidar com tabs entre campos', () => {
        expect(explainCron('0\t9\t*\t*\t*')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('deve lidar com espaços no início e fim', () => {
        expect(explainCron('  0 9 * * *  ')).toBe('Executa todos os dias às 09:00 da manhã');
      });
    });

    // Testes para edge cases de horários
    describe('Edge cases de horários', () => {
      test('deve lidar com minuto 0 e hora não específica corretamente', () => {
        expect(explainCron('0 9 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });

      test('deve lidar com hora e minuto específicos', () => {
        expect(explainCron('45 13 * * *')).toBe('Executa todos os dias às 13:45 da tarde');
      });

      test('deve lidar com parsing de números com parseInt', () => {
        expect(explainCron('0 09 * * *')).toBe('Executa todos os dias às 09:00 da manhã');
      });
    });
  });
});
