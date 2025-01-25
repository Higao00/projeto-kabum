import { T_Call } from "../Call/T_Call"
import { T_Category } from "../Categories/T_Category"
import { T_Equipment } from "../Equipment/T_Equipment"

export interface T_SolicitationCreate {
    occurrence: string
    commercialContactName: string
    commercialContactEmail: string
    category: T_Category | null
    equipment: T_Equipment | null
    call?: T_Call

    check1?: boolean
    check2?: boolean
    check3?: boolean
    check4?: boolean
    check5?: boolean
    check6?: boolean
}
