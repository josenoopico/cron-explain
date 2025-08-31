# 🕒 Cron Explain

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/cron-explain)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green.svg)](https://nodejs.org/)

## 🎯 Objective

Convert cron expressions into readable phrases in Portuguese (pt-BR) and other supported languages.

## 📋 Description

Transform 5-field cron expressions (minute hour day-of-month month day-of-week) into easy-to-understand descriptions of when scheduled tasks will run.

## 🚀 Features

- Converts cron expressions to text in Portuguese
- Multi-language support (pt-BR, en-US, es-ES, fr-FR)
- Interpretation of all cron fields (minute, hour, day of month, month, day of week)
- Simple and intuitive interface

## 📦 Installation

Requirements: Node.js >= 18

- npm:
    - Install: `npm install cron-explain`
    - Tests (optional): `npm test`
    - Build (optional): `npm run build`
- yarn:
    - Install: `yarn add cron-explain`
- pnpm:
    - Install: `pnpm add cron-explain`

## 📥 Import and Basic Usage

- ECMAScript Modules (ESM):
    - `import { explainCron } from 'cron-explain';`
- CommonJS:
    - `const { explainCron } = require('cron-explain');`

Basic usage:

```ts
import { explainCron } from 'cron-explain';

// pt-BR is the default language
const phrasePt = explainCron('0 9 * * 1');
console.log(phrasePt); // "Executa toda segunda-feira às 09:00 da manhã"

// Passing language explicitly
const phraseEn = explainCron('30 14 * * *', 'en-US');
console.log(phraseEn); // "Runs every Monday at 09:00 AM"
```

## ⏱️ Different Cron Expression Examples
- Every 5 minutes: `*/5 * * * *`
- Every 2 hours (at the top of the hour): `0 */2 * * *`
- Every day at 14:30: `30 14 * * *`
- Every Monday at 09:00: `0 9 * * 1`
- First day of the month at 06:00: `0 6 1 * *`
- Minute range within an hour: `10-20 8 * * *` (between 08:10 and 08:20)
- Hour range (at the top of each hour): `0 9-17 * * 1-5` (from 09:00 to 17:00, Mon–Fri)
- Specific days of the week: `0 12 * * 1,3,5` (Mon, Wed, and Fri at noon)

Note: This library works with 5-field cron expressions.
## 📚 Basic API Documentation
- explainCron(cronExpression: string, language?: SupportedLanguage): string
    - Converts the cron expression into a phrase in the specified language (default: 'pt-BR').

- explainCronPt(cronExpression: string): string [deprecated]
    - Maintained for compatibility; prefer explainCron.

- getSupportedLanguages(): SupportedLanguage[]
    - Returns supported language codes.

- Exported types: SupportedLanguage, CronTranslations, CronExplainerConfig
- Utilities: getTranslations(language), isLanguageSupported(language), defaultConfig

## 📄 License
MIT. See the LICENSE file for more details.


