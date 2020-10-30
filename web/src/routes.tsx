import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Route from './components/Route'

import Login from './pages/Login'
import Products from './pages/Products'
import Product from './pages/Product'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/products" component={Products} isPrivate />
        <Route path="/product/:id?" component={Product} isPrivate />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
