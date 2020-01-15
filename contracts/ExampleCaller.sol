pragma solidity ^0.5.0;
import './ILegalCaller.sol';
import './Lender.sol';
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ExampleCaller is ILegalCaller, Ownable {
  address payable public lender;
  constructor(address payable _lenderAddress) public {
    lender = _lenderAddress;
  }

  /*
    This function is here only for convinience, this Example do not have any logic 
    so it will be loosing money (due to Lender fees), this function allows it to top up
  */

  function () external payable{
  }

  /*
  This function is strictly required in order for 
   Lender(lender).borrow(amount);  call to not be reverted
  */
  function invoke(uint amount,uint fee) external payable{
  /*
  here adbitrage logic should be implemented
  */
    require(address(this).balance>=amount+fee,"no funds to repay all");
    lender.transfer(amount+fee);
  }

/*
  this is function You use to borrow liquidity for one transaction
*/
  function borrow(uint amount) public{
    Lender(lender).borrow(amount);
  }

  function getFee(uint amount) view public returns(uint) {
    return Lender(lender).getFee(amount);
  }

  function ownBalance()  view public returns(uint){
    return address(this).balance;
  }

  function drawFunds() public onlyOwner{
        address(msg.sender).transfer(address(this).balance);
    }
}
