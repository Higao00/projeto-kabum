import { T_User } from "../Users/T_User"
import { T_ServiceOrder } from "./T_ServiceOrder"

export interface T_ServiceOrderAppointment {
    id: number
    serviceOrderId: number
    serviceOrder: T_ServiceOrder
    creatorUserId: number
    creatorUserAppointment: T_User
    requester: string
    companion: string
    techniciansNames: string
    equipment: string
    serialNumber: string
    application: string
    conservationState: string
    electronicConnections: string
    oilLevel: string
    transmissionConditions: string
    voltage: string
    hydraulicConnections: string
    situation: string
    servicesPerformed: string
    orientations: string
    observations: string
    performedTests: string
    type: string
    usedParts: boolean
    documentNumber: string
    completionMessageOne: string
    completionMessageTwo: string
    city: string
    signDate: Date
    reason: string
    createdAt: Date
    updatedAt: Date
    User?: T_User | null
}
