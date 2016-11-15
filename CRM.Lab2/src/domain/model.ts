import * as Enumerable from "linq"

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
    ProductId: string;
    ImgUrl: string;
    Supplier: string;
    OtherImagesCSV: string;
    AttributesCSV: string;
    SeoName: string;
    Subtitle: string;
}
export interface IOrder {
    UserId: string;
    UserFullName: string;
    UserEmail: string;
    OrderRows: IOrderRow[];
    Date: Date;
    Status: OrderState;
}
export enum OrderState {
    Pending = 0,
    Placed = 1,
    Done = 2
}

export class Aggregates {
    static totalOrderRowValue(orderrows: IOrderRow[]): number {        
        if (!orderrows || orderrows.length < 1)
            return 0;

        try {
            return Enumerable.from(orderrows).sum((row) => {                
                return row.Count * row.Product.Price;
            });
        } catch (e) { console.log(e); return 0; }

    }
}

export module EnumToString {
    export function orderState(state: OrderState): string {
        switch (state) {
            case OrderState.Done:
                return "Klar";
            case OrderState.Pending:
                return "Väntar på att skickas till CRM";
            case OrderState.Placed:
                return "Är skickad till CRM";
        }
    }
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
