import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const updateAddress = async (address: any, id: number | undefined) => {
    try {
        var response = await api.put(`api/address/${id}`, address);

        return { status: response.status, address: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;

        console.log(err);

        return {
            status: status,
            message: message,
            title: "Erro ao editar o endereço",
        };
    }
};

export default updateAddress;
