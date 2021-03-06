import React from "react"

export default class Footer extends React.Component{
    render(){
        return( 
            <footer class="footer mt-auto py-3 ">
                    <div class="container">
                    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
                    <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
                    </ul>
                    <p class="text-end text-muted">Design by HanR</p>
                </div>
            </footer>
        )
    }
}
