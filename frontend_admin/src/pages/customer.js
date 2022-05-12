import React from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import '../style/home.css';
import {Modal, Button, Form} from "react-bootstrap"
import CustomerList from '../components/customerList';
import Sidebar from '../components/sidebar';

export default class Customer extends React.Component{
    constructor(){
        super()
        this.state = {
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
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name: "",
            phone: "",
            address:"",
            image: null,
            username: "",
            password: "",
            action: "insert"
        })
    }
    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: selectedItem.password,
            uploadFile: false,
            fillPassword: false,
            action: "update"
        })
    }
    handleChange = (e) =>(
        this.setState({
            [e.target.name] : e.target.value
        })
    )
    handleFile = (e) =>{
        this.setState({
            image: e.target.files[0]
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
        
        let url = ""
   
        if (this.state.action === "insert") {
            url = "http://localhost:8080/customer"

            axios.post(url, form, this.headerConfig())
            .then(res => {
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }
        else if (this.state.action === "update"){
            url = "http://localhost:8080/customer/" + this.state.customer_id

            axios.put(url, form, this.headerConfig())
            .then(res => {
                console.log(this.state.customer_id)
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }

    }
    handleDelete = (customer_id) => {
        let url = "http://localhost:8080/customer/" + customer_id

        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    getCustomer = () => {
        let url = "http://localhost:8080/customer"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                customers: res.data.customer
            })
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
            <div className='bg'>
                <div className='container-fluid'>
                    <div className='row'>
                        <Sidebar/>
                    <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="col-lg-12 col-sm-12 p-2">  
                                <div className='row'>
                                <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                                        <h2 style={{color:"red"}}>Customers</h2>
                                    </div>
                                    <button className="col-3 btn btn-dark my-1 mb-3 text-warning" style={{backgroundColor:"black"}} onClick={() => this.handleAdd()}>
                                        Tambah Customer
                                    </button>
                                    {this.state.customers.map((item,index)=>{
                                        return(
                                        <CustomerList
                                        key={index}
                                            nameimage={item.image}
                                            image={"http://localhost:8080/image/customer/" + item.image}
                                            name={item.name}
                                            phone={item.phone}
                                            address={item.address}
                                            onEdit={() => {this.handleEdit(item)}}
                                            onDrop={() => {this.handleDelete(item.customer_id)}}
                                        />
                                        )
                                    })}
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
                            {this.state.action === "update" && this.state.fillPassword === false ? (
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
                            {this.state.action === "update" && this.state.uploadFile === false ? (
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