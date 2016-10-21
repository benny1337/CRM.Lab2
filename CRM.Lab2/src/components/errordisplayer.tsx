import * as React from "react";
import * as Model from '../domain/model';

interface IProps {
    error?: Model.IError;
}

export default class ErrorDisplayer extends React.Component<IProps, {}> {
    
    render() {
        if (!this.props.error)
            return null;

        var classnames = "error-wrapper" + (this.props.error.severity == Model.ErrorSeverity.Info ? " info" : " fatal");

        return (
            <div className="{classnames}">
                {this.props.error.message}
            </div>
        )
    }
}