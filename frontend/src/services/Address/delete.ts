import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const deleteAddress = async (id: number | undefined) => {
    try {
        const response = await api.delete(`api/address/${id}`);

        return { status: response.status };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao deletar o endereço",
        };
    }
};

export default deleteAddress;
