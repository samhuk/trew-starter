import { Order, OrdersFilter } from "../../../common/orders/types"
import { FetchingStateBase } from "../types"

export const SET_ORDERS_FILTER = 'SET_ORDERS_FILTER'
export const RESET_ORDERS_FILTER = 'RESET_ORDERS_FILTER'
export const FETCH_ORDERS = 'FETCH_ORDERS'
export const ORDERS_FETCHING = 'ORDERS_FETCHING'
export const ORDERS_FETCHED = 'ORDERS_FETCHED'

export type OrdersState = {
  filter: OrdersFilter
  orders: Order[]
  ordersFetchingState: FetchingStateBase
  ordersFetchingError: any
}

type SetOrdersFilterAction = {
  type: typeof SET_ORDERS_FILTER
  filter: OrdersFilter
}

type ResetOrdersFilterAction = {
  type: typeof RESET_ORDERS_FILTER
}

type FetchOrdersAction = {
  type: typeof FETCH_ORDERS
}

type OrdersFetchingAction = {
  type: typeof ORDERS_FETCHING
}

type OrdersFetchedAction = {
  type: typeof ORDERS_FETCHED
  orders: Order[]
  error: any
}

export type OrdersActionTypes = SetOrdersFilterAction | ResetOrdersFilterAction | FetchOrdersAction | OrdersFetchingAction | OrdersFetchedAction