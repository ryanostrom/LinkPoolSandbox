import { Router } from 'express'
import Controller from './controller'
import { BaseRoute } from 'routes'
import validationMiddleware from 'middlewares/validation.middleware'
import { CreateFeedDto } from 'models/Contract'

class Route implements BaseRoute {
  public path = '/contracts'
  public router = Router()
  public controller = new Controller()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // POST /contracts/feed
    this.router.post(
      `${this.path}/feed`,
      validationMiddleware(CreateFeedDto, 'body'),
      this.controller.initialize,
    )
  }
}

export default Route
