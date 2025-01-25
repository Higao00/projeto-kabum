import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_Solicitation } from "./T_Solicitation"

export interface T_SolicitationInteraction {
    id: number
    body: string
    createdAt: Date
    updatedAt: Date
    oldStatusSolicitation: T_GeneralStatus
    newStatusSolicitation: T_GeneralStatus
    creatorUser: T_User
    solicitation: T_Solicitation
}
