import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { URL } from '../Utils/constants'

class CreateProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      validate: 1,
      products: '',
      items: '',
      selectedItem: 0
    }
    this.handleProductNameChange = this.handleProductNameChange.bind(this)
    this.handleProductDescriptionChange = this.handleProductDescriptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleItemSelectChange = this.handleItemSelectChange.bind(this)
  }
  componentDidMount(){
    if(this.props.location.state !== undefined && this.props.location.state !== null){
      if(this.props.location.state.product !== undefined) {
        this.setState({
          products: this.props.location.state.product,
          name: this.props.location.state.product.name,
          description: this.props.location.state.product.description,
          item_id: this.props.location.state.product.item_id
        })
      }
    }
    axios.get(URL + '/api/items')
    .then(response => {
      this.setState({
         items: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  handleProductNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleProductDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleSubmit(e) {
    const {items, selectedItem} = this.state
    if(selectedItem == 0) {
      alert('Please select item')
    } else {
      this.handleSubmitcalls()
    }
  }
  handleSubmitcalls() {
    const {name, description, products, items, selectedItem} = this.state
    const data = {
        name: name,
        description: description,
        item_id: selectedItem
      }
      if(products == ''){
        let uri = URL + '/api/products';
        axios.post(uri, data)
        .then(response => {
          this.props.history.push('/display-products');
          })
        .catch(function (error) {
            console.log(error);
        })
      } else {
        let uri = URL + '/api/products/'+products.id;
        axios.put(uri, data)
        .then(response => {
          this.props.history.push('/display-products');
          })
        .catch(function (error) {
            console.log(error);
        })
      }
  }
  handleItemSelectChange(e) {
    this.setState({
      selectedItem: e.target.value
    })
  }
  render() {
    const {validate, products, name, description, items} = this.state
    let optionItems = items.length > 0 && items.map((item) =>
        <option key={item.id} value={item.id}>{item.name}</option>
    );
    return (
      <div className="ProductBlock">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/display-products">Products</Link>
          </div>
        </div><br />
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" id="productname" value={name} aria-describedby="productname" placeholder="Enter Product Name" onChange={(e) => this.handleProductNameChange(e)} />
          {validate == 0 ? <p>Please Enter Product Name</p> : ''}
        </div>
        <div className="form-group">
          <label>Product Description</label>
          <input type="text" className="form-control" id="productdescription" value={description} placeholder="Enter Product Description" onChange={(e) => this.handleProductDescriptionChange(e)} />
          {validate == 0 ? <p>Please Enter Product Description</p> : ''}
        </div>
        <div className="form-group">
           <label>Select Item</label>
           <select className="form-control" id="itemsSelect" onChange={(e) => this.handleItemSelectChange(e)}>
              <option value='0'>Please Select Item </option>
              {optionItems}
           </select>
       </div>
          <button className="btn btn-primary" onClick={(e) => {this.handleSubmit(e)}}>{products != '' ? 'Update' : 'Save'}</button>
      </div>
    )
  }
}

export default CreateProducts
