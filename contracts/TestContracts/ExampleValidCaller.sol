pragma solidity ^0.5.0;
import '../ILegalCaller.sol';
import '../Lender.sol';

contract ExampleValidCaller is ILegalCaller {
  address payable public lender;
  bool public isCorrect;
  bool public isEmpty;
  bool public isIncomplete;
  constructor(address payable _lenderAddress) public {
    lender = _lenderAddress;
  }

  function deposit() external payable{
  /*
  only for testing purposes
   */
  }

  function computeAmountToBorrow() public pure returns(uint){
    return 1 ether;
  }

  function callLenderCorrectly() public{
    uint amountToBorrow = computeAmountToBorrow();
    isCorrect = true;
    isEmpty = false;
    Lender(lender).borrow(amountToBorrow);
  }

  function callLenderNoFee() public{
    uint amountToBorrow = computeAmountToBorrow();
    isCorrect = false;
    isEmpty = false;
    Lender(lender).borrow(amountToBorrow);
  }

  function callLenderCheater() public{
    uint amountToBorrow = computeAmountToBorrow();
    isCorrect = false;
    isEmpty = true;
    Lender(lender).borrow(amountToBorrow);
  }

  function callLenderCheater2() public{
    uint amountToBorrow = computeAmountToBorrow();
    isCorrect = false;
    isEmpty = false;
    isIncomplete = true;
    Lender(lender).borrow(amountToBorrow);
  }

  function invoke(uint amount,uint fee) external payable{
  /*
  Instead of this 'if' there should be implementation of arbitrage here followed by 
  
   lender.transfer(amount+fee);

    operation
  */
    if(isCorrect){
      require(address(this).balance>=amount+fee,"no funds to repay all");
      lender.transfer(amount+fee);
    }else{
      if(!isEmpty){
        if(isIncomplete){
          lender.transfer(amount-1);
        }else{
          lender.transfer(amount);
        }
      }
    }
  }

  function destroy() public{
    selfdestruct(msg.sender);
  }
}
