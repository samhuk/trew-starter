import { RequestHandler } from 'express'
import { Order } from '../../../common/orders/types'
import { invalidRequest } from '../errors/variants'
import { handleError, successResponse } from '../reponses'

const MOCK_ORDERS: Order[] = [
  { id: 1, uuid: '123', timeCreated: '2011-10-05T14:48:00.000Z', state: 1 },
  { id: 2, uuid: '456', timeCreated: '2011-10-05T14:48:00.000Z', state: 2 },
  { id: 3, uuid: '789', timeCreated: '2011-10-05T14:48:00.000Z', state: 3 },
  { id: 4, uuid: 'abc', timeCreated: '2011-10-05T14:48:00.000Z', state: 4 },
  { id: 5, uuid: 'abc2', timeCreated: '2011-10-05T14:48:00.000Z', state: 4 },
]

const parseOptionalIntQueryParameter = (queryValue: any): { provided: boolean, value: number } => (
  queryValue == null || queryValue.length === 0
    ? { provided: false, value: null }
    : { provided: true, value: parseInt(queryValue) }
)

export const getSingle: RequestHandler = (req, res) => {
  try {
    if (req.params.uuid == null)
      throw invalidRequest('order id must be defined')
    const order = MOCK_ORDERS.filter(o => o.uuid === req.params.uuid)?.[0]
    successResponse(req, res, order)
  }
  catch (e) {
    handleError(req, res, e)
  }
}

export const getMultiple: RequestHandler = (req, res) => {
  try {
    const parsedState = parseOptionalIntQueryParameter(req.query.state)
    if (parsedState.provided && parsedState.value == null)
      throw invalidRequest('state filter paramater is invalid')

    // Testing error logic
    if (parsedState.provided && parsedState.value > 2)
      throw invalidRequest('order id above 2 is not supported yet')

    let orders = MOCK_ORDERS

    if (parsedState.provided && parsedState.value != null)
      orders = orders.filter(o => o.state === parsedState.value)

    successResponse(req, res, orders)
  }
  catch (e) {
    handleError(req, res, e)
  }
}
