import { T_Category } from "../Categories/T_Category"
import { T_Equipment } from "../Equipment/T_Equipment"
import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_CallInteraction } from "./T_CallInteraction"

export interface T_Call {
    id?: number
    subject: string
    occurrence: string
    finishedAt?: Date

    responsibleUser?: T_User
    creatorUser?: T_User
    technicianUser: T_User
    technicians?: T_User[]
    clientUser: T_User
    equipment: T_Equipment
    category: T_Category
    status?: T_GeneralStatus

    CallInteraction?: T_CallInteraction[]

    delete?: boolean
    createdAt?: Date
    updateAt?: Date
}
