﻿import { combineReducers } from 'redux'
import * as Model from './model';
import * as Actions from './actions';
import * as Enumerable from "linq"

interface IState {
    user: Model.IUser;
    products: Model.IProduct[];
    currentProduct: Model.IProduct;
    isLoading: boolean;
    asyncactions: Model.IAction[]
}

function appstate(state = {
    user: null,
    isLoading: false,
    currentProduct: null,
    products: [],
    asyncactions: []
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
        case Actions.REQUESTING_USER:
            return (<any>Object).assign({}, state, {
                isLoading: true,                
            });
        case Actions.RECIEVED_USER:            
            return (<any>Object).assign({}, state, {
                isLoading: false,
                user: action.payload
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