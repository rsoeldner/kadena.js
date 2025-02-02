import type { Command } from 'commander';
import path from 'path';

import { defaultNetworksPath } from '../../constants/networks.js';
import { services } from '../../services/index.js';
import { createCommand } from '../../utils/createCommand.js';
import { log } from '../../utils/logger.js';
import { networkOptions } from '../networkOptions.js';
import { writeNetworks } from '../utils/networkHelpers.js';

export const createNetworksCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'add',
  'Add local network configuration',
  [
    networkOptions.networkName({ isOptional: false }),
    networkOptions.networkId({ isOptional: false }),
    networkOptions.networkHost({ isOptional: false }),
    networkOptions.networkExplorerUrl(),
    networkOptions.networkOverwrite(),
  ],
  async (option, { collect }) => {
    const config = await collect(option);
    log.debug('network-create:action', config);

    const filePath = path.join(
      defaultNetworksPath,
      `${config.networkName}.yaml`,
    );

    if (
      !(await services.filesystem.fileExists(filePath)) &&
      config.networkOverwrite === 'no'
    ) {
      log.warning(
        `\nThe existing network configuration "${config.networkName}" will not be updated.\n`,
      );
      return;
    }

    const networkConfig = {
      network: config.networkName,
      networkId: config.networkId,
      networkHost: config.networkHost,
      networkExplorerUrl: config.networkExplorerUrl,
    };

    await writeNetworks(networkConfig);

    log.info(
      log.color.green(
        `\nThe network configuration "${config.networkName}" has been saved.\n`,
      ),
    );
  },
);
