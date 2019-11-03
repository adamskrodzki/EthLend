import TutorialToken from './contracts/TutorialToken.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'wss://rinkeby.infura.io/v3/3baae2e6c67c435689a674e3634cc8b2'
    }
  },
  contracts: [TutorialToken],
  events: {
    TutorialToken: ['Transfer']
  },
  polls: {
    accounts: 15000
  }
}

export default options