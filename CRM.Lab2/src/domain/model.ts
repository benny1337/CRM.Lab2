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
    Name: string;
    Price: number;
    Text: string;
    Id: string;
    ImgUrl: string;
    Supplier: string;
    OtherImagesCSV: string;
    AttributesCSV: string;
    SeoName: string;
}
export interface IAction {
    type: string;
    payload: any,
    isAsync: boolean,
    isSuccessful: boolean,
    error: IError
}
