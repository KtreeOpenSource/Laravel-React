import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { URL } from '../Utils/constants'

class CreateItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        active: 1,
        validate: 1,
        items: ''
      }
      this.handleItemNameChange = this.handleItemNameChange.bind(this)
      this.handleItemDescriptionChange = this.handleItemDescriptionChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    if(this.props.location.state !== undefined && this.props.location.state !== null){
      if(this.props.location.state.item !== undefined) {
        this.setState({
          items: this.props.location.state.item,
          name: this.props.location.state.item.name,
          description: this.props.location.state.item.description
        })
      }
    }
  }
  handleItemNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleItemDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleSubmit(e) {
    const {name, description, items} = this.state
      const data = {
        name: name,
        description: description
      }
      if(items == ''){
        let uri = URL + '/api/items';
        axios.post(uri, data)
        .then(response => {
          this.props.history.push('/display-items');
        })
        .catch(function (error) {
            console.log(error);
        })
      } else {
        let uri = URL + '/api/items/'+items.id;
        axios.put(uri, data)
        .then(response => {
          this.props.history.push('/display-items');
        })
        .catch(function (error) {
            console.log(error);
        })
      }
  }
  render(){
    const {validate, items, name, description} = this.state
    return(
      <div className="ItemBlock">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/display-items">Items</Link>
          </div>
        </div><br />
        <div className="form-group">
          <label>Item Name</label>
          <input type="text" className="form-control" id="itemname" value={name} aria-describedby="itemname" placeholder="Enter Item Name" onChange={(e) => this.handleItemNameChange(e)} />
          {validate == 0 ? <p>Please Enter Item Name</p> : ''}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" id="itemdescription" value={description} placeholder="Enter Item Description" onChange={(e) => this.handleItemDescriptionChange(e)} />
          {validate == 0 ? <p>Please Enter Item Description</p> : ''}
        </div>
          <button className="btn btn-primary" onClick={(e) => {this.handleSubmit(e)}}>{items != '' ? 'Update' : 'Save'}</button>
      </div>
    );
  }
}

export default withRouter(CreateItem);
