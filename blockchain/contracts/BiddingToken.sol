// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BiddingToken is ERC20("Bidding Token", "BDT") {
    address public operator;

    mapping(address => bool) public isParticipate;

    constructor() {
        operator = msg.sender;
    }

    event IllegalTransfer(address from, address to, uint256 amount);

    modifier onlyOperator() {
        require(msg.sender == operator, "Only Operator can do this.");
        _;
    }

    function register(address account) public onlyOperator {
        isParticipate[account] = true;
    }

    // In the beginning of each period(year)
    // the operate should burn all coins and then mint
    function reassignCoin(address account, uint256 amount) public onlyOperator {
        _burn(account, balanceOf(account));
        _mint(account, amount);
    }

    function burnCoin(address account, uint256 amount) public onlyOperator {
        _burn(account, amount);
    }

    // Hook to prevent participate hiding coins to a unkonwn account
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (!isParticipate[to]) {
            // There might never be triggered because of revert later
            // But it really behaves differently on different environment
            emit IllegalTransfer(from, to, amount);
        }
        if (to != address(0)) {
            require(
                isParticipate[to],
                "Only participate can receive Time Coin."
            );
        }
    }
}
