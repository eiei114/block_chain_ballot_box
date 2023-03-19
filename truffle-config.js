/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'your mnemonic here';
const web3APIKey = "your web3 API key here";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Ganacheのデフォルトホスト
      port: 8545, // Ganacheのデフォルトポート
      network_id: "*", // 任意のネットワークIDにマッチさせる
    },
    goerli: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: mnemonic,
            },
            providerOrUrl: `https://goerli.infura.io/v3/${web3APIKey}`,
          }),
      network_id: '5',
      gas: 4465030
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Solidityのバージョンを指定
    },
  },
};
