import * as Model from './model';
import * as Service from './service';

export const REQUESTING_USER = "REQUESTING_USER";
export function requestingUser() {
    return { type: REQUESTING_USER, isAsync: true } as Model.IAction
} 

export const RECIEVED_USER = "RECIEVED_USER";
export function recievedUser(u: Model.IUser) {
    return { type: RECIEVED_USER, isAsync: true, payload: u } as Model.IAction
} 

export const START_RECIEVING_USER = "START_RECIEVING_USER";
export function startRecievingUser() {
    return function (dispatch: any) {        
        dispatch(requestingUser());
        let service = new Service.Service();
        return service.UserService.retrieveUser().then(function (user) {
            dispatch(recievedUser(user));
        }).catch(function (error) { });
    }
}

export const REQUESTING_PRODUCTS = "REQUESTING_PRODUCTS";
export function requestingProducts() {
    return { type: REQUESTING_PRODUCTS, isAsync: true } as Model.IAction
} 

export const RECIEVED_PRODUCTS = "RECIEVED_PRODUCTS";
export function recievedProducts(prods: Model.IProduct[]) {
    return { type: RECIEVED_PRODUCTS, isAsync: true, payload: prods } as Model.IAction
}

export const START_RECIEVING_PRODUCTS = "START_RECIEVING_PRODUCTS";
export function startRecievingProducts() {
    return function (dispatch: any) {
        dispatch(requestingProducts());
        let service = new Service.Service();
        return service.ProductService.retrieveProducts().then(function (products) {
            dispatch(recievedProducts(products));
        }).catch(function (error) { });
    }
}