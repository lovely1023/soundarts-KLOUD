
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";

import { utils, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });


import "./scripts/deploy"
import "./scripts/push-metadata-update";
import "./scripts/verify";
import "./scripts/send-eth";
import "./scripts/set-baseuri";
import "./scripts/gen-whitelist";
import("./scripts/initialize-sale")
.catch((err) => {
  console.log("./scripts/initialize-sale not imported until after build completes")
});
import "./scripts/grant-roles";


const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || "";
const ALCHEMY_RINKEBY_PROJECT_ID = process.env.ALCHEMY_RINKEBY_PROJECT_ID || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || (Wallet.createRandom()).privateKey;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.10",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {
      gasPrice: utils.parseUnits("60", "gwei").toNumber(),
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_PROJECT_ID}`,
      accounts: [DEPLOYER_PRIVATE_KEY],
      gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_RINKEBY_PROJECT_ID}`,
      accounts: [DEPLOYER_PRIVATE_KEY],
      gasPrice: utils.parseUnits("5", "gwei").toNumber(),
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_PROJECT_ID}`,
      accounts: [DEPLOYER_PRIVATE_KEY],
      gasPrice: utils.parseUnits("1", "gwei").toNumber(),
    },
  },
  abiExporter: {
    path: "./dist/abi",
    clear: false,
    flat: true
  },
  typechain: {
    outDir: './dist/types',
    target: 'ethers-v5',
  },
};


export default config;