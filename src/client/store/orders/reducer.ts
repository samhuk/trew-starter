import { ThunkAction } from 'redux-thunk'
import { OrdersFilter } from '../../../common/orders/types'
import { fetchOrders } from '../../connectors/orders'
import { FetchingStateBase, RootState } from '../types'
import { ordersFetched, ordersFetching, setOrdersFilter } from './actions'
import { OrdersState,
  OrdersActionTypes,
  SET_ORDERS_FILTER,
  RESET_ORDERS_FILTER,
  ORDERS_FETCHED,
  ORDERS_FETCHING } from './types'

const initialState: OrdersState = {
  filter: { state: null },
  orders: [],
  ordersFetchingError: null,
  ordersFetchingState: FetchingStateBase.IDLE,
}

export const ordersReducer = (
  state = initialState,
  action: OrdersActionTypes,
): OrdersState => {
  switch (action.type) {
    case SET_ORDERS_FILTER:
      return {
        filter: action.filter,
        orders: state.orders,
        ordersFetchingError: state.ordersFetchingError,
        ordersFetchingState: state.ordersFetchingState,
      }
    case RESET_ORDERS_FILTER:
      return {
        filter: null,
        orders: state.orders,
        ordersFetchingError: state.ordersFetchingError,
        ordersFetchingState: state.ordersFetchingState,
      }
    case ORDERS_FETCHING:
      return {
        filter: state.filter,
        orders: state.orders,
        ordersFetchingError: null,
        ordersFetchingState: FetchingStateBase.FETCHING,
      }
    case ORDERS_FETCHED:
      return {
        filter: state.filter,
        orders: action.orders,
        ordersFetchingError: action.error,
        ordersFetchingState: action.error == null ? FetchingStateBase.IDLE : FetchingStateBase.FAILED,
      }
    default:
      return state
  }
}

/**
 * Thunk action creator that retrieves orders and loads them to state
 */
export const fetchOrdersAction = (newOrdersFilter?: OrdersFilter): ThunkAction<void, RootState, any, OrdersActionTypes> => (dispatch, getState) => {
  // if a new orders filter is provided, then set it
  if (newOrdersFilter != null)
    dispatch(setOrdersFilter(newOrdersFilter))
    // Retreive orders filter from state
  const ordersFilter = getState().orders?.filter
  // Start the fetching state
  dispatch(ordersFetching())
  // Fetch orders from api
  fetchOrders(ordersFilter).then(orders => {
    // End fetching state, setting the new orders received from api to state
    dispatch(ordersFetched(orders.data, orders.error))
  })
}
