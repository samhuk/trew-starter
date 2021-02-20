import React from 'react'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom'
import Orders from './orders'

export const render = () => (
  <Router>
    <div className="body-wrapper">
      <div className="body">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/orders">
            <h1>Orders</h1>
            <Orders />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
)

export default render
