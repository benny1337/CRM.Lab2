import * as React from "react";
import * as Model from '../domain/model';
import Spinner from './spinner';
import 'whatwg-fetch';

interface IProps {

}

interface IState {
    isLoading?: boolean;
    products?: Model.IProduct[];
}

export class ProductTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        var self = this;
        fetch('/products/all').then(function (response) {
            return response.json();
        }).then(function (data) {
            var products = data as Model.IProduct[];            
            self.setState({
                isLoading: false,
                products: products
            });
        }).catch(function (ex) {

        });;
    }

    render() {
        if (!this.state || !this.state.products)
            return null;

        var self = this;

        return (
            <div>
                <Spinner isLoading={self.state.isLoading} />
                {self.state.products.map(function (product, index) {
                    return (
                        <div className="product">
                            {product.name}
                        </div>
                        )
                })}
            </div>
        )
    }
}