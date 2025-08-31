# 🕒 Cron Explain

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/cron-explain)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green.svg)](https://nodejs.org/)

## 🎯 Objetivo

Converter expressões cron em frases legíveis em Português (pt-BR) e outros idiomas suportados.

## 📋 Descrição

Transforme expressões cron de 5 campos (minuto hora dia-do-mês mês dia-da-semana) em descrições fáceis de entender sobre quando tarefas agendadas serão executadas.

## 🚀 Funcionalidades

- Converte expressões cron em texto em Português
- Suporte a múltiplos idiomas (pt-BR, en-US, es-ES, fr-FR)
- Interpretação de todos os campos do cron (minuto, hora, dia do mês, mês, dia da semana)
- Interface simples e intuitiva

## 📦 Instalação

Requisitos: Node.js >= 18

- npm:
  - Instalar: `npm install cron-explain`
  - Testes (opcional): `npm test`
  - Build (opcional): `npm run build`
- yarn:
  - Instalar: `yarn add cron-explain`
- pnpm:
  - Instalar: `pnpm add cron-explain`

## 📥 Importação e uso básico

- ECMAScript Modules (ESM):
  - `import { explainCron } from 'cron-explain';`
- CommonJS:
  - `const { explainCron } = require('cron-explain');`

Uso básico:

```ts
import { explainCron } from 'cron-explain';

// pt-BR é o idioma padrão
const frasePt = explainCron('0 9 * * 1');
console.log(frasePt); // "Executa toda segunda-feira às 09:00 da manhã"

// Passando idioma explicitamente
const fraseEn = explainCron('30 14 * * *', 'en-US');
console.log(fraseEn);
```

## 🧪 Exemplos de uso (TypeScript e JavaScript)

TypeScript:
```ts
import { explainCron, getSupportedLanguages } from 'cron-explain';

const examples = [
  '*/15 * * * *', // a cada 15 minutos
  '0 */2 * * *',  // a cada 2 horas
  '0 9 * * 1',    // toda segunda às 09:00
  '30 14 * * *',  // diariamente às 14:30
  '0 6 1 * *',    // dia 1 de cada mês às 06:00
];

for (const exp of examples) {
  console.log(exp, '=>', explainCron(exp, 'pt-BR'));
}

console.log('Idiomas suportados:', getSupportedLanguages());
```

JavaScript (CommonJS):
```js
const { explainCron, getSupportedLanguages } = require('cron-explain');

console.log(explainCron('*/10 * * * *')); // a cada 10 minutos
console.log(getSupportedLanguages());
```

## ⏱️ Exemplos de diferentes expressões cron

- A cada 5 minutos: `*/5 * * * *`
- A cada 2 horas (na virada da hora): `0 */2 * * *`
- Todos os dias às 14:30: `30 14 * * *`
- Toda segunda-feira às 09:00: `0 9 * * 1`
- Primeiro dia do mês às 06:00: `0 6 1 * *`
- Intervalo de minutos dentro de uma hora: `10-20 8 * * *` (entre 08:10 e 08:20)
- Intervalo de horas (de hora cheia): `0 9-17 * * 1-5` (das 09:00 às 17:00, seg–sex)
- Dias específicos da semana: `0 12 * * 1,3,5` (seg, qua e sex ao meio-dia)

Observação: esta biblioteca trabalha com expressões cron de 5 campos.

## 📚 Documentação básica da API

- explainCron(cronExpression: string, language?: SupportedLanguage): string
  - Converte a expressão cron em uma frase no idioma informado (padrão: 'pt-BR').
- explainCronPt(cronExpression: string): string [deprecated]
  - Mantida por compatibilidade; prefira explainCron.
- getSupportedLanguages(): SupportedLanguage[]
  - Retorna os códigos de idiomas suportados.
- Tipos exportados: SupportedLanguage, CronTranslations, CronExplainerConfig
- Utilidades: getTranslations(language), isLanguageSupported(language), defaultConfig

## 📄 Licença

MIT. Veja o arquivo LICENSE para mais detalhes.