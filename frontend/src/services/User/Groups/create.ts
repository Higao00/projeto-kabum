import { AxiosError } from "axios"
import { api } from "../../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const createUserGroups = async (data: { id: number | undefined; groupID: number | undefined }) => {
    try {
        var response = await api.post(`/user_group/add`, data)

        return { status: response.status, groups: response.data.groups }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao criar grupos",
        }
    }
}

export default createUserGroups
