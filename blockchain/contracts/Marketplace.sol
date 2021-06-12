// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnershipToken.sol";
import "./BiddingToken.sol";
import "./TimeStamp.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Marketplace is AccessControl {
    TimeStamp helper;
    OwnershipToken ownershipToken;
    BiddingToken biddingToken;

    address public owner;
    //shows if the corresponding address has tokens assigned
    mapping(address => mapping(uint16 => bool)) public receivedTokens;

    constructor() {
        owner = _msgSender();
        ownershipToken = new OwnershipToken();
        biddingToken = new BiddingToken();
        helper = new TimeStamp();
    }

    //list of all of the Projects
    string[] public Projects;
    mapping(uint256 => uint256) public totalSupplies;
    mapping(uint256 => bool) public ProjectExists;

    string[] public biddings;
    mapping(uint256 => bool) public biddingExists;
    mapping(uint256 => uint256) maxBidder;
    mapping(uint256 => address) winner;

    bytes32 public constant PROPERTY_OWNER = keccak256("PROPERTY_OWNER");

    modifier onlyOwner() {
        require(owner == _msgSender(), "!owner");
        _;
    }

    //check RBAC for property owner
    modifier onlyPropertyOwner() {
        require(hasRole(PROPERTY_OWNER, _msgSender()), "!owner");
        _;
    }

    function createNewPorject(string memory _projectName, uint256 _totalSupply)
        public
        onlyOwner
    {
        //mint new tokens
        ownershipToken.initToken(5 gwei, _totalSupply);

        Projects.push(_projectName);

        ProjectExists[Projects.length - 1] = true;
        totalSupplies[Projects.length - 1] = _totalSupply;
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
        projectName = Projects[_ProjectId];
        unitPrice = 5 gwei;
        totalSupply = totalSupplies[_ProjectId];
    }

    function buySomeShares(uint256 _ProjectId, uint256 _amount) public payable {
        require(_amount > 0, "!amount");
        require(ProjectExists[_ProjectId], "!exists");

        uint256 totalSupply = totalSupplies[_ProjectId];
        require(totalSupply >= _amount, "!totalSupply");

        uint256 totalPrice = _amount * 5 gwei;
        require(msg.value >= totalPrice, "!ethers");

        address account = _msgSender();
        _setupRole(PROPERTY_OWNER, account);

        ownershipToken.transferFrom(address(this), account, _amount);

        //mint biddind tokens
        biddingToken.register(account);
        biddingToken.reassignCoin(account, _amount * 10);

        uint16 currentYear = helper.getYear(block.timestamp);
        receivedTokens[account][currentYear] = true;

        //refund, if extra money was paid
        uint256 refund = msg.value - totalPrice;
        if (refund > 0) {
            payable(account).transfer(refund);
        }
    }

    function balanceOf(uint256 _ProjectId)
        public
        view
        onlyPropertyOwner
        returns (uint256)
    {
        require(ProjectExists[_ProjectId], "!exists");
        return ownershipToken.balanceOf(_msgSender());
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
        uint256 tokensTotal = ownershipToken.balanceOf(account);
        //already registered
        biddingToken.reassignCoin(_msgSender(), tokensTotal * 10);
    }

    function createBidding(string memory name) public onlyOwner {
        biddings.push(name);
        biddingExists[biddings.length - 1] = true;
    }

    function closeBidding(uint256 _biddingId) public onlyOwner {
        require(biddingExists[_biddingId], "!exists");

        biddingExists[_biddingId] = false;
    }

    function showBiddingWinner(uint256 _biddingId)
        public
        view
        onlyOwner
        returns (address)
    {
        return winner[_biddingId];
    }

    function bid(uint256 _biddingId, uint256 _biddingTokenNums)
        public
        onlyPropertyOwner
    {
        require(biddingExists[_biddingId], "!exists");

        uint256 currentBalance = biddingToken.balanceOf(_msgSender());
        require(currentBalance >= _biddingTokenNums, "!enough");

        //set the winnder
        if (_biddingTokenNums > maxBidder[_biddingId]) {
            maxBidder[_biddingId] = _biddingTokenNums;
            winner[_biddingId] = _msgSender();
        }

        biddingToken.burnCoin(_msgSender(), _biddingTokenNums);
        //already registered
        biddingToken.reassignCoin(
            _msgSender(),
            currentBalance - _biddingTokenNums
        );
    }
}
