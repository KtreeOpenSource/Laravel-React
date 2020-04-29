import React, {Component} from 'react'
import { URL } from '../Utils/constants'

class ItemDetailsView extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: '',
      itemProducts: ''
    }
  }
  componentDidMount() {
    this.setState({
      item: this.props.location.state.item
    }, () => {
      this.getProducts()
    })
  }
  getProducts(){
    const {item} = this.state
    axios.get(URL + '/api/itemProducts/' + item.id)
    .then(response => {
      this.setState({
         itemProducts: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const {itemProducts} = this.state
    return(
      <div className="ItemDetailBlock">
        <div className="card">
          <div className="card-header">
            <h4>Item Details</h4>
          </div>
          <div className="card-body">
          <table className="detailItemTable">
            <tr>
              <td colSpan="3">
                <div className="detailItemName">{itemProducts.name}</div>
              </td>
            </tr>
            {
            itemProducts.get_related_products && itemProducts.get_related_products.length > 0 ?
            itemProducts.get_related_products.map((products, index) => {
              return(
                <tr key={index}>
                <h4>Products: </h4>
                  <td className="details-td">
                    <div className="Detaillabel">Name</div> : <div className="Detailvalue">{products.name}</div>
                    <br /><div className="Detaillabel">Description</div> : <div className="Detailvalue">{products.description}</div>
                  </td>
                </tr>
              )
            }) : 'No Products' }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetailsView
