import React from 'react'

export default class TransactionList extends React.Component{
    getAmount = products =>{
        let total = 0
        products.map(it => {
            total += Number(it.price) * Number(it.qty)
        })
        return total
    }
    ConvertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    render(){
        return( 
            <div>
                {/* list */}
                <div className='card col-sm-12 my-2' style={{backgroundColor:"black"}}>
                    <div className='card-body row'>
                        <div className='col-lg-4 col-sm-12'>
                            <small className='text-info'>Customer</small>
                            <h6 className='text-light'>{this.props.customer_name}</h6>
                        </div>
                        <div className='col-lg-4 col-sm-12'>
                            <small className='text-info'>Address</small>
                            <h6 className='text-light'>{this.props.customer_address}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-info'>Total Amount</small>
                            <h6 className='text-danger'>Rp {this.getAmount(this.props.products).toLocaleString('de-DE')}</h6>
                        </div>
                        <div className='col-lg-2 col-sm-12'>
                            <small className='text-bold text-info'>Time: {this.ConvertTime(this.props.time)}</small>
                            <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#modalDetail${this.props.transaksi_id}`}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>

                {/*modal component */}
                {/* <div className="modal fade" id="modalDetail"> */}
                <div className='modal fade' id={`modalDetail${this.props.transaksi_id}`}>
                    <div className='modal-dialog modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header bg-success text-white'>
                                <h5>Detail of Transaction</h5>
                            </div>
                            <div className='modal-body'>
                                <h5>Customer: {this.props.customer_name}</h5>
                                <h6>Time:{this.ConvertTime(this.props.time)}</h6>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.products.map((item, index) => (
                                            <tr key={item.product_id}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.product.name}</td>
                                                <td>Rp {item.price.toLocaleString('de-DE')}</td>
                                                <td>{item.qty}</td>
                                                <td className='text-right'>Rp {(item.price * item.qty).toLocaleString('de-DE')}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold"><h4>Total</h4></td>
                                            <td className='text-right text-danger text-bold'>
                                                <h4>Rp {this.getAmount(this.props.products).toLocaleString('de-DE')}</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}