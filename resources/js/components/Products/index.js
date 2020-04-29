import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { URL } from '../Utils/constants'

class DisplayProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: ''
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount(){
       axios.get(URL + '/api/products')
       .then(response => {
         this.setState({
            products: response.data
         });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

     handleEdit(product){
       this.props.history.push({
          pathname: '/create-product',
          state: { product: product }
        })
     }
     handleDelete(item) {
       axios.delete(URL + '/api/products/'+item.id)
       .then(response => {
         this.componentDidMount()
       })
       .catch(function (error) {
         console.log(error);
       })
     }

  render(){
    const {products} = this.state
    return(
      <div>
        <h1>Products</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/create-product">Create Product</Link>
          </div>
        </div><br />


        <table className="table table-hover">
            <thead>
            <tr>
                <td className="tableColumns">Name</td>
                <td className="tableColumns">Description</td>
                <td className="tableColumns">Actions</td>
            </tr>
            </thead>
            <tbody>
              {products.length > 0 && products.map((obj,index) => {
                return (
                  <tr key={index}>
                    <td>{obj.name}</td>
                    <td>{obj.description}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => {this.handleEdit(obj)}}><i className="fa fa-pencil-square-o"></i></button>&nbsp;
                      <button className="btn btn-warning" onClick={() => {this.handleDelete(obj)}}><i className="fa fa-trash-o"></i></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
    </div>
    )
  }
}

export default withRouter(DisplayProducts);
