import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
import Spinner from './spinner';
import { AttributesCSVDisplayer } from './attributescsvdisplayer';
import { Link } from 'react-router';
import 'whatwg-fetch';
import { browserHistory } from 'react-router'
import Masonry from 'react-masonry-component';


interface IProps {
    isLoading: boolean;
    products: Model.IProduct[];
    loadProducts: () => void;
}


class ProductTableDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);

        this.addToCart.bind(this);
    }

    componentDidMount() {
        this.props.loadProducts();
    }

    onnavigate(url: string) {
        browserHistory.push(url);
    }

    addToCart(product: Model.IProduct) {
        console.log(product.Name);
    }

    render() {
        var self = this;

        return (
            <div>
                <Spinner isLoading={self.props.isLoading} />
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
                                    <button className="btn btn-primary" onClick={() => self.addToCart(product)}>Lägg i kundvagn</button>
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
    }
}
const ProductTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductTableDef)

export default ProductTable;