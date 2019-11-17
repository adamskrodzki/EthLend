var Token = artifacts.require("DestructableToken");

contract("Token basics", async function (accounts) {
  var token;
  beforeEach(async function () {
    token = await Token.new(accounts[4]);
    var testerBalance = await web3.eth.getBalance(accounts[0]);
  });
  it("should have 0 balance when newly created", async function () {
    var totalS = (await token.totalSupply()).toNumber();
    assert.equal(totalS, 0);
  });
  afterEach(async function () {
    await token.destroy();
  });
});