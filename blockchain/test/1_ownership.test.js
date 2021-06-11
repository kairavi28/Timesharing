const OwnershipCoin = artifacts.require("OwnershipCoin");
const chaiModule = require('chai');
const { chaiEthers } = require('chai-ethers');
const truffleAssert = require('truffle-assertions');

chaiModule.use(chaiEthers);
const { expect } = chaiModule;

contract('OwnershipCoin', async (accounts) => {

    let instance;
    let agent;
    let alice;
    let bob;

    before(async () => {
        [agent, alice, bob] = accounts;
        instance = await OwnershipCoin.deployed();
    });

    describe('Init Ownership', () => {

        it('should init OwnershipCoin', async () => {

            await instance.createNewPorject("sample project #1", 10000);
            await instance.createNewPorject("sample project #2", 20000);

            const totalSupply = await instance.totalSupply();
            expect(totalSupply.toNumber()).to.equal(30000);

        });

    });

});