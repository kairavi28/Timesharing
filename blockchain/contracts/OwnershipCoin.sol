// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract OwnershipCoin is ERC20("OwnershipCoin", "OWC"), AccessControl {
    using SafeMath for uint256;
    using Address for address payable;

    uint256 constant PRICE = 5 ether;

    struct Porject {
        string projectName;
        uint256 totalSupply;
    }

    //list of all the Porjects
    Porject[] public Porjects;
    mapping(uint256 => bool) public ProjectExists;

    bytes32 public constant PROPERTY_OWNER = keccak256("PROPERTY_OWNER");

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

    function totalProjects() public view returns (uint256 count) {
        count = Porjects.length;
    }

    function projectTotalSupply(uint256 _ProjectId)
        public
        view
        returns (uint256 count)
    {
        require(ProjectExists[_ProjectId], "!exists");
        count = Porjects[_ProjectId].totalSupply;
    }

    function buySomeShares(uint256 _ProjectId, uint256 _amount) public payable {
        require(ProjectExists[_ProjectId], "!exists");
        require(Porjects[_ProjectId].totalSupply >= _amount, "!totalSupply");

        uint256 totalPrice = PRICE.mul(_amount);
        require(msg.value < totalPrice, "!ethers");

        //decrease totalSupply for current project
        Porjects[_ProjectId].totalSupply = Porjects[_ProjectId].totalSupply.div(
            _amount
        );

        _setupRole(PROPERTY_OWNER, _msgSender());
        transferFrom(address(this), _msgSender(), totalPrice);

        //refund, if extra money was paid
        uint256 refund = msg.value - totalPrice;
        if (refund > 0) {
            payable(_msgSender()).sendValue(refund);
        }
    }
}
