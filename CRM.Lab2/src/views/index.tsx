import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../domain/reducer';
import thunk from 'redux-thunk';

import App from "../components/app";
import { Home } from "../components/home";
import ProductTable from "../components/producttable";
import ProductDetail from "../components/productdetail";
import { Profile } from "../components/profile";
import { About } from "../components/about";

let store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/products" component={ProductTable} />
                <Route path="/product/:productname" component={ProductDetail} />                
                <Route path="/profile" component={Profile} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("content")
);
