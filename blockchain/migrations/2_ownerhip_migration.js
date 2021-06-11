const OwnershipToken = artifacts.require("OwnershipToken");

module.exports = function (deployer) {
    deployer.deploy(OwnershipToken);
};
