import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const createClient = async (client: any) => {
    try {
        var response = await api.post(`api/clients/create`, client);

        return { status: response.status, client: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao criar cliente",
        };
    }
};

export default createClient;
