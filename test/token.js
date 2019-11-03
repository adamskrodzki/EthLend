var Token = artifacts.require("Token");

contract("Token", function(accounts) {
  it("should assert true", function(done) {
    var token = Token.deployed();
    assert.isTrue(true);
    done();
  });
});
