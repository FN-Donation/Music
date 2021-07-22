pragma solidity ^0.4.18;

interface token {
   function transfer(address receiver, uint amount) external;
}

contract CrowdFund {
    address public owner;
    address public producer;
    uint public goalAmount;
    uint public totalAmount;
    uint public deadline;
    uint public price;
    token public tokenReward;
    mapping(address => uint256) public balanceOf;
    bool public goalReached;
    bool public ended;

    event GoalReached(address ownerAddress, uint amountRaisedValue);
    event FundTransfer(address backer, uint amount, bool isContribution);
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier afterDeadline() {
        require(now >= deadline);
        _;
    }

    constructor(address _tokenAddress, address _producerAddress) public {
        owner = msg.sender;
        producer = _producerAddress;
        goalAmount = 30 * 1 ether;
        deadline = now + (3 * 1 minutes);
        price = 1 * 1 ether;
        tokenReward = token(_tokenAddress);
        totalAmount = 0;
        goalReached = false;
        ended = false;
    }

    function() payable external {
        require(!ended);
        uint amount = msg.value;
        balanceOf[msg.sender] += amount;
        totalAmount += amount;
        tokenReward.transfer(msg.sender, amount / price);
        emit FundTransfer(msg.sender, amount, true);
    }

    function checkGoalReached() external afterDeadline {
        require(!ended);
        if(totalAmount >= goalAmount) {
            goalReached = true;
            emit GoalReached(owner, totalAmount);
        }
        ended = true;
    }

    function safeWithdrawal() external afterDeadline {
        if(!goalReached) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if(amount > 0) {
                if(msg.sender.send(amount)) {
                    emit FundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }
        if(goalReached && owner == msg.sender) {
            if(producer.send(totalAmount)) {
                emit FundTransfer(producer, totalAmount, false);
            } else {
                goalReached = false;
            }
        }
    }

    function kill() public onlyOwner {
        selfdestruct(owner);
    }
} 