import * as React from "react";
import * as Model from '../domain/model';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';

interface IProps {
    cartIsVisible: boolean;
    cartToggle: () => void;
    cart: Model.IOrderRow[];
}

class CartButtonDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        var showlabel = "Kundvagn (" + (this.props.cart == null ? 0 : this.props.cart.length) + ")";
        return (
            <div style={{ float:"right" }}>
                <button style={{ float: "right" }} className="btn btn-primary" onClick={() => { this.props.cartToggle() } }>{this.props.cartIsVisible ? "Dölj kundvagn" : showlabel}</button>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        cartIsVisible: state.appstate.cartIsVisible,
        cart: state.appstate.cart
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        cartToggle: () => {
            dispatch(Actions.cartWasToggled());
        },
        
    }
}
const CartButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(CartButtonDef)

export default CartButton;