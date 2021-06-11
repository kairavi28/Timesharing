// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnershipCoin is ERC20("OwnershipCoin", "OWC"), Ownable {
    using Address for address payable;

    uint256 constant PRICE = 5 ether;

    struct Porject {
        string projectName;
        uint256 totalSupply;
    }

    //list of all the Porjects
    Porject[] public Porjects;
    mapping(uint256 => bool) public ProjectExists;

    function createNewPorject(string memory _projectName, uint256 _totalSupply)
        public
    {
        Porject memory newPorject =
            Porject({projectName: _projectName, totalSupply: _totalSupply});

        Porjects.push(newPorject);
        ProjectExists[Porjects.length - 1] = true;

        //mint new Porject's totalSupply
        _mint(address(this), _totalSupply);
    }

    function ProjectsTotal() public view returns (uint256) {
        return Porjects.length;
    }

    function buySomeShares(uint256 _PorjectId) public payable {
        require(ProjectExists[_PorjectId], "!exists");
        require(Porjects[_PorjectId].totalSupply >= 0, "!totalSupply");
        require(msg.value >= PRICE, "!ethers");
    }
}
