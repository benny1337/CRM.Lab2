import * as React from "react";

interface IProps {
    
}

export class LocalLogin extends React.Component<IProps, {}> {
    render() {
        return (

            <div className="col-sm-6 col-sm-offset-3">

                <h1><span className="fa fa-sign-in"></span> Login</h1>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-warning btn-lg">Login</button>

                <hr />

                <p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a></p>

            </div>
        )
    }
}