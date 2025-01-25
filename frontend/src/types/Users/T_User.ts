import { T_Groups } from "../Groups/T_Groups"
import { T_Phone } from "../Phone/T_Phone"
import { T_Permission } from "../Permission/T_Permission"
import { T_Client } from "../Client/T_Client"

export interface T_User {
    id?: number
    email: string
    name: string
    status: boolean
    createdAt?: Date | undefined
    updateAt?: Date | undefined
}
