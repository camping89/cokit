// update command - Update CoKit to latest version
import { Command } from 'commander';
import { info, done, hint, bold, cyan } from '../utils/colors.js';

export const updateCommand = new Command('update')
  .description('Update CoKit to the latest version')
  .action(async () => {
    console.log();
    console.log(bold(cyan('Updating CoKit...')));
    console.log();

    info('CoKit is distributed via npx - it always uses the latest version.');
    console.log();
    hint('To update templates in your project, run:');
    console.log('  npx cokit init --overwrite');
    console.log();
    hint('To update personal skills, run:');
    console.log('  npx cokit init --global --overwrite');
    console.log();
    done('No action needed - npx always fetches latest!');
    console.log();
  });
