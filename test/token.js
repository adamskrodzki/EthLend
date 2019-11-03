var Token = artifacts.require("DestructableToken");

contract("Token", async function (accounts) {
  var token;
  beforeEach(async function () {
    token = await Token.new();
    var testerBalance = await web3.eth.getBalance(accounts[0]);
  });
  it("should assert true", async function () {
    assert.isTrue(true);
  });
  it("should have 0 balance when newly created", async function () {
    var totalS = (await token.totalSupply()).toNumber();
    assert.equal(totalS, 0);
  });

  describe('deposit', async function () {

    it("should not fail on not zero deposit", async function () {
      await token.deposit({
        from: accounts[0],
        value: web3.utils.toWei("1", "ether")
      })
    });
    it("should fail on zero deposits", async function () {

      var promise = token.deposit({
        from: accounts[0],
        value: web3.utils.toWei("0", "ether")
      })
      try {
        await promise;
        assert.isTrue(false);
      } catch (ex) {
        assert.isTrue(ex.toString().indexOf("Reason given: You must deposit some eth") != -1, "some other exception");
      }
    });

    it("should mint amount of tokens equal to amount of eth if no earnings", async function () {
      var amountToDeposit = web3.utils.toWei("1", "ether");
      for (var i = 0; i < 10; i++) {
        await web3.eth.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          value: amountToDeposit
        });

        await token.deposit({
          from: accounts[1],
          value: amountToDeposit
        })

        var amount = (await token.balanceOf(accounts[1])).toString();
        await token.transfer(accounts[0], amount, {
          from: accounts[1]
        });

        assert.equal(amount, amountToDeposit, "comparition failed for interation " + i);
      }
    })


  });

  describe("withdraw", async function () {
    var amountToDeposit = web3.utils.toWei("1", "ether");
    var amountToDeposit2 = web3.utils.toWei("1.3", "ether");
    beforeEach(async function () {

      await token.deposit({
        from: accounts[1],
        value: amountToDeposit2
      })

      await token.deposit({
        from: accounts[2],
        value: amountToDeposit
      })

    })


    it("should allow withdraw of all tokens user deposited", async function () {
      await token.withdraw(amountToDeposit, {
        from: accounts[2]
      });

    });
    it("should deny withdraw of more funds than user have", async function () {
      var promise = token.withdraw("1000000000000000001", {
        from: accounts[2]
      });

      try {
        await promise;
        assert.isTrue(false);
      } catch (ex) {
        assert.isTrue(ex.toString().indexOf("Reason given: ERC20: burn amount exceeds balance") != -1, "some other exception");
      }
    });

    it("should return all deposited funds to the user", async function () {
      var balanceBefore = new web3.utils.BN(await web3.eth.getBalance(accounts[2]));
      await token.withdraw(amountToDeposit, {
        from: accounts[2]
      });
      var balanceAfter = new web3.utils.BN(await web3.eth.getBalance(accounts[2]));
      var balanceDifference = balanceAfter.sub(balanceBefore);
      assert.equal(balanceDifference.toString(), amountToDeposit.toString())

    })


  })



  afterEach(async function () {
    await token.destroy();
  });
});