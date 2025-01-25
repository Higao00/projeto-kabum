import { AxiosError } from "axios"
import { T_Error } from "@/types/Message/T_Error"
import { api } from "@/services/Axios/api"

const getAllClients = async () => {
    try {
        const response = await api.get("users/list_clients")

        return { status: response.status, clients: response.data }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao listar os clientes",
        }
    }
}

export default getAllClients
