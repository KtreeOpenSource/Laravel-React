import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { URL } from '../Utils/constants'

class DisplayItems extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: ''
      }
      this.handleEdit = this.handleEdit.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleDetails = this.handleDetails.bind(this)
  }
  componentDidMount(){
       axios.get(URL + '/api/items')
       .then(response => {
         this.setState({
            items: response.data
         });
       })
       .catch(function (error) {
         console.log(error);
       })
     }

     handleEdit(item){
       this.props.history.push({
          pathname: '/create-item',
          state: { item: item }
        })
     }
     handleDelete(item) {
       axios.delete(URL + '/api/items/'+item.id)
       .then(response => {
         this.componentDidMount()
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     handleDetails(item) {
       this.props.history.push({
          pathname: '/item-details',
          state: { item: item }
        })
     }

  render(){
    const {items} = this.state
    return(
      <div>
        <h1>Items</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/create-item">Create Item</Link>
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
              {items.length > 0 && items.map((obj,index) => {
                return (
                  <tr key={index}>
                    <td>{obj.name}</td>
                    <td>{obj.description}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => {this.handleEdit(obj)}}><i className="fa fa-pencil-square-o"></i></button>&nbsp;
                      <button className="btn btn-warning" onClick={() => {this.handleDelete(obj)}}><i className="fa fa-trash-o"></i></button>&nbsp;
                      <button className="btn btn-info" onClick={() => {this.handleDetails(obj)}}><i className="fa fa-info"></i></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
    </div>
    );
  }
}

export default withRouter(DisplayItems);
