export interface T_User {
    id?: number;
    email: string;
    name: string;
    status: boolean;
    password?: string;
    created_at?: Date | undefined;
    update_at?: Date | undefined;
}
