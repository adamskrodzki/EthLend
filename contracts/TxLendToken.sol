pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

contract TxLendToken is ERC20,ReentrancyGuard {
    string public name = "TxLendToken";
    string public symbol = "TLT";
    uint public decimals = 18;
    uint public totalAmount;

    uint256 private _guardCounter;
    
    address public validBorrower;

    uint private borrowedAmount;

    constructor(address _validB) public {
        validBorrower = _validB;
    }

    function borrow(uint amount) external {
        require(msg.sender==validBorrower,"You cannot borrow");
        require(amount<=address(this).balance,"Balance too low");
        borrowedAmount = amount;
        (bool status,) = validBorrower.call.value(amount)(bytes(""));
        require(status==true, "funds transfer failed");
    }

    function giveBack(uint amount) external payable{
        require(msg.value>=amount,"Need to give back at least what borrowed");
        require(msg.sender==validBorrower,"Only borrower can return");
        require(borrowedAmount==amount,"declared amount not true");
    }

    function computeAmount(uint amount) public view returns(uint){
        uint amountToMint = 0;
        if(totalSupply()==0){
            amountToMint = amount;
        }else{
            amountToMint =  amount.mul(totalSupply()).div(totalAmount);
        }
        return amountToMint;
    } 

    function deposit() public payable nonReentrant() {
        require(msg.value>0,"You must deposit some eth");
        uint amountToMint = computeAmount(msg.value);
        _mint(msg.sender, amountToMint);
        totalAmount = totalAmount.add(msg.value);
    }

    function withdraw(uint amount) external nonReentrant(){
        if(totalSupply()==0 || amount==0){
            return;
        }
        uint amountToWithdraw = totalAmount.mul(amount).div(totalSupply());
        _burn(msg.sender,amount);
        address(msg.sender).call.value(amountToWithdraw)(bytes(""));
    }
}
