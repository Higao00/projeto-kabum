import { T_Attachment } from "../Attachment/T_Attachment"
import { T_Call } from "../Call/T_Call"
import { T_Category } from "../Categories/T_Category"
import { T_Equipment } from "../Equipment/T_Equipment"
import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_ServiceOrderAppointment } from "./T_ServiceOrderAppointment"
import { T_ServiceOrderInteraction } from "./T_ServiceOrderInteraction"

export interface T_ServiceOrder {
    id?: number
    subject: string | null
    occurrence: string
    priority: "low" | "medium" | "high" // Defina os valores possíveis aqui
    finishedAt?: Date | null
    delete?: boolean
    createdAt?: Date
    updatedAt?: Date
    equipment: T_Equipment | null
    technicianUser?: T_User | null
    responsibleUser?: T_User | null
    creatorUser?: T_User | null
    clientUser: T_User | null
    category: T_Category | null
    status?: T_GeneralStatus | null
    call?: T_Call | null
    technicians?: T_User[]
    Attachment?: T_Attachment[]
    ServiceOrderInteraction?: T_ServiceOrderInteraction[]
    ServiceOrderAppointment?: T_ServiceOrderAppointment[]
}
