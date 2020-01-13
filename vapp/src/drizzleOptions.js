const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "wss://rinkeby.infura.io/v3/3baae2e6c67c435689a674e3634cc8b2"
    }
  },
  contracts: [],
  events: {
    TxLendToken: [
      {
        eventName: "Deposit",
        eventOptions: { fromBlock: 0 }
      },
      {
        eventName: "Withdraw",
        eventOptions: { fromBlock: 0 }
      },
      {
        eventName: "Borrowed",
        eventOptions: { fromBlock: 0 }
      }
    ]
  },
  polls: {
    accounts: 15000
  }
};

export default options;
