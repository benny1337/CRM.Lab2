import { combineReducers } from 'redux'
import * as Model from './model';
import * as Actions from './actions';

interface IState {
    user: Model.IUser;
    products: Model.IProduct[];
    isLoading: boolean;    
}

function appstate(state = {
    user: null,
    isLoading: false,
    products: []
} as IState, action: Model.IAction) {
    switch (action.type) {
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
        default: return state;
    }
}

const Reducer = combineReducers({
    appstate,
});
export default Reducer