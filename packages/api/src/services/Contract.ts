import path from 'path'
import fs from 'fs'
import solc from 'solc'
import { Blockchain } from './Blockchain'

interface Evm {
  bytecode: any
}

interface IContract {
  abi: any
  evm: Evm
}

interface DeployOpts {
  contract: IContract
  from: string
  gas: number
  args: any | null
}

export class Contract extends Blockchain {
  public compile(contract: string): IContract {
    try {
      const cPath = path.resolve(__dirname, '../contracts', `${contract}.sol`)
      const nodeModulesPath = path.resolve(__dirname, '../../../../node_modules')

      const input = {
        language: 'Solidity',
        sources: {
          [`${contract}`]: {
            content: fs.readFileSync(cPath, 'utf8'),
          },
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['abi', 'evm.bytecode'],
            },
          },
        },
      }

      const findImports = (_path) => {
        if (_path[0] === '.') {
          return {
              contents: fs.readFileSync(path.join(__dirname, _path)).toString()
          }
        } else {
          return {
              contents: fs.readFileSync(path.join(nodeModulesPath, _path)).toString()
          }
        }
      }

      const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }))

      if (output && output.errors && output.errors.length) throw Error(output.errors[0].formattedMessage)

      return output.contracts[contract][contract]
    } catch (error) {
      console.error('Contract::Compile::Error', error)
      return null
    }
  }

  public async deploy({ contract, from, gas, args }: DeployOpts) {
    const contractInstance = new this.web3.eth.Contract(contract.abi, from)

    try {
      const transaction = await contractInstance
        .deploy({ data: contract.evm.bytecode.object, arguments: args })
        .send({ gas, from })

      const { _address, methods } = transaction;

      const price = await methods.getLatestPrice().call()

      return { address: _address, price }
    } catch (error) {
      console.error('Contract::Deploy::Error', error)
      return null
    }
  }
}
