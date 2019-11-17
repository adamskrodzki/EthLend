var Token = artifacts.require("DestructableToken");
var Lender = artifacts.require("DestructableLender");
var ExampleValidCaller = artifacts.require("ExampleValidCaller");


contract("Lender", async function (accounts) {
    var token;
    var lender;
    var balanceBefore;
    var goodActor;
    beforeEach(async function () {

        lender = await Lender.new();
        token = await Token.new(lender.address);
        await lender.init(token.address);
        goodActor = await ExampleValidCaller.new(lender.address);
        await goodActor.deposit({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether")
        });
        await token.deposit({
            from: accounts[1],
            value: web3.utils.toWei("1", 'ether')
        });
        balanceBefore = (await web3.eth.getBalance(accounts[2]));
        await token.deposit({
            from: accounts[2],
            value: web3.utils.toWei("1", 'ether')
        });

    });
    it("callLenderCorrectly should not throw", async function () {
        await goodActor.callLenderCorrectly();
    });
    it("callLenderCorrectly should increase balance of stakeholder on withdraw", async function () {
        await goodActor.callLenderCorrectly();
        var tokAmount = await token.balanceOf(accounts[2]);
        await token.withdraw(tokAmount.toString(), {
            from: accounts[2]
        });
        var balanceAfter = (await web3.eth.getBalance(accounts[2]));
        var surplus = balanceAfter - balanceBefore;
        assert.isAbove(surplus, 0, "surplus negative");
    });
    it("callLenderCorrectly should increase balance of DestructableToken", async function () {
        var balance = (await web3.eth.getBalance(token.address));
        await goodActor.callLenderCorrectly();
        balance = (await web3.eth.getBalance(token.address)) - balance;
        assert.isAbove(balance, 0, "balance negative");
    });
    it("callLenderCorrectly should increase balance of Lender", async function () {
        var balance = (await web3.eth.getBalance(lender.address));
        await goodActor.callLenderCorrectly();
        balance = (await web3.eth.getBalance(lender.address)) - balance;
        assert.isAbove(balance, 0, "balance negative");
    });
    it("callLenderNoFee should throw `fee not paid`", async function () {
        try {
            await goodActor.callLenderNoFee();
            throw "revert expected";
        } catch (ex) {
            assert.isTrue(ex.toString().indexOf("Reason given: fee not paid") != -1, "some other exception:" + ex.toString());
        }
    });
    it("callLenderCheater should throw `not all funds returned`", async function () {
        try {
            await goodActor.callLenderCheater();
            throw "revert expected";
        } catch (ex) {
            assert.isTrue(ex.toString().indexOf("Reason given: not all funds returned") != -1, "some other exception:" + ex.toString());
        }
    });
    it("callLenderCheater2 should throw `not all funds returned`", async function () {
        try {
            await goodActor.callLenderCheater2();
            throw "revert expected";
        } catch (ex) {
            assert.isTrue(ex.toString().indexOf("Reason given: not all funds returned") != -1, "some other exception:" + ex.toString());
        }
    });
    afterEach(async function () {
        await token.destroy();
        await goodActor.destroy();
        await lender.destroy();
    });
});