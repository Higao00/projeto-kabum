export interface T_Menu {
    id?: number
    name: string
    link: string
    icon: string
    list?: T_Menu[]
    json?: T_Menu[]

    createdAt?: Date | undefined
    updateAt?: Date | undefined
}
