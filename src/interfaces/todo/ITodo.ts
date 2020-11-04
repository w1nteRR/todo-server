import { IToken } from "../auth/IToken"

export interface ITodoAdd extends IToken {
    name: string
}

export interface ITodoDelete extends IToken {
    _id: any
}

export interface ITodoEdit extends IToken {
    _id: any
    name: string
}