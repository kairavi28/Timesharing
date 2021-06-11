const OwnershipCoin = artifacts.require("OwnershipCoin");

module.exports = function (deployer) {
    deployer.deploy(OwnershipCoin);
};
