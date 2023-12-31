import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-watcher";
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "dotenv/config";
import "hardhat-watcher";
import "hardhat-contract-sizer";

const fs = require("fs");
const { exec } = require("child_process");

export const getEnv = env => {
  const value = process.env[env];
  if (typeof value === 'undefined') {
    console.log(`${env} has not been set.`);
    return "";
  }
  return value;
};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
task("doc", "Update .md").setAction(async () => {
  await exec("npm run docify", (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000, 
        details: {
          yulDetails: {
            optimizerSteps: "u",
          },
        },
      }
    }
  },
  contractSizer: {
    runOnCompile: true,
    unit: "B",
  },
  gasReporter: {
    enabled: true,
    gasPrice: 31,
    currency: 'USD',
    token: 'MATIC',
    noColors: false
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      /**
       * blockGasLimit settings for different chains
       * For BSC: https://bscscan.com/chart/gaslimit
       * : 140000000
       * 
       * For Polygon: https://forum.polygon.technology/t/increasing-gas-limit-to-30m/1652
       * : 30000000
       * 
       * For Ethereum: https://ycharts.com/indicators/ethereum_average_gas_limit
       * : 30000000
       */
      blockGasLimit: 30000000,
      accounts: [
        {
          privateKey: getEnv('TEST_PRIVATEKEY'),
          balance: "10000000000000000000000"
        },
        {
          privateKey: getEnv('TEST_PRIVATEKEY2'),
          balance: "10000000000000000000000"
        },
        {
          privateKey: getEnv('TEST_PRIVATEKEY3'),
          balance: "10000000000000000000000"
        },
        {
          privateKey: getEnv('TEST_PRIVATEKEY4'),
          balance: "10000000000000000000000"
        },
      ],
      mining:{
        auto: true,
        interval: 5000
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    serviceWallet: {
      default: 1,
    },
    creator: {
      default: 3,
    },
    user_1: {
      default: 5,
    },
},
  watcher: {
    dev: {
      tasks: ["test"],
      files: ["./contracts", "./test"],
      verbose: true,
    },
    doc: {
      tasks: ["doc"],
      files: ["./contracts"],
      verbose: true,
    },
  },
  mocha: {
    timeout: 14000000,
  },
};

export default config;
