import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { connect } from 'react-redux'
import * as Enumerable from "linq";

interface IProps {
    products: Model.IProduct[];
}

class ProductDetailDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }
    

    render() {
        var productname = (this.props as any).params.productname;
        if (!productname)
            return null;

        var prod = Enumerable.from(this.props.products).where(x => x.SeoName == productname).first();

        return (
            <div>
                {prod.Name}
                <img src={prod.ImgUrl} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        products: state.appstate.products,        
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return { }
}
const ProductDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailDef)

export default ProductDetail;