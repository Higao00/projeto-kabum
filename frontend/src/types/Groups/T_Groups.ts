import { T_Menu } from "../Menus/T_Menu"
import { T_Permission } from "../Permission/T_Permission"
import { T_User } from "../Users/T_User"

export interface T_Groups {
    id?: number
    status: number
    description: string
    permissions: T_Permission[]
    users: T_User[]
    menu?: T_Menu

    createdAt?: Date
    updateAt?: Date
}
