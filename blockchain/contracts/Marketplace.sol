// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnershipToken.sol";
import "./BiddingToken.sol";
import "./TimeStamp.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Marketplace is AccessControl {
    using SafeMath for uint256;
    using Address for address payable;
    TimeStamp helper;
    BiddingToken bidding;
    address public owner;
    //shows if the corresponding address has tokens assigned
    mapping(address => mapping(uint16 => bool)) public receivedTokens;

    constructor() {
        owner = _msgSender();
        bidding = new BiddingToken();
        helper = new TimeStamp();
    }

    //list of all of the Projects
    OwnershipToken[] Projects;
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

        Projects.push(newPorject);
        ProjectExists[Projects.length - 1] = true;
    }

    function totalProjects() public view returns (uint256 count) {
        count = Projects.length;
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
        OwnershipToken project = Projects[_ProjectId];
        projectName = project.unitName();
        unitPrice = project.unitPrice();
        totalSupply = project.totalSupply();
    }

    function buySomeShares(uint256 _ProjectId, uint256 _amount) public payable {
        require(_amount > 0, "!amount");
        require(ProjectExists[_ProjectId], "!exists");

        OwnershipToken project = Projects[_ProjectId];
        require(project.totalSupply() >= _amount, "!totalSupply");

        //fetch unitPrice of the project
        uint256 unitPrice = project.unitPrice();

        uint256 totalPrice = unitPrice.mul(_amount);
        require(msg.value >= totalPrice, "!ethers");

        _setupRole(PROPERTY_OWNER, _msgSender());

        project.transferFrom(address(this), _msgSender(), _amount);

        //mint biddind tokens
        uint256 tokensTotal = getAccountTotalTokens(_msgSender());
        bidding.register(_msgSender());
        bidding.reassignCoin(_msgSender(), tokensTotal);
        
        uint16 currentYear = helper.getYear(block.timestamp);
        receivedTokens[_msgSender()][currentYear] = true;

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
        return Projects[_ProjectId].balanceOf(_msgSender());
    }

    //this function is called to clain bidding tokens annualy
    function claimTokens() public onlyPropertyOwner {
        address account = _msgSender();

        uint16 currentYear = helper.getYear(block.timestamp);
        require(
            !receivedTokens[account][currentYear],
            "Already received tokens."
        );

        //set currentYear true for this address
        receivedTokens[account][currentYear] = true;

        //mint biddind tokens
        uint256 tokensTotal = getAccountTotalTokens(_msgSender());
        //already registered
        bidding.reassignCoin(_msgSender(), tokensTotal);
    }



    //internal helper function
    function getAccountTotalTokens(address account) internal view returns (uint256) {
        uint256 sum = 0;

        for (uint256 projectId = 0; projectId < Projects.length; projectId++) {
            OwnershipToken project = Projects[projectId];
            uint256 balance = project.balanceOf(account);
            if (balance > 0) sum = sum.add(balance.mul(project.unitPrice()));
        }

        return sum;
    }
}
