import { T_User } from "../Users/T_User"

export interface T_TermUse {
    id?: number
    term: string

    userId?: number
    createdBy?: T_User

    status?: boolean
    delete?: boolean
    createdAt?: Date
    updateAt?: Date
}
