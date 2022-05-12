import React from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import '../style/home.css';

export default class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            customerID: "",
            customerName: "",
            cart:[],
            total:0
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    headerConfig=() =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    editItem = selectedItem =>{
        let tempCart = []
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)

        let promptJumlah = window.prompt(`Masukan jumlah ${selectedItem.name} yang akan Anda beli`,selectedItem.qty)
        tempCart[index].qty = promptJumlah

        localStorage.setItem("cart", JSON.stringify(tempCart))

        this.initCart()
    }
    dropItem = selectedItem =>{
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.name} dari Keranjang`)){
            let tempCart = []
            if(localStorage.getItem("cart") !==null){
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)
            tempCart.splice(index, 1)

            localStorage.setItem("cart", JSON.stringify(tempCart))

            this.initCart()

        }
    }
    checkOut = () =>{
        console.log("checkout")
        let tempCart = []
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let data = {
            customer_id: this.state.customerID,
            detail_transaksi: tempCart
        }

        let url = "http://localhost:8080/transaksi/"

        axios.post(url, data, this.headerConfig())
        .then(res =>{
            window.alert(res.data.message)
            localStorage.removeItem("cart")
            window.location = "/transaction"
        })
        .catch(err =>{
            if(err.res){
                if(err.res.status) {
                    window.alert(err.res.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(err);
            }
        })

    } 
    initCart = () =>{
        let tempCart = []
        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        if(localStorage.getItem("customer") !==null){
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                customerID: customer.customer_id,
                customerName: customer.name
            })
        }
        let totalHarga = 0;
        tempCart.map(item =>{
            totalHarga +=(item.price * item.qty)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount(){
        this.initCart()
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>
                <div className="container">
                    <div className="card col-12 mt-4" style={{backgroundColor:"black", border:"none"}}>
                        <div className="card-header bg-warning text-dark">
                            <h4>Keranjang</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="text-info">
                                Customer: {this.state.customerName}
                            </h5>

                            <table className="table table-bordered text-white mt-4">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.cart.map((item,index)=>(
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>Rp. {item.price.toLocaleString('de-DE')}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">
                                                Rp {(item.price * item.qty).toLocaleString('de-DE')}
                                            </td>
                                            <td>
                                            <button className="btn btn-dark m-1 text-success" onClick={()=> this.editItem(item)}>Edit</button>
                                            <button className="btn btn-dark m-1 text-danger" onClick={() => this.dropItem(item)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3">Total</td>
                                        <td className="text-right">Rp {this.state.total.toLocaleString('de-DE')}</td>
                                        <td className="d-grid gap-2">
                                            <button className="btn btn-sm btn-success m-1" onClick={() => this.checkOut()} disabled={this.state.cart.lenght === 0}>
                                                Checkout
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}