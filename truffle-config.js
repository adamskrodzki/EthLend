const path = require("path");

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic =
  "trophy pear mail office shield gym merry deer toilet west interest casual cattle talent kingdom";
var infuraRinkebyUrl =
  "https://rinkeby.infura.io/v3/3baae2e6c67c435689a674e3634cc8b2";
var provider = new HDWalletProvider(mnemonic, infuraRinkebyUrl, 0, 1, false);

console.log("Test ", provider.address);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "vapp/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      gasPrice: 0,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: provider,
      network_id: 4, // eslint-disable-line camelcase
      gasPrice: "7000000000",
      gas: 6000000
    }
  }
};
