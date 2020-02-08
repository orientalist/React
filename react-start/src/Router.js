import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from 'pages/App';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import Cart from 'pages/Cart';
import FunctionComponent_Cart from 'components/FunctionComponent_Cart';
import Register from 'pages/Register';

const Router = () => (
  <BrowserRouter>
    <Switch>
        <Route path='/' exact component={App}/>
        <Route path='/login' component={Login}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/FunctionComponent_Cart' component={FunctionComponent_Cart}></Route>
        <Route path='/register' component={Register}></Route>
        <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;
