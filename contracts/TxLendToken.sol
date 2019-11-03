pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

contract TxLendToken is ERC20,ReentrancyGuard {
    string public name = "TxLendToken";
    string public symbol = "TLT";
    uint public decimals = 18;
    uint public totalAmount;

    uint256 private _guardCounter;

    constructor() public {
    }

    function deposit() public payable nonReentrant() {

        uint amountToMint = 0;
        if(totalSupply()==0){
            totalAmount = msg.value;
            amountToMint = msg.value;
        }else{
            amountToMint =  msg.value.mul(totalSupply()).div(totalAmount);
            totalAmount = totalAmount.add(msg.value);
        }
        _mint(msg.sender, amountToMint);
    }

    function withdraw(uint amount) external nonReentrant(){
        uint amountToWithdraw = totalAmount.mul(amount).div(totalSupply());
        _burn(msg.sender,amount);
        address(msg.sender).call.value(amountToWithdraw)(bytes(""));
    }

    function () external payable{

        this.deposit.value(msg.value)();
    }
}
