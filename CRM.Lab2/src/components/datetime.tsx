import * as React from "react";
import * as Model from '../domain/model';
import * as moment from 'moment';

interface IProps {
    date: Date;
    format?: string;
    style?: any;
}

export class DateTime extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    toText() {
        var format = this.props.format ? this.props.format : 'YYYY-MM-DD HH:mm';
        return moment(this.props.date).format(format);
    }

    render() {
        return this.props.style ? <span style={this.props.style}>{this.toText()}</span> : <span>{this.toText()}</span>            
        
    }
}
