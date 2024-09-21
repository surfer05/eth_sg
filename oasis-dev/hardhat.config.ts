import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@oasisprotocol/sapphire-hardhat';

import "./tasks/deploy"

// const TEST_HDWALLET = {
//   mnemonic = "test test test test test test test test test test test junk",
//   path : "m/44'/60'/0'/0",
//   initialIndex: 0,
//   count: 20,
//   paraphrase : " ",

// }

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    'sapphire-testnet': {
      // This is Testnet! If you want Mainnet, add a new network config item.
      url: "https://testnet.sapphire.oasis.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
      chainId: 0x5aff,
    },
  },
};

export default config;
 
const accounts = process.env.PRIVATE_KEY 
