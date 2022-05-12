import React from 'react'
import axios from 'axios'
import { MdPeopleAlt, MdLaptopChromebook } from "react-icons/md";
import { BsCart2, BsGear } from "react-icons/bs"
import { GrUserSettings } from "react-icons/gr";
import Navbar from '../components/navbar'
import '../style/home.css';
import Sidebar from '../components/sidebar';
import ProductList from '../components/productList';

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token : "",
            products:[],
            adminName : "",
            adminCount: 0,
            customerCount: 0,
            productCount: 0,
            transaksiCount: 0
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
    getAdmin = () => {
        let admin = (localStorage.getItem('name'))
        let url = "http://localhost:8080/store/admin"

        axios.get(url)
        .then(res => {
            this.setState({
                adminName : admin,
                adminCount: res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    getCustomer = () => {
        let url = "http://localhost:8080/customer"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                customerCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    getProduct = () => {
        let url = "http://localhost:8080/product"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                productCount: res.data.count,
                products: res.data.product
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                transaksiCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin sign out")) {
            window.localStorage.clear();
            window.location.reload(false);
        }
    }
    componentDidMount = () => {
        this.getAdmin()
        this.getCustomer()
        this.getProduct()
        this.getTransaksi()

    }
    render(){
        return(
            <div className='bg'>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                        <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <div className="col-lg-12 col-sm-12 p-2">
                                    <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                                        <h2 style={{color:"red"}}>Dashboard</h2>
                                    </div>
                                    <div className="row" >
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor: "black", border: "none"}}>
                                                <div className='row'>
                                                    <div className='col mt-2 isi'><BsGear size={70}/></div>
                                                    <div className='col isi'>
                                                        <h4 className='text-center'>Total Admin</h4>
                                                        <h3 className='text-center'>{this.state.adminCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor: "black", border: "none"}}>
                                                <div className='row'>
                                                    <div className='col mt-2 isi'><MdPeopleAlt size={70}/></div>
                                                    <div className='col isi'>
                                                        <h4 className='text-center'>Total Customer</h4>
                                                        <h3 className='text-center'>{this.state.customerCount}</h3>
                                                    </div>   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor: "black", border: "none"}}>
                                                <div className='row'>
                                                    <div className='col mt-2 isi'><MdLaptopChromebook size={70}/></div>
                                                    <div className='col isi'>
                                                        <h4 className='text-center'>Total Produk</h4>
                                                        <h3 className='text-center'>{this.state.productCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className='card alert alert-secondary' style={{backgroundColor: "black", border: "none"}}>
                                                <div className='row'>
                                                    <div className='col mt-2 isi'><BsCart2 size={70}/></div>
                                                    <div className='col isi'>
                                                        <h4 className='text-center'>Total Transaksi</h4>
                                                        <h3 className='text-center'>{this.state.transaksiCount}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <br/>
                                    <div className="card" style={{ height: '15rem', backgroundColor:'black' }}>
                                        <div className="card-body row" >
                                            <h5 className='text-danger'>Product</h5>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="card" style={{ height: '15rem', backgroundColor:'black' }}>
                                        <div className="card-body row" >
                                            <h5 className='text-danger'>Transaction</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}