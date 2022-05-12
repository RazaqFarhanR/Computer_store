import React from "react";
import axios from "axios";
import rtx from "../image/rtx.jpg"
import ryzen from "../image/ryzen.png"
import intel from "../image/intelArc.jpg"
import Navbar from "../components/navbar";
import ProductList from "../components/productList";
import Footer from "../components/footer";
import '../style/home.css';

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            products:[],
            token: ""
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
    addToCart = (selectedItem) => {
        let tempCart = []

        if(localStorage.getItem("cart") !==null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let existfile = tempCart.find(item => item.product_id === selectedItem.product_id)

        if(existfile){
            window.alert(`Anda telah memilih ${selectedItem.name}`)
        }else{
            let promptJumlah = window.prompt(`Masukan jumlah ${selectedItem.name} yang akan Anda beli`,"")
            if(promptJumlah !==null && promptJumlah !==""){
                selectedItem.qty = promptJumlah

                tempCart.push(selectedItem)

                localStorage.setItem('cart', JSON.stringify(tempCart))
            }
        }
    }
    getProduct = () => {
        let url = "http://localhost:8080/product"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                products: res.data.product
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getProduct()
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>
                <div className="container">
                    <div className="row g-0 mt-3">
                        <div className="col ms-2">
                            <div class="card text-dark bg-warning mb-3" style={{width: "25rem", height: "390px"}}>
                                <div class="card-header"></div>
                                <div class="card-body">
                                    <h5 class="card-title">Tempat Iklan</h5>
                                    <p class="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col ms-2">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{width: "700px", height:"390px"}}>
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                    <img src={rtx} className="d-block w-100" alt="..."/>
                                    </div>
                                    <div className="carousel-item">
                                    <img src={ryzen} className="d-block w-100" alt="..."/>
                                    </div>
                                    <div className="carousel-item">
                                    <img src={intel} className="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 mt-4">
                        <div class="alert alert-dark mb-4 mx-2" style={{backgroundColor: "black", border: "none"}}>
                            <h2 style={{color:"red"}}>Product</h2>
                        </div>
                        {this.state.products.map( item =>(
                            <ProductList
                            Key = {item.product_id}
                            name = {item.name}
                            price = {item.price.toLocaleString('de-DE')}
                            stock = {item.stock}
                            image = {"http://localhost:8080/image/product/" + item.image}
                            onCart = {()=> this.addToCart(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}