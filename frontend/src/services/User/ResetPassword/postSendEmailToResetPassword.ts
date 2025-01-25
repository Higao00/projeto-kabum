import { AxiosError } from "axios"
import { api } from "../../Axios/api"
import { T_Error } from "@/types/Message/T_Error"

const postSendEmailToResetPassword = async (email: string) => {
    const sendEmail = {
        email: email,
    }

    try {
        var response = await api.post(`/users/forgot`, sendEmail)

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

export default postSendEmailToResetPassword
