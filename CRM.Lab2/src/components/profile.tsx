import * as React from "react";
import * as Model from '../domain/model';
import Spinner from './spinner';
import { DateTime } from './datetime';
import { Money } from './money';
import { connect } from 'react-redux'
import * as Actions from '../domain/actions';

interface IProps {
    isLoading: boolean;
    user: Model.IUser;
    orders: Model.IOrder[];
    startRecievingOrders: () => void;
}

class ProfileDef extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.startRecievingOrders();
    }

    render() {
        if (this.props.isLoading)
            return <Spinner isLoading={true} />

        if (this.props.user == null)
            return (<h2>Du är inte ännu inloggad.</h2>)

        return (
            <div style={{ maxWidth: "70%" }}>
                <table className="carttable">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Totalt pris</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(function (order, index) {
                            return (
                                <tr key={index}>
                                    <td><DateTime date={order.Date} /></td>
                                    <td><Money money={Model.Aggregates.totalOrderRowValue(order.OrderRows)} /></td>
                                    <td>
                                        {Model.EnumToString.orderState(order.Status)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.appstate.isLoading,
        orders: state.appstate.orders,
        user: state.appstate.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        startRecievingOrders: () => {
            dispatch(Actions.startRequestingOrders());
        }

    }
}
const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDef)

export default Profile;