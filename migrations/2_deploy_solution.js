const TxLendToken = artifacts.require("TxLendToken");
const Lender = artifacts.require("Lender");

module.exports = async function(deployer, network, acc) {
  if (network == "test") {
    return;
  }
  await deployer.deploy(Lender);

  var lender = await Lender.deployed();
  await deployer.deploy(TxLendToken, lender.address);
  var token = await TxLendToken.deployed();
  await lender.init(token.address);
};
