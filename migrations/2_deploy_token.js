const TxLendToken = artifacts.require("TxLendToken");

module.exports = async function (deployer, network, acc) {
  if (network == 'test') {
    return;
  }
  await deployer.deploy(TxLendToken, acc[0]);
};