import * as React from "react";
import * as Model from '../domain/model';
import { Link } from 'react-router';
interface IProps {

}


export class App extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>                
                <div className="menu-wrapper">
                    <Link to="/">Home</Link>
                    <Link to="/products">catalouge</Link>
                    <Link to="/profile">meine pages</Link>
                    <Link to="/about">about</Link>
                </div>
                <div>
                    <h1>SPA</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}