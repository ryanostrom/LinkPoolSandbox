import { NextFunction, Request, Response } from 'express'
import HttpException from 'utils/HttpException'
import { Contract } from 'services'
import { CreateFeedDto } from 'models/Contract'

class ContractController {
  public initialize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nodeAddress, type }: CreateFeedDto = req.body

      const contracts = new Contract()
      const contract = contracts.compile(type)

      const data = await contracts.deploy({
        contract,
        from: process.env.ACCOUNT_ADDRESS,
        gas: 1000000,
        args: [nodeAddress],
      })

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

export default ContractController
