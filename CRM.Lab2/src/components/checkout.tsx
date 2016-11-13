import * as React from "react";
import * as Model from '../domain/model';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';
import { LoginOptions } from './loginoptions';
import { Money } from './money';
import Spinner from './spinner';

interface IProps {
    cart: Model.IOrderRow[];
    user: Model.IUser;
    removeRowWasPressed: (row: Model.IOrderRow) => void;
    startPlaceingOrder: (order: Model.IOrder) => void;
    loading: boolean;
}

interface IState {
    orderwasplacedtext: string;
}

class CheckoutDef extends React.Component<IProps, IState> {

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
            UserId: self.props.user.facebook.id,
            UserFullName: self.props.user.facebook.name,
            UserEmail: self.props.user.facebook.email,
        } as Model.IOrder;
        
        self.props.startPlaceingOrder(o);
        self.setState({
            orderwasplacedtext: "Din order är sparad. Du kan se status för alla dina ordrar på 'mina sidor'"
        });
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

        var info: any = (
            <div className="alert alert-info" role="alert">
                Vill du lägga en order med dessa items?
            </div>);

        if (this.state && this.state.orderwasplacedtext) {
            info = (
                <div className="alert alert-success" role="alert">
                    {this.state.orderwasplacedtext}
                </div>
            );
        }
        var table = (
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
                        return (
                            <tr key={index}>
                                <td>{row.Product.Name}</td>
                                <td style={{ textAlign: "right" }}><Money money={row.Product.Price} /></td>
                                <td style={{ textAlign: "right" }}>{row.Count}st</td>
                                <td style={{ textAlign: "right" }}><Money money={rowprice} /></td>
                                <td><i onClick={() => { self.removeRow(row); } } className="material-icons md-dark button">delete</i></td>
                            </tr>
                        )
                    })}                   
                    <tr>
                        <td><b>Totalt</b></td>
                        <td colSpan={2}></td>
                        <td style={{
                            textAlign: "right",
                        }}><Money style={{ fontWeight: "bold" }} money={Model.Aggregates.totalOrderRowValue(this.props.cart)} /></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );        

        return (

            <div style={{
                padding: "20px",
                maxWidth: "1050px"
            }}>
                {info}
                {user}

                <Spinner isLoading={this.props.loading} />

                {this.props.cart.length > 0 ? table : null}
                <div style={{
                    textAlign: "right"
                }}>
                    {this.props.user ? (<button className="btn btn-success" onClick={() => self.placeOrder()}>Lägg order</button>) : ""}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        cart: state.appstate.cart,
        user: state.appstate.user,
        loading: state.appstate.placingOrder,
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