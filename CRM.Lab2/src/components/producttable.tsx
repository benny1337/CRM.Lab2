import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
import Spinner from './spinner';
import { AddToCartButton } from './addtocartbutton';
import { AddToCartDialogue } from './addtocartdialogue';
import { AttributesCSVDisplayer } from './attributescsvdisplayer';
import { Link } from 'react-router';
import 'whatwg-fetch';
import { browserHistory } from 'react-router'
import Masonry from 'react-masonry-component';


interface IProps {
    isLoading: boolean;
    products: Model.IProduct[];
    loadProducts: () => void;
    productWasAddedToCart: (row: Model.IOrderRow) => void;
}

interface IState {   
    product?: Model.IProduct
}

class ProductTableDef extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.addToCart.bind(this);
        this.requestCloseFn.bind(this);        
    }

    componentDidMount() {
        this.props.loadProducts();
        this.setState({
            product: null
        })
    }

    onnavigate(url: string) {
        browserHistory.push(url);
    }

    addToCart(product: Model.IProduct) {
        this.setState({
            product: product,
        });
    }

    okWasPressed(row: Model.IOrderRow) {
        this.props.productWasAddedToCart(row);
        this.setState({
            product: null,
        });
    }

    requestCloseFn() {
        this.setState({ product: null });
    }

    render() {
        var self = this;

        if (!self.state)
            return null;

        
        return (
            <div>
                <Spinner isLoading={self.props.isLoading} />
                <AddToCartDialogue product={self.state.product} productWasAdded={self.okWasPressed.bind(self)} cancel={self.requestCloseFn.bind(self)} />
                
                <Masonry
                    elementType={'ul'} // default 'div'
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >

                    {self.props.products.map(function (product, index) {
                        var url = "/product/" + product.SeoName;
                        return (
                            <li key={index} className="product">
                                <div className="click" onClick={() => self.onnavigate(url)}>
                                    <div className="image">
                                        <img src={product.ImgUrl} />
                                    </div>

                                    <div className="title">
                                        <div className="title-content">
                                            <h5>{product.Name}</h5>
                                            <p>
                                                {product.Subtitle}
                                            </p>
                                        </div>                                        
                                    </div>
                                    <AttributesCSVDisplayer attributescsv={product.AttributesCSV} />
                                </div>
                                <div className="productfooter">
                                    <span className="price">{product.Price}:-</span>
                                    <AddToCartButton product={product} addProduct={self.addToCart.bind(self)} />                                    
                                </div>

                            </li>
                        )
                    })}
                </Masonry>
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
        productWasAddedToCart: (row: Model.IOrderRow) => {
            dispatch(Actions.productWasAddedToCart(row));
        }
    }
}
const ProductTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductTableDef)

export default ProductTable;