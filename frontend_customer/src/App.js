import React from "react";
import { Switch, Route } from "react-router-dom";
import Product from "./pages/product";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Transaction from "./pages/transaction";
import Login from "./pages/login";
import Profile from "./pages/profileCustomer";

export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/product" component={Product}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/transaction" component={Transaction}/>
        <Route path="/profileCustomer" component={Profile}/>
      </Switch>
    )
  }
}