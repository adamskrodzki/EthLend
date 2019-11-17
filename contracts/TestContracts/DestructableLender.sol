pragma solidity >=0.4.21 <0.6.0;

import "../Lender.sol";

contract DestructableLender is Lender{

  function destroy() public{
    selfdestruct(msg.sender);
  }
}