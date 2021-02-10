import { RequestHandler } from "express"
import { Order } from "../../../common/orders/types"
import { invalidRequest, serviceTimeout } from "../errors/variants"
import { handleError, successResponse } from "../reponses"

const MOCK_ORDERS: Order[] = [
  { id: 1, uuid: '123', timeCreated: '2011-10-05T14:48:00.000Z', state: 1 },
  { id: 2, uuid: '456', timeCreated: '2011-10-05T14:48:00.000Z', state: 2 },
  { id: 3, uuid: '789', timeCreated: '2011-10-05T14:48:00.000Z', state: 3 },
  { id: 4, uuid: 'abc', timeCreated: '2011-10-05T14:48:00.000Z', state: 4 },
  { id: 5, uuid: 'abc2', timeCreated: '2011-10-05T14:48:00.000Z', state: 4 }
]

export const getSingle: RequestHandler = (req, res) => {
  try {
    if (req.params.uuid == null)
      throw invalidRequest('order id must be defined')
    const order = MOCK_ORDERS.filter(o => o.uuid === req.params.uuid)?.[0]
    successResponse(req, res, order)
  } catch (e) {
    handleError(req, res, e)
  }
}

export const getMultiple: RequestHandler = (req, res) => {
  try {
    if (req.query.state > 2)
      throw invalidRequest('order id must be defined')
    let orders = MOCK_ORDERS
    const stateFilter = req.query.state != null && req.query.state.length > 0 ? parseInt(req.query.state) : null
    if (stateFilter != null)
      orders = orders.filter(o => o.state === stateFilter)
    successResponse(req, res, orders)
  } catch (e) {
    handleError(req, res, e)
  }
}