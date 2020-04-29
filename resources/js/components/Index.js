import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Index extends Component {
  render(){
    return(
      <div className="container">
        Rajashekar
      </div>
    )
  }
}

if (document.getElementById('index')) {
    ReactDOM.render( <Index / > , document.getElementById('index'));
}
