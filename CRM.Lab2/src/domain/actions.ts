﻿import * as Model from './model';
import * as Service from './service';

export const ASYNC_OPERATION_STARTED = "ASYNC_OPERATION_STARTED";
export function ayncOpertationStarted(type: string) {
    return { type: ASYNC_OPERATION_STARTED, isAsync: true, starttime: new Date().getTime(), payload: type } as Model.IAction
} 

export const ASYNC_OPERATION_ENDED = "ASYNC_OPERATION_ENDED";
export function ayncOpertationEnded(type: string) {
    return { type: ASYNC_OPERATION_ENDED, isAsync: true, endtime: new Date().getTime(), payload: type } as Model.IAction
} 

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
        dispatch(ayncOpertationStarted("Fetching logged in user"));
        dispatch(requestingUser());
        let service = new Service.Service();
        return service.UserService.retrieveUser().then(function (user) {
            dispatch(recievedUser(user));
            dispatch(ayncOpertationEnded("Fetching logged in user"));
        }).catch(function (error) { dispatch(ayncOpertationEnded("Fetching logged in user")); });
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
        dispatch(ayncOpertationStarted("Fetching all products"));
        dispatch(requestingProducts());
        let service = new Service.Service();
        return service.ProductService.retrieveProducts().then(function (products) {
            dispatch(recievedProducts(products));
            dispatch(ayncOpertationEnded("Fetching all products"));
        }).catch(function (error) { dispatch(ayncOpertationEnded("Fetching all products")); });
    }
}

export const REQUESTING_A_PRODUCT = "REQUESTING_A_PRODUCT";
export function requestingProduct() {
    return { type: REQUESTING_A_PRODUCT, isAsync: true } as Model.IAction
}

export const RECIEVED_A_PRODUCT = "RECIEVED_A_PRODUCT";
export function recievedProduct(prod: Model.IProduct) {
    return { type: RECIEVED_A_PRODUCT, isAsync: true, payload: prod } as Model.IAction
}

export const START_RECIEVING_A_PRODUCT = "START_RECIEVING_A_PRODUCT";
export function startRecievingProduct(seoname: string) {
    return function (dispatch: any) {
        dispatch(ayncOpertationStarted("Fetching one product"));
        dispatch(requestingProduct());
        let service = new Service.Service();
        return service.ProductService.retrieveProduct(seoname).then(function (product) {
            dispatch(recievedProduct(product));
            dispatch(ayncOpertationEnded("Fetching one product"));
        }).catch(function (error) { dispatch(ayncOpertationEnded("Fetching one product")); });
    }
}