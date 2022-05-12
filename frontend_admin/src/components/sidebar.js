import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BsSpeedometer2} from "react-icons/bs";
import {GrUserAdmin} from "react-icons/gr";
import {FaUserAstronaut} from "react-icons/fa"
import { MdPeopleAlt, MdLaptopChromebook } from "react-icons/md";
import { BsCart2, BsGear } from "react-icons/bs"


export default class Sidebar extends React.Component{
    constructor(){
        super()
        this.state = {
            adminName : ""
        }
    }
    Logout = () => {
        window.location = "/login"
        localStorage.clear()
    }
    getAdmin = () => {
        let admin = (localStorage.getItem('name'))
        let url = "http://localhost:8080/store/admin"

        axios.get(url)
        .then(res => {
            this.setState({
                adminName : admin
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () => {
        this.getAdmin()
    }
    render(){
        return(
            <nav className="col d-none d-md-block sidebar d-flex flex-column flex-shrink-0 p-3" style={{backgroundColor:"black"}}>
                <Link className="text-decoration-none" style={{color:"red"}} to="/">Toko Komputer</Link>
                <hr className="border"/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to="/" className="nav-link" style={{color:"red"}}>
                            <span className="bi me-2" width="16" height="16"><BsSpeedometer2 size={25}/></span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer" className="nav-link" style={{color:"red"}}>
                        <span className="bi me-2" width="16" height="16"><MdPeopleAlt size={25}/></span>
                        Customers
                        </Link>
                    </li>
                    <li>
                        <Link to="/product" className="nav-link" style={{color:"red"}}>
                        <span className="bi me-2" width="16" height="16"><MdLaptopChromebook size={25}/></span>
                        Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/transaksi" className="nav-link" style={{color:"red"}}>
                        <span className="bi me-2" width="16" height="16"><BsCart2 size={25}/></span>
                        Transaction
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className="nav-link" style={{color:"red"}}>
                        <span className="bi me-2" width="16" height="16"><BsGear size={25}/></span>
                        Adminstrator
                        </Link>
                    </li>
                </ul>
                <hr className="border"/>
                <div className="dropdown mt-auto">
                    <Link href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="bi me-2" width="16" height="16"><FaUserAstronaut size={25}/></span>
                        {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
                        <strong>{this.state.adminName}</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        {/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" onClick={() => this.Logout()}>Sign out</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}