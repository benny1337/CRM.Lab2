import * as React from "react";
import * as Model from '../domain/model';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';
import { LoginOptions } from './loginoptions';
import { Money } from './money';


interface IProps {
    cart: Model.IOrderRow[];
    user: Model.IUser;
    removeRowWasPressed: (row: Model.IOrderRow) => void;
    startPlaceingOrder: (order: Model.IOrder) => void;
}

class CheckoutDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);

        this.removeRow.bind(this);
        this.placeOrder.bind(this);
    }

    removeRow(row: Model.IOrderRow) {
        this.props.removeRowWasPressed(row);
    }

    placeOrder() {
        var self = this;
        var o = {
            Date: new Date(),
            OrderRows: self.props.cart,
            Status: Model.OrderState.Pending,
            UserId: self.props.user.facebook.id
        } as Model.IOrder;
        self.props.startPlaceingOrder(o);
        alert("Din order är sparad. Du kan se status för alla dina ordrar på 'mina sidor'");
    }

    render() {
        var self = this;
        var user: any = null;
        if (!this.props.user)
            user = (
                <div>
                    <h2>Du måste vara inloggad</h2>
                    <LoginOptions />
                </div>
            )
        var total = 0;
        return (
            
            <div>
                <p>Vill du lägga en order med dessa items?:</p>
                {user}
                <table className="carttable">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Pris/st</th>
                            <th>Antal</th>
                            <th>Totalt</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(function (row, index) {
                            var rowprice = row.Count * row.Product.Price;
                            total += rowprice;
                            return (
                                <tr key={index}>
                                    <td>{row.Product.Name}</td>
                                    <td style={{ textAlign: "right" }}><Money money={row.Product.Price} /></td>
                                    <td style={{ textAlign: "right" }}>{row.Count} st</td>
                                    <td style={{ textAlign: "right" }}><Money money={rowprice} /></td>
                                    <td><button onClick={() => { self.removeRow(row); } }>x</button></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={3}></td>
                            <td style={{ textAlign: "right" }}><Money money={total} /></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                {this.props.user ? (<button onClick={() => self.placeOrder()}>Lägg order</button>) : ""}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        cart: state.appstate.cart,
        user: state.appstate.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeRowWasPressed: (row: Model.IOrderRow) => {
            dispatch(Actions.productWasRemovedFromCart(row));
        },
        startPlaceingOrder: (order: Model.IOrder) => {
            dispatch(Actions.startPlaceingOrder(order));
        }
    }
}
const Checkout = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutDef)

export default Checkout;