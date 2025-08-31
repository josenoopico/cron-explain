#!/usr/bin/env node

import { explainCron } from './index';


const args = process.argv.slice(2);

// Show usage if no arguments provided
if (args.length === 0) {
    console.log('Usage: cron-explain "<cron-expression>"');
    console.log('');
    console.log('Examples:');
    console.log('  cron-explain "0 */2 * * *"');
    console.log('  cron-explain "30 14 * * 1-5"');
    console.log('  cron-explain "0 0 1 * *"');
    process.exit(1);
}

// Get the cron expression from command line arguments
const cronExpression = args[0];

try {
    const explanation = explainCron(cronExpression);
    console.log(explanation);
} catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
}
