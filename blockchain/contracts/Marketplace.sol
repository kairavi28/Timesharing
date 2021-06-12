// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnershipToken.sol";
import "./BiddingToken.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Marketplace is AccessControl {
    using SafeMath for uint256;
    using Address for address payable;
    address public owner;

    constructor() {
        owner = _msgSender();
    }

    //list of all of the Porjects
    OwnershipToken[] Porjects;
    mapping(uint256 => bool) public ProjectExists;

    bytes32 public constant PROPERTY_OWNER = keccak256("PROPERTY_OWNER");
    bytes32 public constant BIDDING_CUSTOMER = keccak256("BIDDING_CUSTOMER");

    modifier onlyOwner() {
        require(owner == _msgSender(), "!owner");
        _;
    }

    //check RBAC for property owner
    modifier onlyPropertyOwner() {
        require(hasRole(PROPERTY_OWNER, _msgSender()), "!owner");
        _;
    }

    //check RBAC for bidding customer
    modifier onlyBiddingCustomer() {
        require(hasRole(BIDDING_CUSTOMER, _msgSender()), "!biddingcustomer");
        _;
    }

    function createNewPorject(
        string memory _projectName,
        uint256 _unitPrice,
        uint256 _totalSupply
    ) public onlyOwner {
        //mint new tokens
        OwnershipToken newPorject = new OwnershipToken();
        newPorject.initToken(_projectName, _unitPrice, _totalSupply);

        Porjects.push(newPorject);
        ProjectExists[Porjects.length - 1] = true;
    }

    function totalProjects() public view returns (uint256 count) {
        count = Porjects.length;
    }

    function projectInfo(uint256 _ProjectId)
        public
        view
        returns (
            string memory projectName,
            uint256 unitPrice,
            uint256 totalSupply
        )
    {
        require(ProjectExists[_ProjectId], "!exists");
        OwnershipToken project = Porjects[_ProjectId];
        projectName = project.unitName();
        unitPrice = project.unitPrice();
        totalSupply = project.totalSupply();
    }

    function buySomeShares(uint256 _ProjectId, uint256 _amount) public payable {
        require(_amount > 0, "!amount");
        require(ProjectExists[_ProjectId], "!exists");

        OwnershipToken project = Porjects[_ProjectId];
        require(project.totalSupply() >= _amount, "!totalSupply");

        //fetch unitPrice of the project
        uint256 unitPrice = project.unitPrice();

        uint256 totalPrice = unitPrice.mul(_amount);
        require(msg.value >= totalPrice, "!ethers");

        _setupRole(PROPERTY_OWNER, _msgSender());

        project.transferFrom(address(this), _msgSender(), _amount);

        //refund, if extra money was paid
        uint256 refund = msg.value - totalPrice;
        if (refund > 0) {
            payable(_msgSender()).sendValue(refund);
        }
    }

    function balanceOf(uint256 _ProjectId)
        public
        view
        onlyPropertyOwner
        returns (uint256)
    {
        require(ProjectExists[_ProjectId], "!exists");
        return Porjects[_ProjectId].balanceOf(_msgSender());
    }

    // function assignBiddingTokens()
}
