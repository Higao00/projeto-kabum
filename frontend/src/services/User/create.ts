import { AxiosError } from "axios"
import { api } from "../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const createUser = async (user: any) => {
    try {
        var response = await api.post(`/users/create`, user)

        return { status: response.status, user: response.data }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao criar usuário",
        }
    }
}

export default createUser
