# 🕒 Cron Explain

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/cron-explain)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green.svg)](https://nodejs.org/)

## 🎯 Objective

Convert cron expressions into readable phrases in Portuguese (pt-BR) and other supported languages.

## 📋 Description

Transform 5-field cron expressions (minute hour day-of-month month day-of-week) into easy-to-understand descriptions of when scheduled tasks will run.

Available as both a library and a command-line tool.

## 🚀 Features

- ✅ Dual functionality: use as a library or a CLI
- ✅ Command-line interface: direct terminal usage (npx or global install)
- ✅ Library integration: import into your Node/TS projects
- ✅ Multi-language support: en-US (default), pt-BR, es-ES, fr-FR
- ✅ Complete cron parsing: all 5 standard fields supported
- ✅ TypeScript support: full type definitions
- ✅ Helpful error messages
- ✅ Zero dependencies: lightweight and fast

## 📦 Installation

Requirements: Node.js >= 18

### As a library (project dependency)
- npm: `npm install cron-explain`
- yarn: `yarn add cron-explain`
- pnpm: `pnpm add cron-explain`

### As a CLI tool
- Using npx (no install): `npx cron-explain "0 9 * * 1"`
- Global install: `npm i -g cron-explain` then run `cron-explain "0 9 * * 1"`
- From a local project install: `npx cron-explain "30 14 * * *"`

## 📥 Usage as a library

- ESM:
  - `import { explainCron } from 'cron-explain';`
- CommonJS:
  - `const { explainCron } = require('cron-explain');`

Basic usage:

```ts
import { explainCron } from 'cron-explain';

// en-US is the default language
const phraseEnDefault = explainCron('0 9 * * 1');
console.log(phraseEnDefault); // e.g. "Runs every Monday at 09:00 AM"

// Specify language explicitly
const phrasePt = explainCron('30 14 * * *', 'pt-BR');
console.log(phrasePt); // e.g. "Executa todos os dias às 14:30 da tarde"
```

## 🖥️ Usage as a CLI

The CLI accepts a single cron expression and prints the explanation (default language: en-US).

- Basic:
  - `cron-explain "0 */2 * * *"`
  - `cron-explain "30 14 * * 1-5"`
  - `cron-explain "0 0 1 * *"`

If you run without arguments, it shows usage help.

Note: Current CLI uses the default language (en-US). For other languages, prefer using the library API.

## ⏱️ Examples of cron expressions
- Every 5 minutes: `*/5 * * * *`
- Every 2 hours (at the top of the hour): `0 */2 * * *`
- Every day at 14:30: `30 14 * * *`
- Every Monday at 09:00: `0 9 * * 1`
- First day of the month at 06:00: `0 6 1 * *`
- Minute range within an hour: `10-20 8 * * *` (between 08:10 and 08:20)
- Hour range (at the top of each hour): `0 9-17 * * 1-5` (from 09:00 to 17:00, Mon–Fri)
- Specific days of the week: `0 12 * * 1,3,5` (Mon, Wed, and Fri at noon)

Note: This library works with 5-field cron expressions.

## 📚 Basic API
- `explainCron(cronExpression: string, language?: SupportedLanguage): string`
  - Converts the cron expression into a phrase in the specified language (default: 'en-US').
- `explainCronPt(cronExpression: string): string` [deprecated]
  - Maintained for compatibility; prefer `explainCron`.
- `getSupportedLanguages(): SupportedLanguage[]`
  - Returns supported language codes.
- Exported types: `SupportedLanguage`, `CronTranslations`, `CronExplainerConfig`
- Utilities: `getTranslations(language)`, `isLanguageSupported(language)`, `defaultConfig`

## 🧑‍💻 Development
- Build: `npm run build`
- Run CLI in dev: `npm run dev:cli` (requires ts-node)
- Run tests: `npm test`
- Watch tests: `npm run test:watch`
- Coverage: `npm run test:coverage`

## 📄 License
MIT. See the LICENSE file for more details.


