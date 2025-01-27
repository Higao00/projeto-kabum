import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const getAddressClientId = async (id: number) => {
    try {
        const response = await api.get(`/api/address/clientID/${id}`);

        return { status: response.status, address: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao listar os endereços do cliente",
        };
    }
};

export default getAddressClientId;
