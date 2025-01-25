import { AxiosError } from "axios"
import { api } from "../../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const postResetPassword = async (token: string, newPassWord: string) => {
    const dataUpdate = {
        token: token,
        password: newPassWord,
    }

    try {
        var response = await api.post(`/users/reset`, dataUpdate)

        return { status: response.status, user: response.data }
    } catch (error) {
        const err = error as AxiosError
        const { message, status } = err.response?.data as T_Error
        return {
            status: status,
            message: message,
            title: "Erro ao alterar senha do usuário",
        }
    }
}

export default postResetPassword
