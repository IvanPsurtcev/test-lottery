require("@nomiclabs/hardhat-waffle");

const INFURA_URL = 'https://rinkeby.infura.io/v3/0e7fc83d517e43c8b15c10f887a9a59a';
const PRIVATE_KEY = '318dc5e9410a39af91dad8819cc43b16fde6d77a24d780219d80eb2b6071cda9';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
