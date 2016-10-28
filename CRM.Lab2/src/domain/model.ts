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
    Subtitle: string;
}
export interface IOrder {
    UserId: string;
    OrderRows: IOrderRow[];
    Date: Date;
    Status: OrderState
}
export enum OrderState {
    Pending = 0,
    Placed = 1,
    Done = 2
}
export interface IOrderRow {
    Order: IOrder,
    Product: IProduct,
    Count: number
}
export interface IAction {
    type: string;
    payload: any,
    isAsync: boolean,
    isSuccessful: boolean,
    error: IError,
    starttime: number,
    endtime: number
}
