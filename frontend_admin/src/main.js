import React from "react"
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login";
import Customer from "./pages/customer";
import Product from "./pages/product";
import Transaksi from "./pages/transaksi";
import Admin from "./pages/admin"
import testPage from "./pages/testpage";

class Main extends React.Component{
    render(){
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/customer" component={Customer}/>
                <Route path="/product" component={Product}/>
                <Route path="/transaksi" component={Transaksi}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/testpage" component={testPage}/>
            </Switch>
        )
    }
}
export default Main;
