import * as React from "react";
import * as Model from '../domain/model';
import Spinner from './spinner';
import 'whatwg-fetch';

interface IProps {

}

export class About extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }
    

    render() {
       
        return (
            <div>
                About   
            </div>
        )
    }
}