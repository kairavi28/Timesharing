const OwnershipToken = artifacts.require("OwnershipToken");
const chaiModule = require('chai');
const { chaiEthers } = require('chai-ethers');
const truffleAssert = require('truffle-assertions');

chaiModule.use(chaiEthers);
const { expect } = chaiModule;

contract('OwnershipToken', async (accounts) => {

    let instance;
    let agent;
    let alice;
    let bob;

    before(async () => {
        [agent, alice, bob] = accounts;
        instance = await OwnershipToken.deployed();
    });

    describe('Init Ownership', () => {

        it('should init OwnershipToken', async () => {

            const unitPrice = web3.utils.toWei('5', 'ether');
            const totalShares = 10000;
            await instance.initToken(unitPrice, totalShares);

        });


    });


});