import * as React from "react";

interface IProps {
}

export class LoginOptions extends React.Component<IProps, {}> {
    render() {
        var style = {
            margin: "5px"
        };
        return (
            <span>
                Login or Register with <a style={style} href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>
            </span>
        );
    }
}