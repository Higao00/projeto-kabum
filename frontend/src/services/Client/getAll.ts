import { AxiosError } from "axios"
import { api } from "../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const getAllClient = async () => {
    try {
        const response = await api.get("api/clients/all")

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

export default getAllClient
