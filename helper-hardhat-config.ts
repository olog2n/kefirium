import { BigNumberish, BigNumber } from 'ethers';
import { Address } from 'hardhat-deploy/types';
import { ethers } from 'hardhat'

import "dotenv/config";
import { StringSupportOption } from 'prettier';

export const getEnv = env => {
    const value = process.env[env];
    if (typeof value === 'undefined') {
      console.log(`${env} has not been set.`);
      return "";
    }
    return value;
  };

export interface networkConfigItem {
    blockConfirmations?: number
    kefirium: {
        name: string
        symbol: string
    },
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    hardhat: {
        kefirium: {
            name: "Kefirium",
            symbol: "KEF"
        }
    }
}

export const developmentChains = ["hardhat"]
