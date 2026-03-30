export interface IProjects {
    message: string;
    data:    Datum[];
    status:  number;
    success: boolean;
}

export interface Datum {
    id:            string;
    projCode:      string;
    projectName:   string;
    productListId: null | string;
    currencyCode:  CurrencyCode | null;
}

export enum CurrencyCode {
    CAD = "CAD",
    Usd = "USD",
}