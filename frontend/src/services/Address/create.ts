import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const createAddress = async (address: any) => {
    try {
        var response = await api.post(`api/address/create`, address);

        return { status: response.status, address: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao criar endereço",
        };
    }
};

export default createAddress;
