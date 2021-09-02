import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider';

export class Blockchain {
  public web3

  constructor() {
    const wsProvider = new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.MNEMONIC,
      },
      providerOrUrl: wsProvider,
    });
    const web3 = new Web3(provider)

    this.web3 = web3
  }

  public async block() {
    try {
      const block = await this.web3.eth.getBlock('latest')
      return block
    } catch (err) {
      return null
    }
  }
}
