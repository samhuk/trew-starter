import { Router } from 'express'
import { getMultiple, getSingle } from './controller'

const orderRoutes = Router()
  .get('/', getMultiple)
  .get('/:uuid', getSingle)

export default orderRoutes
