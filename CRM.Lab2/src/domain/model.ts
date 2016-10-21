export interface IError {
    severity: ErrorSeverity;
    message: string;
}

export enum ErrorSeverity{
    Info,
    MorbidDeathFatalError,
}