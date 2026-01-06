// Colorized console output
import chalk from 'chalk';

export const success = (msg) => console.log(chalk.green('✓'), msg);
export const error = (msg) => console.log(chalk.red('✗'), msg);
export const warn = (msg) => console.log(chalk.yellow('⚠'), msg);
export const info = (msg) => console.log(chalk.blue('ℹ'), msg);
export const done = (msg) => console.log(chalk.green.bold('🎉'), msg);
export const hint = (msg) => console.log(chalk.gray('  →'), chalk.gray(msg));

// Styled text helpers
export const bold = chalk.bold;
export const dim = chalk.dim;
export const cyan = chalk.cyan;
