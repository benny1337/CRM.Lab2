import * as React from "react";
import * as Model from '../domain/model';


interface IProps {

}


export class Home extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
               this is the index
            </div>
        )
    }
}

