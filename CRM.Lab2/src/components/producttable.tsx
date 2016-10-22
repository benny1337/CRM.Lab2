import * as React from "react";
import * as Model from '../domain/model';
import Spinner from './spinner';
import 'whatwg-fetch';

interface IProps {

}

interface IState {
    isLoading?: boolean
}

export class ProductTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        fetch('/products/all').then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        }).catch(function (ex) {

        });;
    }

    render() {
        if (!this.state)
            return null;

        var self = this;

        return (
            <div>
                <Spinner isLoading={self.state.isLoading} />
                DEN GOA TEXTEN
            </div>
        )
    }
}