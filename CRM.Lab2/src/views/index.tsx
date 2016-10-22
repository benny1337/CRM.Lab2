import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory } from 'react-router';
import { App } from "../components/app";
import { Home } from "../components/home";
import { ProductTable } from "../components/producttable";
import { Profile } from "../components/profile";
import { About } from "../components/about";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/products" component={ProductTable} />
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
        </Route>
    </Router>,
    document.getElementById("content")
);