import React from 'react'

export default class CustomerList extends React.Component {
    render() {
        return(
            <div className="card col-sm-12 my-1 mb-3" style={{backgroundColor:"black"}}>
                <div className="card-body row">
                    <div className="col-2 my-2">
                        <img alt={this.props.name} src={this.props.image} 
                        className="img rounded-circle" width="85" height="85" />
                    </div>
                    <div className="col-8 my-2 text-light">
                        <h5 className="text-bold">Name : {this.props.name}</h5>
                        <h6>Phone : {this.props.phone}</h6>
                        <h6>Address : {this.props.address}</h6>
                    </div>
                    <div className='d-grid gap-1 col-1'>
                        <button className="btn btn-dark m-1 text-success" onClick={this.props.onEdit}>Edit</button>
                        <button className="btn btn-dark m-1 text-danger" onClick={this.props.onDrop}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}