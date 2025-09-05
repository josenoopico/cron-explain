#!/usr/bin/env node

import { explainCron, getSupportedLanguages } from './index';
import { isLanguageSupported } from './i18n/loader';

const args = process.argv.slice(2);

function printUsage() {
  const langs = getSupportedLanguages().join(', ');
  console.log('Usage: cron-explain [options] "<cron-expression>"');
  console.log('');
  console.log('Options:');
  console.log('  -l, --lang <code>    Set language (supported: ' + langs + ')');
  console.log('  -h, --help           Show this help');
  console.log('');
  console.log('Examples:');
  console.log('  cron-explain "0 */2 * * *"');
  console.log('  cron-explain -l pt-BR "30 14 * * 1-5"');
  console.log('  cron-explain --lang en-US "0 0 1 * *"');
}

// Show usage if no arguments provided
if (args.length === 0) {
  printUsage();
  process.exit(1);
}

let language: string | undefined;
let cronExpression: string | undefined;

// Simple argument parsing to support flags anywhere
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-h' || arg === '--help') {
    printUsage();
    process.exit(0);
  } else if (arg === '-l' || arg === '--lang') {
    const value = args[i + 1];
    if (!value || value.startsWith('-')) {
      console.error('Error: Missing value for ' + arg);
      console.log('');
      printUsage();
      process.exit(1);
    }
    language = value;
    i++; // skip value
  } else if (!cronExpression && !arg.startsWith('-')) {
    cronExpression = arg;
  } else if (!arg.startsWith('-') && cronExpression) {
    // If there are multiple positional args, append to cron expression
    // to allow users to avoid quoting (best effort)
    cronExpression += ' ' + arg;
  }
}

if (!cronExpression) {
  console.error('Error: Missing <cron-expression>.');
  console.log('');
  printUsage();
  process.exit(1);
}

if (language && !isLanguageSupported(language)) {
  const langs = getSupportedLanguages().join(', ');
  console.error(`Error: Unsupported language "${language}". Supported: ${langs}`);
  process.exit(1);
}

try {
  const explanation = explainCron(cronExpression, language);
  console.log(explanation);
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
}
