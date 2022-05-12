import axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
import {GoSearch} from "react-icons/go"
import {BsCart2} from "react-icons/bs"


export default class Navbar extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            customer: null,
            customerName: ""
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
    Logout = () => {
        window.location = "/login"
        localStorage.clear()
    }
    getCustomer = () =>{
        let customer = (localStorage.getItem('name'))
        let url = "http://localhost:8080/customer"

        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                customerName: this.state.customer.name,
                customerImage: this.state.customer.image
            })
            console.log(this.state.customerName)
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount=()=>{
        this.getCustomer()
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "black"}}>
                 <div class="container-fluid">
                    <Link className="navbar-brand ms-5" style={{color:"red"}} to="/home">Toko Komputer</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        {/* <div className="input-group my-2 ms-5 me-3">
                            <input type="text" className="form-control form-control-sm" placeholder="Cari barang yang Anda inginkan (error)" value={this.state.keyword} onChange={this.handleChange} onKeyUp={e => this.handleSearch(e)}/>
                            <button className="btn btn-outline-danger btn-dark" type="button" id="button-addon2"><GoSearch/></button>
                        </div> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/product" className="nav-link" style={{color: "red"}}>
                                    Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link" style={{color: "red"}}>
                                    <BsCart2 size={30}/>
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/transaction" className="nav-link" style={{color: "red"}}>
                                    Transaction
                                </Link>
                            </li> */}
                        </ul>
                    <div className="dropdown ms-2 me-5">
                        <Link to="/profilCustomer" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="bi me-2" width="16" height="16"></span>
                            <img src={"http://localhost:8080/image/customer/" + this.state.customer.image} alt={this.state.customer.name} width="30" height="30" className="rounded-circle me-2"/>
                            <strong className="fw-normal">{this.state.customerName}</strong>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><Link className="dropdown-item" to="/profileCustomer">Profile</Link></li>
                            <li><Link className="dropdown-item" to="/transaction">Transaction</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item" onClick={() => this.Logout()}>Sign out</Link></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </nav>
        )
    }
}

