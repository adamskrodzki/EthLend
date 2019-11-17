var Token = artifacts.require("DestructableToken");
var BadActor = artifacts.require("BadActor");
var GoodActor = artifacts.require("GoodActor");

contract("Token", async function (accounts) {
  var token;
  var badActor;
  beforeEach(async function () {
    token = await Token.new(accounts[4]);
    badActor = await BadActor.new(token.address);
    goodActor = await GoodActor.new(token.address);
    badActor.deposit({
      from: accounts[1],
      value: web3.utils.toWei("1.1", "ether")
    })
    goodActor.deposit({
      from: accounts[1],
      value: web3.utils.toWei("1.1", "ether")
    })
  });
  describe("reentrancy", async function () {
    it("badActor should fail on withdraw()", async function () {

      var promise = badActor.withdraw();

      try {
        await promise;
        assert.isTrue(false);
      } catch (ex) {
        assert.isTrue(ex.toString().indexOf("ReentrancyGuard: reentrant call") != -1, "some other exception " + ex.toString());
      }

    });
    it("goodActor should not fail on withdraw()", async function () {
      await goodActor.withdraw();
    });
  })
  afterEach(async function () {
    await token.destroy();
    await badActor.destroy();
    await goodActor.destroy();
  });
});