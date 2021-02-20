import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { ordersReducer } from './orders/reducer'
import initStore from './init'

// Set the root reducer. This defines the root state (see ./types.ts).
export const rootReducer = combineReducers({ orders: ordersReducer })

export const store = configureStore({
  // Add the root reducer
  reducer: rootReducer,
  // Enable the redux devtools extension
  devTools: (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  // Add thunk middleware for non-boilerplate async dispatching of actions
  enhancers: [applyMiddleware(thunkMiddleware)],
})

initStore(store)

export default store
