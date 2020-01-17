# EthLend

This project allows to connect people who has ETH but have no programming skills with those who has programming skills but no ETH, so both can profit on Ethereum Network arbitrage opportunities.

Any Smart Contract is capable of borrowing ETH from common pool as long as it returns all of Ethere (with fee) before transaction ends. If Smart Contract fails to do so transaction will revert.

This way ETH pooled in Smart Contract is never at risk, but still can be used and give profit.

## Development

If You are a developer and want to run this solution itself You need to do following steps

### Prerequirements

Install truffle

`npm install -g truffle`

Install ganache-cli

`npm install -g ganache-cli`

### Seting up project

Installing dependencies

`npm install`

Compiling

`truffle compile`

### Runing tests

Run ganache-cli with 0 gasPrice

`ganache-cli -g 0`

Run tests

`truffle test --network test`

## Use

Solution is currently under development, but still can be use on various Ethereum Networks. Below 3 main way of using it has been presented.

### Depositing ETH

To deposit ETH into a system (so it can be borrowed and earn iterests) one needs to call payable `deposit()` function sending eth that is about to be deposited. In return new pool share tokens will be issued (similar approach as in [Compount Finace](https://compound.finance) and [Uniswap](https://uniswap.exchange) )

### Withdrawing ETH

Eth can be withdraw back at any time by calling `withdraw(uint amount)` which burns specified amount of pool share tokens and transfers proportional amount of ETH from a common pool to sender of `withdraw` transaction

### Integrating external Smart Contracts

Sole purpose of pooling ETH in TxLendToken is to enable other **Smart Contracts** to borrow this ETH **without** puting it at **risk**.

To do so Smart Contract needs to implement `invoke(uint amount,uint fee) external payable` function which is beeing called by Lender contract in the middle of the execution of `borrow()` function and should contain arbitrage operations that will generate profit from borrowed amount. Example implementation can be found [here](https://github.com/adamskrodzki/EthLend/blob/master/contracts/TestContracts/ExampleValidCaller.sol)

### Official deployments

#### Kovan

Token: [0x91923a7b15b7b771343a7d027de8a5954a5f9153](https://kovan.etherscan.io/address/0x91923a7b15b7b771343a7d027de8a5954a5f9153#code)

Lender: [0x601059599afdeab84a3c1173f5a1a6c12ff3c2d9](https://kovan.etherscan.io/address/0x601059599afdeab84a3c1173f5a1a6c12ff3c2d9#code)

ExampleUser: [0xb5BFCe2ff5C9f1BC11ADcD3f86390fBCB4dAb1F1](https://rinkeby.etherscan.io/address/0xb5BFCe2ff5C9f1BC11ADcD3f86390fBCB4dAb1F1#code)

#### Rinkeby

Token: [0x80e2A1A0b953B0da50730C8A275b856522745aCe](https://rinkeby.etherscan.io/address/0x80e2A1A0b953B0da50730C8A275b856522745aCe#code)

Lender: [0x361126da1fA8846e21D59f5517c105F71454fD11](https://rinkeby.etherscan.io/address/0x361126da1fa8846e21d59f5517c105f71454fd11#code)

ExampleUser: [0xb5BFCe2ff5C9f1BC11ADcD3f86390fBCB4dAb1F1](https://rinkeby.etherscan.io/address/0xb5BFCe2ff5C9f1BC11ADcD3f86390fBCB4dAb1F1#code)

#### Mainnet

**Since it is early testing stage no Minnet deployment yet**

**This project is in alpha and has not been audited Yet. You use it on Your own risk.**
