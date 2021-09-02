import { Router } from 'express'

import Contracts from './contracts'

export interface BaseRoute {
  path?: string
  router: Router
}

export default [new Contracts()]
