import React from "react";
import axios from "axios"
import Navbar from "../components/navbar";
import {Modal, Button, Form} from "react-bootstrap"

export default class Profile extends React.Component{
    constructor(){
        super()
        this.state={
            token: "",
            customer: null,
            customerName: "",
            customerAddress: "",
            customerPhone: "",
            customers:[],
            isModalOpen: false,
            name: "",
            phone: "",
            address:"",
            image: null,
            username: "",
            password: "",
            uploadFile: true,
            fillPasword: true,
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
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleEdit = () =>{
        this.setState({
            isModalOpen: true,
            customer_id: this.state.customer.customer_id,
            name: this.state.customers.name,
            phone: this.state.customers.phone,
            address: this.state.customers.address,
            username: this.state.customers.username,
            password: this.state.customers.password,
            fillPassword: false,
        })
    }
    handleChange = (e) =>(
        this.setState({
            [e.target.name] : e.target.value
        })
    )
    handelImage = (e) =>{
        e.preventDefault()
        let form = new FormData()
        form.append("image",this.state.image)

        let url = "http://localhost:8080/customer/" + this.state.customer.customer_id

        axios.put(url, form, this.headerConfig())
        .then(res => {
            console.log()
            this.getCustomer()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name",this.state.name)
        form.append("phone",this.state.phone)
        form.append("address",this.state.address)
        form.append("username",this.state.username)
        form.append("password",this.state.password)
        form.append("image",this.state.image)
    
        let url = "http://localhost:8080/customer/" + this.state.customer.customer_id

        axios.put(url, form, this.headerConfig())
        .then(res => {
            console.log()
            this.getCustomer()
            this.handleClose()
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    getCustomer = () =>{
        let customer = (localStorage.getItem('name'))
        let url = "http://localhost:8080/customer/" + this.state.customer.customer_id

        axios.get(url, this.headerConfig())
        .then(res =>{
            this.setState({
                customers: res.data.customer
            })
            console.log(this.state.customerName)
        })
        .catch(err =>{
            console.log(err.message)
        })
    }
    componentDidMount = () =>{
        this.getCustomer()
    }
    render(){
        return(
            <div className="bg">
                <Navbar/>   
                <div className="card mx-5 mt-5" style={{height:"450px", backgroundColor:"black"}}>
                    <h3 className="text-center mt-3" style={{color:"red"}}>Profile</h3>
                    <div className="row g-0 my-4">
                        <div className="col-3">
                            <div className="row mx-5">
                                <img src={"http://localhost:8080/image/customer/" + this.state.customer.image} alt={this.state.customer.name} width="250" height="200"/>
                            </div>
                            <div className="d-grid mx-5">
                                <button className="btn btn-sm btn-success mt-2 mx-3" onClick={() => this.checkOut()}>
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card g-5">
                                <div className="card-body">
                                    <table className="table table-sm my-2">
                                        <thead>
                                            <tr>
                                                <td className="col-2">Name</td>
                                                <td className="col"><h6>: {this.state.customers.name}</h6></td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td><h6>: {this.state.customers.address}</h6></td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td><h6>: {this.state.customers.phone}</h6></td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="d-grid">
                                        <button className="btn btn-sm btn-success m-1" onClick={() => this.handleEdit(this.state.customer.customer_id)}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>Tambah Customer</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                        <Modal.Body className='bg-dark text-primary'>
                            <Form.Group controlId="name">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control className="bg-dark text-light" type="text" name="name" placeholder="Masukan Nama"
                                                value={this.state.name} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="" controlId="phone">
                                <Form.Label>Telepon</Form.Label>
                                <Form.Control className="bg-dark text-light" type="text" name="phone" placeholder="Masukan Nomor telepon"
                                                value={this.state.phone} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="" controlId="address">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control className="bg-dark text-light" type="text" name="address" placeholder="Masukan Alamat"
                                                value={this.state.address} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group className="" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="bg-dark text-light" type="text" name="username" placeholder="Masukan username"
                                                value={this.state.username} onChange={this.handleChange}/>
                            </Form.Group>
                            {this.state.fillPassword === false ? (
                                <div className="d-grid gap-2 mt-3">
                                <Button className="d-grid gap-2 btn btn-dark mb-1 text-primary" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ fillPassword: true })}>
                                    Change Password
                                </Button>
                                </div>
                            ) : (

                                <Form.Group className="" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className="bg-dark text-light" type="password" name="password" placeholder="Masukan password"
                                                    onChange={this.handleChange}/>
                                </Form.Group>
                            )}
                            {/* {this.state.action === "update" && this.state.uploadFile === false ? (
                                <div className="d-grid gap-2">
                                <Button className="btn btn-dark mb-1 btn-block text-primary" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ uploadFile: true })}>
                                    Ubah Gambar
                                </Button>
                                </div>

                            ) : (

                                <Form.Group className="" controlId="image">
                                    <Form.Label>image</Form.Label>
                                    <Form.Control className="bg-dark text-light" type="file" name="image" placeholder="Pilih Gambar anda"
                                                    value={this.state.Image} onChange={this.handleFile}/>
                                </Form.Group>
                            )}*/}
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