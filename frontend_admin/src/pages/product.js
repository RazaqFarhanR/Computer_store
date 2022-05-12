import React from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import '../style/home.css';
import {Modal, Button, Form} from "react-bootstrap"
import ProductList from '../components/productList';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

export default class Product extends React.Component{
    constructor(){
        super()
        this.state = {
            products:[],
            isModalOpen: false,
            name: "",
            price: "",
            stock:"",
            image: null,
            uploadFile: true,
            action: ""
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
    handleClose = () =>{
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            price: "",
            stock: "",
            image: null,
            action: "insert",
            uploadFile: true
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleEdit = (selectedItem) => {
        this.setState({
            isModalOpen: true,
            product_id: selectedItem.product_id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock,
            image: null,
            action: "update",
            uploadFile: false
        })
    }
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
        })
    }
    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name",this.state.name)
        form.append("price",this.state.price)
        form.append("stock",this.state.stock)
        form.append("image",this.state.image)
        
        let url = ""
   
        if (this.state.action === "insert") {
            url = "http://localhost:8080/product"

            axios.post(url, form, this.headerConfig())
            .then(res => {
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }
        else if (this.state.action === "update"){
            url = "http://localhost:8080/product/" + this.state.product_id

            axios.put(url, form, this.headerConfig())
            .then(res => {
                console.log(this.state.product_id)
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }

    }
    handleDelete = (product_id) => {
        let url = "http://localhost:8080/product/" + product_id

        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.data.message)
                this.getProduct()
            })
            .catch(err => {
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
            <div className='bg'>
                <div className='container-fluid'>
                    <div className='row sb'>
                        <Sidebar/>
                    <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="col-lg-12 col-sm-12 p-2">
                                <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                                        <h2 style={{color:"red"}}>Product</h2>
                                    </div>
                                <button className="col-3 btn btn-dark my-1 mb-3 text-warning" style={{backgroundColor:"black"}} onClick={() => this.handleAdd()}>
                                        Tambah Product
                                </button>  
                                <div className='row g-0'>
                                    {this.state.products.map(item => (
                                        <ProductList
                                        key = {item.product_id}
                                        nameimage={item.image}
                                            image={"http://localhost:8080/image/product/" + item.image}
                                            name={item.name}
                                            price={item.price.toLocaleString('de-DE')}
                                            stock={item.stock}
                                            onEdit={() => {this.handleEdit(item)}}
                                            onDrop={() => {this.handleDelete(item.product_id)}}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header className='bg-danger text-dark' closeButton>
                        <Modal.Title>Tambah Produk</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body className='bg-dark'>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className='text-warning'>Nama</Form.Label>
                                <Form.Control className="bg-dark text-light" type="text" name="name" placeholder="Masukan Nama Produk"
                                                value={this.state.name} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label className='text-warning'>Harga</Form.Label>
                                <Form.Control className="bg-dark text-light" type="double" name="price" placeholder="Masukan Harga Produk"
                                                value={this.state.price} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label className='text-warning'>Stok</Form.Label>
                                <Form.Control className="bg-dark text-light" type="double" name="stock" placeholder="Masukan Stok Produk"
                                                value={this.state.stock} onChange={this.handleChange}/>
                            </Form.Group>
                            {this.state.action === "update" && this.state.uploadFile === false ? (
                                <Button className="btn btn-dark mb-1 btn-block text-warning" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ uploadFile: true })}>
                                    Ubah Gambar
                                </Button>

                            ) : (

                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className='text-warning'>Image</Form.Label>
                                    <Form.Control className="bg-dark text-light" type="file" name="image" placeholder="Pilih Gambar anda"
                                                    value={this.state.Image} onChange={this.handleFile}/>
                                </Form.Group>
                            )}
                        </Modal.Body>
                        <Modal.Footer className='bg-dark'>
                            <Button className="btn btn-dark m-1 text-danger" style={{backgroundColor:"black"}} onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className="btn btn-dark m-1 text-success" type="submit" style={{backgroundColor:"black"}} onClick={this.handleClose}>
                                Save
                            </Button>
                        </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            </div>    
        )
    }
}