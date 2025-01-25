import { T_AuthContext } from "@/types/Global/T_AuthContext"
import { T_UserLogin } from "@/types/Users/T_UserLogin"
import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { T_User } from "@/types/Users/T_User"
import { api } from "@/services/Axios/api"

import isEqual from "lodash/isEqual"
import Router from "next/router"
import getUserId from "@/services/User/getId"

export const AuthContext = createContext({} as T_AuthContext)

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = useState<T_User | null>(null)

    const isAuthenticated = !!user

    const signIn = async ({ email, password }: T_UserLogin) => {
        try {
            const response = await api.post("/api/login", { email, password })

            if (response.status === 201) {
                setCookie(undefined, "app.kabum", response.data.token, {
                    maxAge: 60 * 60 * 24, //1 hour
                })

                api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`

                getUser()
                return { data: response.data, status: 201 }
            }
        } catch (error: any) {
            const data = error.response?.data || { message: "Internal server error" }
            return { data, status: 500 }
        }
    }

    const logout = async () => {
        destroyCookie(undefined, "app.kabum")
        destroyCookie(undefined, "kabum.menuid")
        Router.push("/login")
    }

    const getUser = async () => {
        const { "app.kabum": token } = parseCookies()

        if (token) {
            const { sub } = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())

            try {
                const response: any = await getUserId(sub)

                if (response.status === 200) {
                    if (!isEqual(JSON.stringify(response.user), JSON.stringify(user))) {
                        setUser(response.user)
                    }
                } else {
                    logout()
                }
            } catch (error) {
                logout()
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>{children}</AuthContext.Provider>
        </>
    )
}
