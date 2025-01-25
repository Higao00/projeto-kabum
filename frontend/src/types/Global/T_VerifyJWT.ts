import { T_User } from "../Users/T_User"

export interface T_VerifyJWT {
    status: number
    data: T_User | any
}
