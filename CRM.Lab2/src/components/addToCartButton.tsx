import * as React from "react";
import * as Model from '../domain/model';

interface IProps {
    product: Model.IProduct;
    addProduct: (prod: Model.IProduct) => void;
}

export class AddToCartButton extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }


    render() {

        return (
            <button className="btn btn-primary" onClick={() => this.props.addProduct(this.props.product)}>Lägg i kundvagn</button>
        )
    }
}
