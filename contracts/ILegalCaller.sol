pragma solidity >=0.4.21 <0.6.0;

interface ILegalCaller {
    
    function invoke(uint amount,uint fee) external payable;
}
