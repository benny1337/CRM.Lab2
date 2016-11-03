import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
//import * as Enumerable from "linq";
import { ImageCSVSlider } from './imagecsvslider';
import { AttributesCSVDisplayer } from './attributescsvdisplayer';
import { AddToCartButton } from './addtocartbutton';
import { AddToCartDialogue } from './addtocartdialogue';
import { Money } from './money';

interface IProps {
    loadProduct(seoname: string): () => void;
    product: Model.IProduct;
    productWasAddedToCart: (row: Model.IOrderRow) => void;
}
interface IState {
    addToCartProduct?: Model.IProduct
}
class ProductDetailDef extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        var productname = (this.props as any).params.productname;
        this.props.loadProduct(productname);
        this.setState({
            addToCartProduct: null
        })
    }

    addToCart() {
        var self = this;
        this.setState({
            addToCartProduct: self.props.product
        });
    }

    okWasPressed(row: Model.IOrderRow) {
        this.props.productWasAddedToCart(row);
        this.setState({
            addToCartProduct: null,
        });
    }

    cancelWasPressed() {
        console.log("cancel add to cart");
        this.setState({
            addToCartProduct: null
        });
    }

    render() {
        if (!this.props.product || !this.state)
            return null;

        var images = [this.props.product.ImgUrl];
        if (this.props.product.OtherImagesCSV)
            images = images.concat(this.props.product.OtherImagesCSV.split(','));

        return (
            <div className="productdetailwrapper">
                <AddToCartDialogue product={this.state.addToCartProduct} productWasAdded={this.okWasPressed.bind(this)} cancel={this.cancelWasPressed.bind(this)} />
                <div>
                    <h2>
                        {this.props.product.Name}
                    </h2>
                    <p>{this.props.product.Subtitle}</p>

                    <p>{this.props.product.Text}</p>
                    <AttributesCSVDisplayer attributescsv={this.props.product.AttributesCSV} />

                </div>
                <div>
                    <ImageCSVSlider images={images} />
                </div>
                <div className="productdetailactions">
                    <div>
                        Fynda nu, endast<br />
                        <span className="price"><Money money={this.props.product.Price} /></span>
                        <AddToCartButton product={this.props.product} addProduct={this.addToCart.bind(this)} />
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        product: state.appstate.currentProduct,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadProduct: (seoname: string) => {
            dispatch(Actions.startRecievingProduct(seoname));
        },
        productWasAddedToCart: (row: Model.IOrderRow) => {
            dispatch(Actions.productWasAddedToCart(row));
        }
    }
}
const ProductDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailDef)

export default ProductDetail;