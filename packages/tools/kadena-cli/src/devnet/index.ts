import { devnetStartCommand } from './commands/start.js';

import type { Command } from 'commander';

const SUBCOMMAND_ROOT: 'devnet' = 'devnet';

export function devnetCommandFactory(program: Command, version: string): void {
  const devnetProgram = program
    .command(SUBCOMMAND_ROOT)
    .description(`Tool for starting, stopping and managing the local devnet`);

  devnetStartCommand(devnetProgram, version);
}