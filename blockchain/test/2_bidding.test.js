const BiddingToken = artifacts.require("BiddingToken");
const { assert } = require('chai');
const truffleAssert = require('truffle-assertions');

contract("BiddingToken", function (accounts) {
    let instance;

    before(async () => {
        instance = await BiddingToken.deployed();
    });

    it("should have the contract operator's address", async () => {
        const operator = await instance.operator();
        assert.equal(operator, accounts[0]);
    });

    it("should allow the operator to register participants", async () => {
        await instance.register(accounts[1]);
        await instance.register(accounts[2]);
        await instance.register(accounts[3]);
        assert.ok(instance.isParticipate(accounts[1]));
        assert.ok(instance.isParticipate(accounts[2]));
        assert.ok(instance.isParticipate(accounts[3]));
    });

    it("should revert if non-operator register account", async () => {
        await truffleAssert.reverts(
            instance.register(accounts[4], { from: accounts[1] }),
            "Only Operator can do this."
        );
    });

    it("should reassigning coin give a accounts balance", async () => {
        await instance.reassignCoin(accounts[1], 100, { from: accounts[0] });
        await instance.reassignCoin(accounts[2], 500);
        await instance.reassignCoin(accounts[3], 400);
        let newBalance1 = await instance.balanceOf(accounts[1]);
        let newBalance2 = await instance.balanceOf(accounts[2]);
        let newBalance3 = await instance.balanceOf(accounts[3]);
        assert.equal(newBalance1, 100);
        assert.equal(newBalance2, 500);
        assert.equal(newBalance3, 400);
    });


    it("should revert if reassign coin to non-registered account", async () => {
        await truffleAssert.reverts(
            instance.reassignCoin(accounts[4], 100),
            "Only participate can receive Time Coin."
        );
    });

    it("should participant be able to transfer coins to other participants", async () => {
        await instance.transfer(accounts[1], 100, { from: accounts[2] });
        let newBalance1 = await instance.balanceOf(accounts[1]);
        let newBalance2 = await instance.balanceOf(accounts[2]);
        assert.equal(newBalance1, 200);
        assert.equal(newBalance2, 400);
    });

    it("should revert if transfer coin to non-registered account", async () => {
        await truffleAssert.reverts(
            instance.transfer(accounts[4], 100, { from: accounts[1] }),
            "Only participate can receive Time Coin."
        );
    });

    it("should reassigning overwrite the account balance", async () => {
        await instance.reassignCoin(accounts[1], 255, { from: accounts[0] });
        let newBalance1 = await instance.balanceOf(accounts[1]);
        assert.equal(newBalance1, 255);
    });





});
