import { AxiosError } from "axios"
import { api } from "../../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const updateUserPermission = async (data: { id: number | undefined; permissionId: number }) => {
    try {
        var response = await api.post(`/user_permission/remove`, data)

        return { status: response.status, permissions: response.data.permissions }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao remover permissão",
        }
    }
}

export default updateUserPermission
