import React from "react"
import {Link} from "react-router-dom"


export default class Navbar extends React.Component{
    Logout = () => {
        window.location = "/login"
        localStorage.clear()
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "black"}}>
                 <div class="container-fluid">
                    <Link className="navbar-brand ms-5" style={{color:"red"}} to="/">Toko Komputer</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                         <li className="nav-item" >
                             <Link to="/" className="nav-link" style={{color: "red"}}>
                                 Dashboard
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/customer" className="nav-link" style={{color: "red"}}>
                                 Customer
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/product" className="nav-link" style={{color: "red"}}>
                                 Product
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/transaksi" className="nav-link" style={{color: "red"}}>
                                 Transaction
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/admin" className="nav-link" style={{color: "red"}}>
                                 Adminstrator
                             </Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/testpage" className="nav-link" style={{color: "red"}}>
                                 test
                             </Link>
                         </li>
                         <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Log Out
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

