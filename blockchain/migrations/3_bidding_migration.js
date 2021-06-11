const BiddingCoin = artifacts.require("BiddingCoin");

module.exports = function (deployer) {
    deployer.deploy(BiddingCoin);
};
