import { Order, OrdersFilter } from '../../common/orders/types'
import { get } from './core'

export const fetchOrders = (ordersFilter: OrdersFilter) => get<Order[]>(
  'order',
  { state: ordersFilter?.state },
)
