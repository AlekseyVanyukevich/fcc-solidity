import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import './tasks/block-number';
import 'hardhat-gas-reporter';
import 'dotenv/config';
import 'solidity-coverage';
import '@typechain/hardhat';

const PINKEY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COIN_MARKETCAP_KEY = process.env.COIN_MARKETCAP_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: PINKEY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COIN_MARKETCAP_KEY,
    token: 'MATIC'
  }
};
