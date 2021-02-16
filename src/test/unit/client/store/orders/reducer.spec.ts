import { setOrdersFilter } from '../../../../../client/store/orders/actions'
import { ordersReducer } from '../../../../../client/store/orders/reducer'

describe('client/store/orders/reducer', () => {
  describe('SET_ORDERS_FILTER', () => {
    test('correctly changes state', () => {
      expect(ordersReducer(
        // Initial state
        {
          filter: null,
          orders: [],
          ordersFetchingError: null,
          ordersFetchingState: null,
        },
        // Action
        setOrdersFilter({ state: 1 })
      )).toEqual({ // Expected new state
        filter: { state: 1 },
        orders: [],
        ordersFetchingError: null,
        ordersFetchingState: null,
      })
    })
  })
})
