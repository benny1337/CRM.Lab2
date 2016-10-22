import 'whatwg-fetch';
import * as Model from './model';

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
}