import 'whatwg-fetch';
import * as Model from './model';

class OrderService {
    saveOrder(order: Model.IOrder) {
        return new Promise((resolve, reject) => {
            fetch('/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            }).then(function (resp) { resolve(); }).catch(function (err) { reject(err); });
        });
    }
    retrieveOrders() {
        return new Promise<Model.IOrder[]>((resolve, reject) => {
            fetch('/orders/all', {
                credentials: 'same-origin'
            }).then(function (response) {
                return response.text();
            }).then(function (text) {                
                if (text == "")
                    resolve();
                try {
                    var data = JSON.parse(text);
                    resolve(data as Model.IOrder[]);
                } catch (e){
                    resolve();
                }
            }).catch(function (ex) {
                console.log(ex);
                reject(ex);
            });
        });
    }
}

class ProductService {
    retrieveProducts() {
        return new Promise<Model.IProduct[]>((resolve, reject) => {
            fetch('/products/all').then(function (response) {
                return response.json();
            }).then(function (data) {                
                resolve(data as Model.IProduct[]);
            }).catch(function (ex) {
                console.log(ex);
                reject(ex);
            });
        });
    }
    retrieveProduct(seoname: string) {
        return new Promise<Model.IProduct>((resolve, reject) => {
            fetch('/products/one/' + seoname).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data as Model.IProduct);
            }).catch(function (ex) {
                console.log(ex);
                reject(ex);
            });
        });
    }
}

class UserService {
    retrieveUser() {
        return new Promise<Model.IUser>((resolve, reject) => {
            fetch('/currentuser', {
                credentials: 'same-origin'
            }).then(function (response) {
                return response.text();
            }).then(function (text) {
                if (text == "")
                    resolve();
                var data = JSON.parse(text);
                var user = data as Model.IUser;
                setTimeout(function () { resolve(user); }, 3000);
            }).catch(function (ex) {
                var err = {
                    message: ex,
                    severity: Model.ErrorSeverity.MorbidDeathFatalError
                } as Model.IError;
                reject(err);
            });;
        });
    }
}

export class Service {
    UserService = new UserService();
    ProductService = new ProductService();
    OrderService = new OrderService();
}