const BiddingToken = artifacts.require("BiddingToken");

module.exports = function (deployer) {
    deployer.deploy(BiddingToken);
};
