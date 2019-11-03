pragma solidity ^0.5.0;
import '../TxLendToken.sol';

contract GoodActor {
  address public lendTokAdr;
  constructor(address _lendAdr) public {
    lendTokAdr = _lendAdr;
  }

  function deposit() public payable{
    TxLendToken(lendTokAdr).deposit.value(msg.value)();
  }

  function withdraw() public payable{
    TxLendToken(lendTokAdr).withdraw(TxLendToken(lendTokAdr).balanceOf(address(this)));
  }

  function () external payable{
    for(uint i =0;i<1000;i++){
      emit SomeWork(i);
    }
  }
  
  function destroy() public{
    selfdestruct(msg.sender);
  }

  event SomeWork(uint i);
}
