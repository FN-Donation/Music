pragma solidity ^0.4.18;

contract WalletCompatibleToken {
   string public name;
   string public symbol;
   uint8 public decimals;

   mapping (address => uint256) public balanceOf;

   event Transfer(address _from, address _to, uint _value);
   
   constructor() public {
   name = "ZZASE TOKEN";
   symbol = "ZAST";
   decimals = 0;
   balanceOf[msg.sender] = 10000;              // Give the creator all initial tokens
    }

    function transfer(address _to, uint256 _value) external {
        if (balanceOf[msg.sender] < _value) revert();
        if (balanceOf[_to] + _value < balanceOf[_to]) revert();

        balanceOf[msg.sender] -= _value;                    // Subtract from the sender
        balanceOf[_to] += _value;                           // Add the same to the recipient

        emit Transfer(msg.sender,_to,_value);
    }
}