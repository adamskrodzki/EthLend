
# EthLend
This project allow to connect people who has ETH but have no programming skills with those who has programming skills but no ETH, so both can profit on Ethereum Network arbitrage opportunities.

Any Smart Contract is capable of borrowing ETH from common pool as long as it returns all of Ethere (with fee) before transaction ends. If Smart Contract fails to do so transaction will revert. 

This way ETH pooled in Smart Contract is never at risk, but still can be used and give profit. 

## Depositing ETH

To deposit ETH into a system (so it can be borrowed and earn iterests) one needs to call payable `deposit()` function sending eth that is about to be deposited. In return new pool share tokens will be issued (similar approach as in [Compount Finace](https://compound.finance)  and [Uniswap](https://uniswap.exchange) )

## Withdrawing ETH

Eth can be withdraw back at any time by calling `withdraw(uint amount)` which burns specified amount of pool share tokens and transfers proportional amount of ETH from a common pool to sender of `withdraw` transaction

## Integrating external Smart Contracts

Sole purpose of pooling ETH in TxLendToken is to enable other **Smart Contracts** to borrow this ETH **without** puting it at **risk**.

To do so Smart Contract needs to implement `invoke(uint amount,uint fee) external payable` function which is beeing called by Lender contract in the middle of the execution of `borrow()` function and should contain arbitrage operations that will generate profit from borrowed amount. Example implementation can be found [here](https://github.com/adamskrodzki/EthLend/blob/master/contracts/TestContracts/ExampleValidCaller.sol)

## Official deployments 

### Kovan

### Rinkeby

### Mainnet

**This project is in alpha and has not been audited Yet. You use it on Your own risk.**
