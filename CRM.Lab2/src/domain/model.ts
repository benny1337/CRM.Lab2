export interface IError {
    severity: ErrorSeverity;
    message: string;
}

export enum ErrorSeverity {
    Info,
    MorbidDeathFatalError,
}
export interface IUser {
    local: {
        email: string,
        password: string
    },
    facebook: {
        id: string,
        token: string,
        email: string,
        name: string
    }
}
export interface IProduct {
    name: string;
    price: number;
    text: string;
}
export interface IAction {
    type: string;
    payload: any,
    isAsync: boolean,
    isSuccessful: boolean,
    error: IError
}
