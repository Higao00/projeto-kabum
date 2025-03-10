import axios from "axios"
import { parseCookies } from "nookies"

export const getAPIClient = (ctx?: any) => {
    const { "app.kabum": token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`
    }

    api.interceptors.request.use((config) => {
        return config
    })

    return api
}
