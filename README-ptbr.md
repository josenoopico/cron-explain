# 🕒 Cron Explain

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/username/cron-explain)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green.svg)](https://nodejs.org/)

## 🎯 Objetivo

Converter expressões cron em frases legíveis em Português (pt-BR) e outros idiomas suportados.

## 📋 Descrição

Transforme expressões cron em descrições fáceis de entender sobre quando tarefas agendadas serão executadas.

Suporta tanto expressões cron padrão de 5 campos (minuto hora dia-do-mês mês dia-da-semana) quanto o formato node-cron de 6 campos (segundo minuto hora dia-do-mês mês dia-da-semana), seguindo a especificação do [node-cron](https://github.com/kelektiv/node-cron).

Disponível tanto como biblioteca quanto como ferramenta de linha de comando (CLI).

## 🚀 Funcionalidades

- ✅ Dupla finalidade: use como biblioteca ou CLI
- ✅ Interface de linha de comando: uso direto no terminal (npx ou instalação global)
- ✅ Integração como biblioteca: importe no seu projeto Node/TS
- ✅ Suporte a múltiplos idiomas: en-US (padrão), pt-BR, es-ES, fr-FR
- ✅ Interpretação completa: suporta tanto cron padrão de 5 campos quanto formato node-cron de 6 campos
- ✅ Suporte a TypeScript: definições de tipos completas
- ✅ Mensagens de erro amigáveis
- ✅ Zero dependências: leve e rápido

## 📦 Instalação

Requisitos: Node.js >= 18

### Como biblioteca (dependência de projeto)
- npm: `npm install cron-explain`
- yarn: `yarn add cron-explain`
- pnpm: `pnpm add cron-explain`

### Como ferramenta CLI
- Usando npx (sem instalar): `npx cron-explain "0 9 * * 1"`
- Instalação global: `npm i -g cron-explain` e depois `cron-explain "0 9 * * 1"`
- A partir de instalação local do projeto: `npx cron-explain "30 14 * * *"`

## 📥 Uso como biblioteca

- ECMAScript Modules (ESM):
  - `import { explainCron } from 'cron-explain';`
- CommonJS:
  - `const { explainCron } = require('cron-explain');`

Exemplo básico:

```ts
import { explainCron } from 'cron-explain';

// en-US é o idioma padrão
const fraseEnPadrao = explainCron('0 9 * * 1');
console.log(fraseEnPadrao); // ex.: "Runs every Monday at 09:00 AM"

// Passando idioma explicitamente
const frasePt = explainCron('30 14 * * *', 'pt-BR');
console.log(frasePt); // ex.: "Executa todos os dias às 14:30 da tarde"
```

## 🖥️ Uso como CLI

A CLI aceita uma única expressão cron e imprime a explicação.

- Básico:
  - `cron-explain "0 */2 * * *"`
  - `cron-explain "30 14 * * 1-5"`
  - `cron-explain "0 0 1 * *"`

- Idioma:
  - Use `-l` ou `--lang` para selecionar o idioma de saída.
  - Suportados: `en-US` (padrão), `pt-BR`, `es-ES`, `fr-FR`
  - Exemplos:
    - `cron-explain -l pt-BR "30 14 * * 1-5"`
    - `cron-explain --lang en-US "0 0 1 * *"`

- Ajuda:
  - `cron-explain -h`

Se executado sem argumentos, o comando mostra instruções de uso.

## ⏱️ Exemplos de diferentes expressões cron

### Formato cron padrão de 5 campos (minuto hora dia-do-mês mês dia-da-semana)
- A cada 5 minutos: `*/5 * * * *`
- A cada 2 horas (na virada da hora): `0 */2 * * *`
- Todos os dias às 14:30: `30 14 * * *`
- Toda segunda-feira às 09:00: `0 9 * * 1`
- Primeiro dia do mês às 06:00: `0 6 1 * *`
- Intervalo de minutos dentro de uma hora: `10-20 8 * * *` (entre 08:10 e 08:20)
- Intervalo de horas (de hora cheia): `0 9-17 * * 1-5` (das 09:00 às 17:00, seg–sex)
- Dias específicos da semana: `0 12 * * 1,3,5` (seg, qua e sex ao meio-dia)

### Formato node-cron de 6 campos (segundo minuto hora dia-do-mês mês dia-da-semana)
- A cada 30 segundos: `*/30 * * * * *`
- A cada minuto aos 15 segundos: `15 * * * * *`
- A cada 5 minutos aos 0 segundos: `0 */5 * * * *`
- Todos os dias às 14:30:45: `45 30 14 * * *`
- Toda segunda-feira às 09:00:30: `30 0 9 * * 1`
- A cada 10 segundos em dias úteis: `*/10 * * * * 1-5`

Observação: esta biblioteca trabalha tanto com expressões cron padrão de 5 campos quanto com o formato node-cron de 6 campos.

## 📚 Documentação básica da API

- `explainCron(cronExpression: string, language?: SupportedLanguage): string`
  - Converte a expressão cron em uma frase no idioma informado (padrão: 'en-US').
- `explainCronPt(cronExpression: string): string` [deprecated]
  - Mantida por compatibilidade; prefira `explainCron`.
- `getSupportedLanguages(): SupportedLanguage[]`
  - Retorna os códigos de idiomas suportados.
- Tipos exportados: `SupportedLanguage`, `CronTranslations`, `CronExplainerConfig`
- Utilidades: `getTranslations(language)`, `isLanguageSupported(language)`, `defaultConfig`

## 🧑‍💻 Desenvolvimento
- Build: `npm run build`
- Rodar a CLI em dev: `npm run dev:cli` (requer ts-node)
- Testes: `npm test`
- Testes em modo watch: `npm run test:watch`
- Cobertura: `npm run test:coverage`

## 📄 Licença

MIT. Veja o arquivo LICENSE para mais detalhes.