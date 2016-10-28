import * as React from "react";
import * as Model from '../domain/model';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';

interface IProps {
    cart: Model.IOrderRow[];
    removeRowWasPressed: (row: Model.IOrderRow) => void;
}

class CartDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);

        this.removeWasPressed.bind(this);
    }

    removeWasPressed(row: Model.IOrderRow) {
        this.props.removeRowWasPressed(row);
    }

    render() {
        var self = this;
        return (
            <div>
                <ul>
                    {this.props.cart.map(function (row, index) {
                        return (
                            <li key={index}>{row.Product.Name} <button onClick={() => { self.removeWasPressed(row); } }>x</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        cart: state.appstate.cart        
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeRowWasPressed: (row: Model.IOrderRow) => {
            dispatch(Actions.productWasRemovedFromCart(row));
        },
        
    }
}
const Cart = connect(
    mapStateToProps,
    mapDispatchToProps
)(CartDef)

export default Cart;