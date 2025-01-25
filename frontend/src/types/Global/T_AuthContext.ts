import { T_User } from "../Users/T_User"
import { T_UserLogin } from "../Users/T_UserLogin"

export interface T_AuthContext {
    isAuthenticated: boolean
    user: T_User | null
    signIn: (data: T_UserLogin) => Promise<any>
    logout: () => Promise<void>
}
