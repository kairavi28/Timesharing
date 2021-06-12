const Marketplace = artifacts.require("Marketplace");
const chaiModule = require('chai');
const { chaiEthers } = require('chai-ethers');
const truffleAssert = require('truffle-assertions');

chaiModule.use(chaiEthers);
const { expect } = chaiModule;

contract('Marketplace', async (accounts) => {

    let instance;
    let agent;
    let alice;
    let bob;

    before(async () => {
        [agent, alice, bob] = accounts;
        instance = await Marketplace.deployed();
    });

    describe('Init Marketplace', () => {

        it('should init Marketplace', async () => {

            await instance.createNewPorject("sample project #1", 10000);
            await instance.createNewPorject("sample project #2", 20000);

            const totalProjects = await instance.totalProjects();
            expect(totalProjects.toNumber()).to.equal(2);

        });

        it('should show correct info of each project', async () => {

            //check if it reverts 
            await expect(instance.projectInfo(5)).to.be.revertedWith('!exists');

            //find each project's total supply
            const project0 = await instance.projectInfo(0);

            const unitPrice1 = web3.utils.toWei('5', 'gwei');

            expect(project0.projectName).to.equal("sample project #1");
            expect(`${project0.unitPrice.toNumber()}`).to.equal(unitPrice1);
            expect(project0.totalSupply.toNumber()).to.equal(10000);

        });

    });

    describe('Buy Tokens', () => {

        it('should buy some tokens for existing projects', async () => {

            await expect(instance.buySomeShares(5, 0)).to.be.revertedWith('!amount');
            await expect(instance.buySomeShares(5, 1)).to.be.revertedWith('!exists');

        });

        it('should buy not more than project totalSupply', async () => {

            await expect(instance.buySomeShares(0, 11000)).to.be.revertedWith('!totalSupply');

        });

        it('should send enough ethers', async () => {

            //min 5 gwei required
            await expect(instance.buySomeShares(0, 1, { value: web3.utils.toWei('1', 'gwei') })).to.be.revertedWith('!ether');

        });

        it('should check RBAC', async () => {

            await expect(instance.balanceOf(0, { from: bob })).to.be.revertedWith('!owner');

        });

        it('should buy shares', async () => {

            await instance.buySomeShares(0, 1, { from: bob, value: web3.utils.toWei('5', 'gwei') });
            const balanceOfAfter1 = await instance.balanceOf(0, { from: bob });
            await instance.buySomeShares(0, 1, { from: bob, value: web3.utils.toWei('5', 'gwei') });
            const balanceOfAfter2 = await instance.balanceOf(0, { from: bob });

            expect(balanceOfAfter1.toNumber()).to.equal(1);
            expect(balanceOfAfter2.toNumber()).to.equal(2);
            await expect(instance.balanceOf(0, { from: alice })).to.be.revertedWith('!owner');

        });
    });

    describe('Reassing Bidding Tokens', () => {

        it('should claim tokens', async () => {

            await expect(instance.claimTokens({ from: alice })).to.be.revertedWith('!owner');
            await expect(instance.claimTokens({ from: bob })).to.be.revertedWith('Already received tokens.');

        });

    });

    describe('Bidding', () => {

        it('should create new bidding item', async () => {
            await instance.createBidding("Bidding 01");
            expect(await instance.biddingExists(0)).to.be.true;
        });

        it('should be bidding customer', async () => {

            const biddingItem = 0;
            await expect(instance.bid(biddingItem, 5, { from: alice })).to.be.revertedWith('!owner');

        });

        it('should show the winner correctly', async () => {

            const biddingItem = 0;
            await instance.bid(biddingItem, 5, { from: bob });
            await instance.closeBidding(biddingItem);

            expect(await instance.showBiddingWinner(biddingItem)).to.equal(bob);
        });

    });

});