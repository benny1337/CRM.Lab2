export interface IError {
    severity: ErrorSeverity;
    message: string;
}

export enum ErrorSeverity{
    Info,
    MorbidDeathFatalError,
}

export interface IProduct {
    name: string;
    price: number;
    text: string;  
}