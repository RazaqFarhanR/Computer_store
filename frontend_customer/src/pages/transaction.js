import React from 'react'
import axios from "axios"
import Navbar from '../components/navbar'
import TransactionList from '../components/transactionList'

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            transaction:[],
            customer: null
        }
        if(localStorage.getItem("token") && localStorage.getItem("customer")){
            this.state.token = localStorage.getItem("token")
            this.state.customer = JSON.parse(localStorage.getItem("customer"))
        }else{
            window.location = "/login"
        }
    }
    headerConfig=() =>{
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getTransaksi = () =>{
        let url = "http://localhost:8080/transaksi/" + this.state.customer.customer_id
        
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                transaction: res.data.transaksi
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }  
    componentDidMount = () =>{
        this.getTransaksi()
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">
                        Transaksi List
                    </h3>
                    {this.state.transaction.map(item => (
                        <TransactionList
                        key = {item.transaksi_id}
                        transaksi_id= {item.transaksi_id}
                        customer_name= {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                        />
                    ))}
                </div>
            </div>
        )
    }
}