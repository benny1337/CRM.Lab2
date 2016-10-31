import { combineReducers } from 'redux'
import * as Model from './model';
import * as Actions from './actions';
import * as Enumerable from "linq"

const STOREKEY = "cart";

interface IState {
    user: Model.IUser;
    orders: Model.IOrder[];
    products: Model.IProduct[];
    currentProduct: Model.IProduct;
    isLoading: boolean;
    isLoggingIn: boolean;
    placingOrder: boolean;
    asyncactions: Model.IAction[];
    cart: Model.IOrderRow[];
    cartIsVisible: boolean;
}

function appstate(state = {
    user: null,
    orders: [],
    isLoading: false,
    placingOrder:false,
    currentProduct: null,
    products: [],
    asyncactions: [],
    cartIsVisible: false,
    cart: (localStorage.getItem(STOREKEY) && localStorage.getItem(STOREKEY) !== "undefined") ? JSON.parse(localStorage.getItem(STOREKEY)) as Model.IOrderRow[]: [],
} as IState, action: Model.IAction) {

    switch (action.type) {
        case Actions.ASYNC_OPERATION_STARTED: {
            return (<any>Object).assign({}, state, {
                asyncactions: [...state.asyncactions, (<any>Object).assign({}, action, {
                    type: action.payload
                })],
            });
        }
        case Actions.ASYNC_OPERATION_ENDED: {
            var a = Enumerable.from(state.asyncactions).where(x => x.type == action.payload && x.endtime == null).first();
            if (a) {                
                a.endtime = action.endtime;
                var keep = Enumerable.from(state.asyncactions).where(x => x != a).toArray();
                var actions = [...keep, a];
                return (<any>Object).assign({}, state, {
                    asyncactions: actions,
                });
            } else {
                return (<any>Object).assign({}, state);
            }
        }
        case Actions.START_PLACING_ORDER: {
            return (<any>Object).assign({}, state, {
                placingOrder: true
            });
        }
        case Actions.ORDER_WAS_PLACED: {
            return (<any>Object).assign({}, state, {
                placingOrder: false
            });
        }
        case Actions.CART_WAS_TOGGLED:
            return (<any>Object).assign({}, state, {
                cartIsVisible: !state.cartIsVisible
            });
        case Actions.PRODUCT_WAS_REMOVED_FROM_CART:
            var items = state.cart.filter(function (row) {
                return row != action.payload
            });
            localStorage.setItem(STOREKEY, JSON.stringify(items));
            return (<any>Object).assign({}, state, {
                cart: items
            });
        case Actions.CART_WAS_EMPTIED:
            localStorage.removeItem(STOREKEY);
            return (<any>Object).assign({}, state, {
                cart: []
            });
        case Actions.PRODUCT_WAS_ADDED_TO_CART:
            var cart = [...state.cart, action.payload];            
            localStorage.setItem(STOREKEY, JSON.stringify(cart));
            return (<any>Object).assign({}, state, {
                cart: cart,
            });
        case Actions.ORDERS_IS_RECIEVING:
            return (<any>Object).assign({}, state, {
                isLoading: true,
                orders:[],
            });       
        case Actions.RECIEVED_ORDERS:            
            return (<any>Object).assign({}, state, {
                orders: action.payload ? action.payload : []                
            });
        case Actions.RECIEVED_USER:            
            return (<any>Object).assign({}, state, {
                isLoggingIn: false,
                user: action.payload
            });
        case Actions.REQUESTING_USER:
            return(<any>Object).assign({}, state, {
                isLoggingIn: true,
                user: null
            });
        case Actions.REQUESTING_PRODUCTS:            
            return (<any>Object).assign({}, state, {
                isLoading: true,
            });
        case Actions.RECIEVED_PRODUCTS:
            return (<any>Object).assign({}, state, {
                isLoading: false,
                products: action.payload
            });
        case Actions.REQUESTING_A_PRODUCT:
            return (<any>Object).assign({}, state, {
                isLoading: true,
                currentProduct: null
            });
        case Actions.RECIEVED_A_PRODUCT:
            return (<any>Object).assign({}, state, {
                isLoading: false,
                currentProduct: action.payload
            });
        default: return state;
    }
}

const Reducer = combineReducers({
    appstate,
});
export default Reducer