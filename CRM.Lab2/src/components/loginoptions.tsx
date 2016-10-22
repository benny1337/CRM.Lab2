﻿import * as React from "react";

interface IProps {
}

export class LoginOptions extends React.Component<IProps, {}> {
    render() {
        var style = {
            margin: "5px"
        };
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1><span className="fa fa-lock"></span> CRM LAB webshop</h1>

                    <p>Login or Register with:</p>
                    <div>
                        <a style={style} href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>                        
                    </div>
                </div>
            </div>
        );
    }
}