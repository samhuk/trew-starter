import { fetchOrdersAction } from './orders/reducer'
import { Store } from './types'

export const initStore = (store: Store) => {
  // Fetch initial list of orders
  store.dispatch(fetchOrdersAction())
}

export default initStore
