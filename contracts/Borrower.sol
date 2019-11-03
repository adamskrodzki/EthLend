pragma solidity >=0.4.21 <0.6.0;

import "./TxLendToken.sol";
import "./ILegalCaller.sol";

contract Borrower{

    address public tokenAddress;
    bool public inBorrow;
    using SafeMath for uint256;

    function init(address _tok) external{
        require(tokenAddress == address(0),"can set token address only once");
        tokenAddress = _tok;
    }
    /*
        In ffuture this will be fetched from settings contract
    */
    function getFee(uint amount) public pure returns(uint){
        return amount/100000;
    }
    function borrow(uint amount) external{
        uint earnings = 0;
        inBorrow = true;
        require(tokenAddress != address(0),"token needs to be set");
        require(amount>0,"amount must be positive");
        require(amount<=address(tokenAddress).balance,"funds not sufficient to borrow that much");
        TxLendToken(tokenAddress).borrow(amount);
        uint amountOnStart = address(this).balance;
        ILegalCaller(msg.sender).invoke.value(amount)();
        uint amountOnEnd = address(this).balance;
        require(amountOnStart<amountOnEnd, "not all funds returned");
        require(amountOnStart<=amountOnEnd+getFee(amount), "fee not paid");
        earnings = amountOnEnd-amountOnStart;
        earnings = earnings.mul(95).div(100);
        TxLendToken(tokenAddress).giveBack.value(amount+earnings)(amount);
        inBorrow = false;
    }

    function () external payable {
        require(msg.sender == address(tokenAddress) || inBorrow,"only token can send funds to borrower");
    }

}