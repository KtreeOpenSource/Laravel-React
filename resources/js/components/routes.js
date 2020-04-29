import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import Header from './NavBar/Header';
import DisplayItems from './Items/index';
import CreateItems from './Items/createItem';
import ItemDetailView from './Items/ItemDetailsView';
import DisplayProducts from './Products/index';
import CreateProducts from './Products/createProduct';

let LandingPage = (props) => {
    return <h1 className="mt-5">Landing Page</h1>;
};

class HeaderRoutes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <BrowserRouter>
            <div>
              <Switch>
                <Route exact path="/home" component={Header} />
                <Route exact path="/create-item" component={CreateItems} />
                <Route exact path="/display-items" component={DisplayItems} />
                <Route exact path="/create-product" component={CreateProducts} />
                <Route exact path="/display-products" component={DisplayProducts} />
                <Route exact path="/item-details" component={ItemDetailView}/>
              </Switch>
            </div>
        </BrowserRouter>
        );
    }
};
ReactDOM.render(<HeaderRoutes />, document.getElementById('react-routes'));
