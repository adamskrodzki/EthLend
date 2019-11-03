pragma solidity ^0.5.0;
import '../TxLendToken.sol';

contract DestructableToken is TxLendToken{
  constructor(address _adr) public TxLendToken(_adr){
  }

  function destroy() public{
    selfdestruct(msg.sender);
  }
}
