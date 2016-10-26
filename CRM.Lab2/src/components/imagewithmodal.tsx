import * as React from "react";
import * as Model from '../domain/model';
import * as Modal from 'react-modal';

interface IProps {
    img: string
}

export class ImageWithModal extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }


    render() {
        var itemstyle = {
            cursor: "pointer"
        }
           
        return (
            <div style={itemstyle}><img src={this.props.img} height="150" /></div>
        )
    }
}