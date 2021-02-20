import { Order, OrdersFilter } from '../../../common/orders/types'
import { SET_ORDERS_FILTER, RESET_ORDERS_FILTER, OrdersActionTypes, ORDERS_FETCHED, ORDERS_FETCHING } from './types'

export const setOrdersFilter = (filter: OrdersFilter): OrdersActionTypes => ({
  type: SET_ORDERS_FILTER,
  filter,
})

export const resetOrdersFilter = (): OrdersActionTypes => ({ type: RESET_ORDERS_FILTER })

export const ordersFetching = (): OrdersActionTypes => ({ type: ORDERS_FETCHING })

export const ordersFetched = (orders: Order[], error: any): OrdersActionTypes => ({
  type: ORDERS_FETCHED,
  orders,
  error,
})
