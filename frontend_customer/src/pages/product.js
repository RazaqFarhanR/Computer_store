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
            token: "",
            keyword: ""
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
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSearch = (e) =>{
        let url = "http://localhost:8080/product"
        if (e.keyCode === 13){
            // console.log("search")
            let data ={
                keyword: this.state.keyword
            }
            axios.post(url, data, this.headerConfig())
            .then(res =>{
                this.setState({
                    products: res.data.product
                })
            })
            .catch(err =>{
                console.log(err.message)
            })
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
                    <div className="row g-0 mt-4">
                        {/* <div class="alert alert-dark mb-4 mx-2" style={{backgroundColor: "black", border: "none"}}>
                            <h2 style={{color:"red"}}>Product</h2>
                            <input type="text" name="keyword" className="form-control" placeholder="belum berfungsi(error)"
                        value={this.state.keyword} onChange={this.handleChange} onKeyUp={e => this.handleSearch(e)}/>
                        </div> */}
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