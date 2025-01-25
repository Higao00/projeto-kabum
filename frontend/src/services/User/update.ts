import { AxiosError } from "axios"
import { api } from "../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const updateUser = async (user: any, id: number | undefined) => {
    try {
        var response = await api.put(`/users/edit/${id}`, user)

        return { status: response.status, user: response.data }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao editar o usuário",
        }
    }
}

export default updateUser
