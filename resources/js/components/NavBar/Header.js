import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router-dom';

class Header extends Component {
  render(){
    return (
      <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/create-item">Create Item</Link></li>
                <li><Link to="/display-items">Items</Link></li>
                <li><Link to="/create-product">Create Product</Link></li>
                <li><Link to="/display-products">Products</Link></li>
              </ul>
            </div>
          </nav>
        <div>
            {this.props.children}
        </div>
      </div>
    )
  }
}
export default Header;
