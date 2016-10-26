import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
import Spinner from './spinner';
import { Link } from 'react-router';
import 'whatwg-fetch';
import { browserHistory } from 'react-router'

interface IProps {
    isLoading: boolean;
    products: Model.IProduct[];
    loadProducts: () => void;
}


class ProductTableDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.loadProducts();
    }

    onnavigate(url: string) {
        browserHistory.push(url);
    }

    render() {
        var self = this;
        return (
            <div className="productwrapper">
                <Spinner isLoading={self.props.isLoading} />
                {self.props.products.map(function (product, index) {
                    var url = "/product/" + product.SeoName;
                    return (
                        <div key={index} className="product" onClick={() => self.onnavigate(url)}>
                            <div className="title">
                                <div className="avatar">
                                    <img src="https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/D968A2D0-35B8-41C6-A94A0C5C5FCA0725/thul-43c319fb-cc3a-56b5-afdc-f3544a682986.jpg?response-content-disposition=inline" />
                                </div>
                                <div className="title-content">
                                    <h5>{product.Name}</h5>
                                    <p>
                                        this is a subtitle
                                </p>
                                </div>
                            </div>

                            <div className="image">
                                <img src={product.ImgUrl} />
                            </div>

                            <div className="text">
                                {product.Price}:-
                                {product.Supplier}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        products: state.appstate.products,
        isLoading: state.appstate.isLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadProducts: () => {
            dispatch(Actions.startRecievingProducts());
        },
    }
}
const ProductTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductTableDef)

export default ProductTable;