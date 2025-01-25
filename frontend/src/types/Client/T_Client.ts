export interface T_Client {
    id: number
    idTotvs: string
    corporateName: string
    fantasyName: string
    document: string
    store: string
    contactName: string
    phoneNumber: string
    email: string
    city: string
    uf: string
    zipCode: string
    neighborhood: string
    address: string
    latitude: number
    longitude: number

    createdAt?: Date | undefined
    updateAt?: Date | undefined
}
