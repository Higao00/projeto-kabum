import { T_Call } from "../Call/T_Call"
import { T_Category } from "../Categories/T_Category"
import { T_Equipment } from "../Equipment/T_Equipment"
import { T_Priority } from "../Global/T_Priority"
import { T_User } from "../Users/T_User"

export interface T_ServiceOrderCreateF {
    subject: string
    occurrence: string
    priority: T_Priority
    equipment: T_Equipment
    category: T_Category
    call?: T_Call
    clientUser: T_User
}

export interface T_ServiceOrderCreateS {
    callId?: number
    equipmentId: number
    categoryId: number
    priority: string
    subject: string
    occurrence: string
    clientUserId?: number
    statusId?: number
}
