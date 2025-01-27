export interface T_Client {
    id?: number;
    name: string;
    dob: string;
    cpf: string;
    rg: string;
    phone: string;

    created_at?: Date | undefined;
    update_at?: Date | undefined;
}
