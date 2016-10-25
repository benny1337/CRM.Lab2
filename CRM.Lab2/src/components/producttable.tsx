import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
import Spinner from './spinner';
import 'whatwg-fetch';

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

    render() {
        var self = this;        
        return (
            <div>                
                <Spinner isLoading={self.props.isLoading} />
                {self.props.products.map(function (product, index) {
                    return (
                        <div key={index} className="product">
                            <h2>{product.Name}</h2>
                            <img src={product.ImgUrl} width="100" />
                            {product.Price} :-

                            <p>
                                {product.Text}
                            </p>
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