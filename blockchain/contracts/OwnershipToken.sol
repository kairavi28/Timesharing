// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnershipToken is ERC20("Ownership Token", "OWT") {
    address public owner;

    modifier onlyOwner() {
        require(owner == _msgSender(), "!owner");
        _;
    }

    constructor() {
        owner = _msgSender();
    }

    uint256 private _unitPrice;

    function unitPrice() public view returns (uint256) {
        return _unitPrice;
    }

    function initToken(
        uint256 unitPrice_,
        uint256 totalSupply_
    ) public onlyOwner {
        _unitPrice = unitPrice_;
        _mint(_msgSender(), totalSupply_);
        approve(_msgSender(), totalSupply_);
    }

    //no decimals
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}
