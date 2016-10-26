import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
//import * as Enumerable from "linq";
import { ImageCSVSlider } from './imagecsvslider';

interface IProps {
    loadProduct(seoname: string): () => void;
    product: Model.IProduct;
}

class ProductDetailDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        var productname = (this.props as any).params.productname;
        this.props.loadProduct(productname);
    }

    render() {
        if (!this.props.product)
            return null;
        
        return (
            <div>
                {this.props.product.Name}
                <img src={this.props.product.ImgUrl} />

                <ImageCSVSlider csvimages={this.props.product.OtherImagesCSV} />
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
    }
}
const ProductDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailDef)

export default ProductDetail;