import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_ServiceOrder } from "./T_ServiceOrder"

export interface T_ServiceOrderInteraction {
    id: number
    body: string
    createdAt: Date
    updatedAt: Date
    OldStatusServiceOrder: T_GeneralStatus
    NewStatusServiceOrder: T_GeneralStatus
    creatorUserServiceOrder: T_User
    serviceOrder: T_ServiceOrder
    technicians: T_User[]
    Status?: T_GeneralStatus | null
}
