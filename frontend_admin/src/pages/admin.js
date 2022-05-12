import axios from "axios"
import React from "react"
import Navbar from "../components/navbar"
import {Modal, Button, Form} from "react-bootstrap"
import Sidebar from "../components/sidebar"

export default class Admin extends React.Component{
    constructor(){
        super()
        this.state = {
            isModalOpen: false,
            token: "",
            action: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password:"",
            fillPassword: true,
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }else{
            window.location = "/login"
        }
    }
    headerConfig = () =>{
        let header = {
            headers : { Authorization : `Bearer ${this.state.token}` }
        }
        return header
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () =>{
        this.setState({
            isModalOpen: true,
            name: "",
            username: "",
            password: "",
            action: "insert",
            fillPassword: true,
        })
    }
    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            admin_id: selectedItem.admin_id,
            name: selectedItem.name,
            username: selectedItem.username,
            password: selectedItem.password,
            action: "update",
            fillPassword: false,
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSave = (e) => {
        e.preventDefault()
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username
        }
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }        
        let url = "http://localhost:8080/store/admin"
        
        if (this.state.action === "insert") {
            url = "http://localhost:8080/store/admin"

            axios.post(url, form)
            .then(res =>{
                this.getAdmin()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update"){
            url = "http://localhost:8080/store/admin/" + this.state.admin_id

            axios.put(url, form)
            .then(res =>{
                this.getAdmin()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }
    handleDelete = (admin_id) =>{
        let url = "http://localhost:8080/store/admin/" + admin_id
    
        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url, this.headerConfig())
            .then(res => {
                console.log(res.data.message)
                this.getAdmin()
            })
            .catch(err =>{
                console.log(err.message)
            })
        }
    }
    getAdmin = () => {
        let url = "http://localhost:8080/store/admin"
        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                admins : res.data.admin
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
            <div className="bg">
                <div className="container-fluid">
                <div className="row sb">
                    <Sidebar/>
                    <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <div className="col-lg-12 col-sm-12 p-2">  
                                <div className='row'>
                                    <div class="alert alert-dark mb-4" style={{backgroundColor: "black", border: "none"}}>
                                        <h2 style={{color:"red"}}>Administrator</h2>
                                    </div>
                                    <button className="col-3 btn btn-dark my-1 mb-3 text-warning" style={{backgroundColor:"black"}} onClick={() => this.handleAdd()}>
                                        Tambah Admin
                                    </button>
                                    <table className="table border-dark text-primary" style={{backgroundColor:"black"}}>
                                        <thead>
                                            <tr className="text-primary">
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Username</th>
                                                <th>Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.admins.map((item, index) =>(
                                                <tr key={index} className="text-warning">
                                                    <td>{index+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.username}</td>
                                                    <td>
                                                       <button className="btn btn-dark m-1 text-success" onClick={() => this.handleEdit(item)}>Edit</button> 
                                                       <button className="btn btn-dark m-1 text-danger" onClick={() => this.handleDelete(item.admin_id)}>Delete</button> 
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal admin  */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton className="bg-warning">
                        <Modal.Title>Form Admin</Modal.Title>
                    </Modal.Header>
                    <Form className="bg-dark bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className="text-white" >Admin Name </Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className="text-white">Username</Form.Label>
                                <Form.Control className="text-warning bg-dark" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            {this.state.action === "update" && this.state.fillPassword === false ? (
                                <Button className="btn btn-dark mb-1 btn-block text-warning" style={{backgroundColor:"black"}}
                                    onClick={() => this.setState({ fillPassword: true })}>
                                    Change Password
                                </Button>

                            ) : (

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="text-white">Password</Form.Label>
                                    <Form.Control className="text-warning bg-dark" type="password" name="password" placeholder="Masukkan Password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Group>
                            )}
                        </Modal.Body>
                        <Modal.Footer>

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
