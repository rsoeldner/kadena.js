import { createGenerateFromHdCommand } from './commands/keysGenrateFromHd.js';
import { createGenerateHdKeysCommand } from './commands/keysHdGenerate.js';
import { createListKeysCommand } from './commands/keysList.js';
import { createManageKeysCommand } from './commands/keysManage.js';
import { createGeneratePlainKeysCommand } from './commands/keysPlainGenerate.js';

import type { Command } from 'commander';

const SUBCOMMAND_ROOT: 'keys' = 'keys';

export function generate(program: Command, version: string): void {
  const generateProgram = program
    .command('generate')
    .description(`Generate keys`);

  createGenerateHdKeysCommand(generateProgram, version);
  createGeneratePlainKeysCommand(generateProgram, version);
  createGenerateFromHdCommand(generateProgram, version);
}

export function keysCommandFactory(program: Command, version: string): void {
  const keysProgram = program
    .command(SUBCOMMAND_ROOT)
    .description(`Tool to generate and manage keys`);

  generate(keysProgram, version);
  createManageKeysCommand(keysProgram, version);
  createListKeysCommand(keysProgram, version);
}