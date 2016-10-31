import * as React from "react";
import * as Model from '../domain/model';
import * as Actions from '../domain/actions';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { LoginOptions } from './loginoptions';
import Spinner from './spinner';
import Cart from './cart';
import CartButton from './cartbutton';

interface IProps {
    initLoadUser: () => void;
    isLoading: boolean;
    isLoggingIn: boolean;
    asyncactions: Model.IAction[];
    user: Model.IUser;
    cart: Model.IOrderRow[];
}


class AppDef extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.initLoadUser();
    }

    render() {
        var self = this;
        return (
            <div>
                <Cart />
                <div className="menu-wrapper">
                    <Link to="/">Produkter</Link>
                    <Link to="/profile">Mina Sidor</Link>
                    <Link to="/about">Om</Link>
                    
                    <Spinner isLoading={this.props.isLoggingIn} />
                    {self.props.user ? <span>Hej {self.props.user.facebook.name}</span> : (self.props.isLoggingIn ? "" : <LoginOptions />)}
                    <CartButton />
                </div>
                <div>
                    {this.props.children}
                </div>
                <div className="alert alert-success" role="alert">
                    <h5>Asynkrona anrop</h5>
                    {this.props.asyncactions.map(function (action, index) {
                        return (
                            <div className="action" key={index}>
                                <strong>{action.type}:</strong>
                                {(action.endtime && action.starttime) ? (action.endtime - action.starttime) + " ms" : "inte klar"}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.appstate.user,
        isLoading: state.appstate.isLoading,
        isLoggingIn: state.appstate.isLoggingIn,
        asyncactions: state.appstate.asyncactions,
        cart: state.appstate.cart
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        initLoadUser: () => {
            dispatch(Actions.startRecievingUser());
        },
    }
}
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDef)

export default App;