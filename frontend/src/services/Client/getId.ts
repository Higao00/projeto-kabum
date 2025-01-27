import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const getClientId = async (id: number) => {
    try {
        const response = await api.get(`/api/clients/${id}`);

        return { status: response.status, client: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao listar o Usuário",
        };
    }
};

export default getClientId;
