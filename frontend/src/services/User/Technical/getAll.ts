import { AxiosError } from "axios"
import { T_Error } from "@/types/Message/T_Error"
import { api } from "@/services/Axios/api"

const getAllTechnical = async () => {
    try {
        const response = await api.get("users/list_technicians")

        return { status: response.status, technical: response.data }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao listar os técnicos",
        }
    }
}

export default getAllTechnical
