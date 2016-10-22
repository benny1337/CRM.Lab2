import * as React from "react";
import * as Model from '../domain/model';
import { LoginOptions } from './loginoptions';

interface IProps {

}


export class Home extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <LoginOptions />
               this is the index
            </div>
        )
    }
}