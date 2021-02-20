import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FetchingStateBase, RootState } from '../../../store/types'
import { resetOrdersFilter } from '../../../store/orders/actions'
import { fetchOrdersAction } from '../../../store/orders/reducer'
import { OrdersFilter } from '../../../../common/orders/types'

export const render = () => {
  const dispatch = useDispatch()
  // -- Selectors
  const ordersFilter = useSelector((state: RootState) => state.orders?.filter)
  const ordersFetchingState = useSelector((state: RootState) => state.orders?.ordersFetchingState)
  const orders = useSelector((state: RootState) => state.orders?.orders ?? [])

  // -- Event handlers
  const onStateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrdersStateFilter = e.target.value != null ? parseInt(e.target.value) : null
    const newOrdersFilter: OrdersFilter = { ...ordersFilter, state: newOrdersStateFilter }
    dispatch(fetchOrdersAction(newOrdersFilter))
  }

  const onResetFilterButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(resetOrdersFilter())
    dispatch(fetchOrdersAction())
  }

  return (
    <>
      <h2>Filter</h2>
      <label htmlFor="text-input-orders-filter-state">
        State
        <input
          id="text-input-orders-filter-state"
          type="number"
          value={ordersFilter?.state ?? ''}
          onChange={onStateFilterChange}
          step="1"
          min="1"
          max="4'"
        />
      </label>
      <button type="button" onClick={onResetFilterButtonClick}>Reset Filter</button>
      {ordersFetchingState === FetchingStateBase.FETCHING ? ' fetching orders...' : null}
      {ordersFetchingState === FetchingStateBase.FAILED ? ' fetching orders failed.' : null}
      {orders.map(o => (
        <div key={o.uuid}>
          id: <b>{o.id}</b><br />
          uuid: <b>{o.uuid}</b><br />
          date: <b>{(new Date(o.timeCreated)).toDateString()}</b><br />
          state: <b>{o.state}</b><br />
          <hr />
        </div>
      ))}
    </>
  )
}

export default render
