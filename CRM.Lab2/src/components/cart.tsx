import * as React from "react";
import * as Model from '../domain/model';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';
import { Motion, spring } from 'react-motion';
import { browserHistory } from 'react-router'

interface IProps {
    cartIsVisible: boolean;
    cart: Model.IOrderRow[];
    removeRowWasPressed: (row: Model.IOrderRow) => void;
    cartToggle: () => void;
}

class CartDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);

        this.removeWasPressed.bind(this);
        this.checkoutButtonWasPressed.bind(this);
    }

    removeWasPressed(row: Model.IOrderRow) {
        this.props.removeRowWasPressed(row);
    }

    checkoutButtonWasPressed() {
        this.props.cartToggle();
        browserHistory.push('/checkout');
    }

    render() {
        var self = this;
        
        return (
            <Motion style={{
                x: spring(this.props.cartIsVisible ? 0 : -400, { stiffness: 120, damping: 17, precision:100 })
            }}>
                {({x}: any) =>
                    <div className="cartmenu" style={{
                        right: x
                    }}>
                        <div style={{padding: "20px"}}>
                        <h2>Kundvagn</h2>
                        {this.props.cart.map(function (row, index) {
                                return (
                                    <div className="item" key={index}>{row.Count}st: {row.Product.Name} <button onClick={() => { self.removeWasPressed(row); } }>x</button></div>
                            )
                        })}

                        {this.props.cart.length < 1 ? <h5>Du har inte valt något</h5> : <button onClick={() => { this.checkoutButtonWasPressed() } } className="checkout">Gå till kassan</button>}
                        </div>
                    </div>
                }
            </Motion>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        cart: state.appstate.cart,
        cartIsVisible: state.appstate.cartIsVisible
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeRowWasPressed: (row: Model.IOrderRow) => {
            dispatch(Actions.productWasRemovedFromCart(row));
        },
        cartToggle: () => {
            dispatch(Actions.cartWasToggled());
        },
    }
}
const Cart = connect(
    mapStateToProps,
    mapDispatchToProps
)(CartDef)

export default Cart;