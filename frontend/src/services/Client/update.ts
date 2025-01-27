import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const updateClient = async (client: any, id: number | undefined) => {
    try {
        var response = await api.put(`api/clients/${id}`, client);

        return { status: response.status, client: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao editar o cliente",
        };
    }
};

export default updateClient;
