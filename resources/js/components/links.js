import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

class Links extends Component {
  render(){
    return (
      <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/create-item">Create Item</Link></li>
                <li><Link to="/display-items">Items</Link></li>
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
export default Links;


if (document.getElementById('links')) {
    ReactDOM.render( <Links /> , document.getElementById('links'));
}
