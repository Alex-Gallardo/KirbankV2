import { TokenSchema } from "./TokenSchema";

export interface UserSchema {
    _id: string;
    name: string;
    lastName: string
    displayName: string;
    authMode: string;
    mail: string;
    phone: string
    tokens: TokenSchema[];
    wallet?: string;
    created?: number;
    bankInfo?: BankInfo;
    photoURL?:string;
}

// Informacion bancaria
export interface BankInfo {
    holder: string;
    bank: string;
    accountNumber: string;
    typeAccount: string;
}