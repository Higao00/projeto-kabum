import { T_Attachment } from "../Attachment/T_Attachment"
import { T_Calendar } from "../Calendar/T_Calendar"
import { T_Call } from "../Call/T_Call"
import { T_Category } from "../Categories/T_Category"
import { T_Email } from "../Email/T_Email"
import { T_Equipment } from "../Equipment/T_Equipment"
import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_SolicitationInteraction } from "./T_SolicitationInteraction"

export interface T_Solicitation {
    id?: number
    subject?: string | null
    occurrence: string
    reason: string
    commercialContactName: string
    commercialContactEmail: string
    zapSignDoc?: string | null
    delete?: boolean
    signed?: boolean
    finishedAt?: Date | null
    createdAt?: Date
    updateAt?: Date

    category?: T_Category | null
    equipment?: T_Equipment | null
    status?: T_GeneralStatus | null
    Attachment?: T_Attachment[]
    SolicitationInteraction?: T_SolicitationInteraction[]
    Calendar?: T_Calendar[]
    EmailSent?: T_Email[]
    call?: T_Call | null

    User?: T_User | null
    responsibleUser?: T_User | null
    creatorUser?: T_User | null
    clientUser?: T_User | null
    technicianUser?: T_User | null
}
