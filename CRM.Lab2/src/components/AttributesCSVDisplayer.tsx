import * as React from "react";
import * as Model from '../domain/model';

interface IProps {
    attributescsv: string
}

export class AttributesCSVDisplayer extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }
    

    render() {
        if (!this.props.attributescsv)
            return null;

        return (
            <ul className="attributeswrapper">
                {this.props.attributescsv.split(',').map(function (attr, index) {
                    return (<li key={index}>{attr}</li>);
                })}
            </ul>
        )
    }
}