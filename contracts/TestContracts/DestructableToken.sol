pragma solidity ^0.5.0;
import '../TxLendToken.sol';

contract DestructableToken is TxLendToken{
  constructor() public {
  }

  function destroy() public{
    selfdestruct(msg.sender);
  }
}
