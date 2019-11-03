pragma solidity ^0.5.0;
import '../TxLendToken.sol';

contract BadActor {
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
    TxLendToken(lendTokAdr).withdraw(0);
  }
  
  function destroy() public{
    selfdestruct(msg.sender);
  }
}
