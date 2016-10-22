import * as React from "react";
import * as Model from '../domain/model';
import Spinner from './spinner';
import 'whatwg-fetch';

interface IProps {

}

export class Profile extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }
    

    render() {
       
        return (
            <div>
                Profile
            </div>
        )
    }
}