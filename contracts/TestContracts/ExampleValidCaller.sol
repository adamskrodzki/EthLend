pragma solidity ^0.5.0;
import '../ILegalCaller.sol';
import '../Borrower.sol';

contract ExampleValidCaller is ILegalCaller {
  address payable public borrower;
  bool public isCorrect;
  bool public isEmpty;
  uint private amountToBorrow ;
  constructor(address payable _borrowerAddress) public payable {
    borrower = _borrowerAddress;
  }

  function computeAmountToBorrow() public pure returns(uint){
    return 1 ether;
  }

  function callBorrowerCorrectly() public{
    amountToBorrow = computeAmountToBorrow();
    isCorrect = true;
    isEmpty = false;
    Borrower(borrower).borrow(amountToBorrow);
  }

  function callBorrowerNoFee() public{
    amountToBorrow = computeAmountToBorrow();
    isCorrect = false;
    isEmpty = false;
    Borrower(borrower).borrow(amountToBorrow);
  }

  
  function callBorrowerCheater() public{
    //should be written globally so it is constant during whole execution and can be fetched from invoke()
    amountToBorrow = computeAmountToBorrow();
    isCorrect = false;
    isEmpty = true;
    Borrower(borrower).borrow(amountToBorrow);
  }

  function invoke() external payable{
    // arbitrage logic
    if(isCorrect){
      uint fee = Borrower(borrower).getFee(amountToBorrow);
      require(address(this).balance>=amountToBorrow+fee,"no funds to repay all");
      borrower.transfer(amountToBorrow+fee);
    }else{
      if(!isEmpty){
        borrower.transfer(amountToBorrow);
      }
    }
  }

  function destroy() public{
    selfdestruct(msg.sender);
  }
}
