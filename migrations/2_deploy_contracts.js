const TutorialToken = artifacts.require("TutorialToken");

module.exports = async function (deployer, network) {
  if (network == 'test') {
    return;
  }
  await deployer.deploy(TutorialToken, "0x94DA43C587c515AD30eA86a208603a7586D2C25F");
};