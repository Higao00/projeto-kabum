import { AxiosError } from "axios";
import { api } from "../Axios/api";
import { T_Error } from "@/types/Message/T_Error";

const getAllUsers = async () => {
    try {
        const response = await api.get("api/users/all");

        return { status: response.status, users: response.data };
    } catch (error) {
        const err = error as AxiosError;
        const { message, status } = err.response?.data as T_Error;
        return {
            status: status,
            message: message,
            title: "Erro ao listar os usuários",
        };
    }
};

export default getAllUsers;
