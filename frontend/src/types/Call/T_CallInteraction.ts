import { T_Attachment } from "../Attachment/T_Attachment"
import { T_GeneralStatus } from "../GeneralStatus/T_GeneralStatus"
import { T_User } from "../Users/T_User"
import { T_Call } from "./T_Call"

export interface T_CallInteraction {
    id?: number
    body: string
    oldStatusId?: number
    newStatusId: number
    OldStatus?: T_GeneralStatus
    NewStatus?: T_GeneralStatus
    createdAt?: Date
    updateAt?: Date
    callId: number
    call?: T_Call
    creatorUserId?: number
    creatorUser?: T_User
    attachmentId?: number | null
    attachment?: T_Attachment | null
}
