var Token = artifacts.require("DestructableToken");

contract("Token", async function(accounts) {
  var token;
  beforeEach(async function() {
    token = await Token.new();
  });
  it("should assert true", async function() {
    assert.isTrue(true);
  });
  afterEach(async function() {
    await token.destroy();
  });
});
