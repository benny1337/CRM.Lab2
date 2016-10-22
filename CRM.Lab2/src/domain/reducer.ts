import { combineReducers } from 'redux'
import * as Model from './model';
import * as Actions from './actions';

interface IUserState {
    user: Model.IUser;
    isLoading: boolean;    
}

function user(state = {
    user: null,
    isLoading: false
} as IUserState, action: Model.IAction) {
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
        default: return state;
    }
}

const Reducer = combineReducers({
    user,
});
export default Reducer