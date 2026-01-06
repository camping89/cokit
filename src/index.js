// CoKit CLI - Make GitHub Copilot smarter in 30 seconds
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { doctorCommand } from './commands/doctor.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program
  .name('cokit')
  .description('Make GitHub Copilot smarter in 30 seconds')
  .version('1.0.0');

// Register commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(doctorCommand);
program.addCommand(updateCommand);

program.parse();
