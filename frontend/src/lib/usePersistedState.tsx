import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { validityThemeLocalStorage } from "./global"
import { themeDark, themeLight } from "../styles/theme/themeColors"

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: any): Response<T> {
    const [state, setState] = useState(initialState)

    const validityLocalStorageTheme = () => {
        const themeProvider = validityThemeLocalStorage()
        if (themeProvider) {
            setState(themeProvider.titleTheme === "dark" ? themeDark : themeLight)
        }
    }

    useEffect(() => {
        validityLocalStorageTheme()
    }, [])

    return [state, setState]
}

export default usePersistedState
