import React from "react"
import {Link} from "react-router-dom"


export default class Header extends React.Component{
    render(){
        return(
            <header>
                <div class="px-3 py-2 text-white" style={{backgroundColor: "black"}}>
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="my-lg-0 me-lg-auto text-white text-decoration-none">
                        <Link className="navbar-brand" style={{color:"red"}} to="/">Toko Komputer</Link>
                    </a>

                    <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#speedometer2"></use></svg>
                            Dashboard
                        </a>
                        </li>
                        <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#table"></use></svg>
                            Orders
                        </a>
                        </li>
                        <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#grid"></use></svg>
                            Products
                        </a>
                        </li>
                        <li>
                        <a href="#" class="nav-link text-white">
                            <svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlinkHref="#people-circle"></use></svg>
                            Customers
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </header>
        )
    }
}
