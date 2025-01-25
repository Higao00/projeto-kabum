import { number } from "joi"

export interface T_Equipment {
    id?: number
    code: string
    description: string
    model: string
    serialNumber: string
    measurementUnit: string
    quantity: number
    idTotvsClient: string
    store: string

    clientId?: number

    buyDate: Date | null
    installDate: Date | null
    guaranteeDate: Date | null

    createdAt?: Date
    updateAt?: Date
}
