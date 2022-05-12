import React from 'react'
import axios from "axios"
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import Footer from '../components/footer'
import TransaksiList from '../components/transaksiList'

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            transaction:[],
            selectedItem: null
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
    getTransaksi = () =>{
        let url = "http://localhost:8080/transaksi"
        
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
            <div className='bg'>
                <Navbar/>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <div className="col-lg-12 col-sm-12 p-2">  
                                <div className='row'>
                                <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                                    <h2 style={{color:"red"}}>Transaction List</h2>
                                </div>
                                {this.state.transaction.map(item => (
                                    <TransaksiList
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
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}