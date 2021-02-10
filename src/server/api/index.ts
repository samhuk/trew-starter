import cors from 'cors'
import { json, Router } from 'express'
import orderRoutes from './order/routes'

const contactExternalService = (onComplete: () => void) => {
  setTimeout(() => {
    onComplete()
  }, 2000)
}

const router = Router()
  .use(cors())
  .use(json())
  .use('/order', orderRoutes)
  .use('/asyncTest', (req, res) => {
    contactExternalService(() => res.send('async test response!'))
  })

export default router
