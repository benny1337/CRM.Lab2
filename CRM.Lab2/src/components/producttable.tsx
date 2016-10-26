﻿import * as React from "react";
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
                            <h2>{product.Name}</h2>
                            <img src={product.ImgUrl} width="100" />
                            {product.Price}:-
                            {product.Supplier}                            
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