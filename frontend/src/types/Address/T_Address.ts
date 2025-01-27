export interface T_Address {
    id?: number;
    client_id: number | null;
    postal_code: string;
    street: string;
    neighborhood: string;
    locality: string;
    city: string;
    state: string;
    created_at?: Date | undefined;
    update_at?: Date | undefined;
}
