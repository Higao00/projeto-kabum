import usePersistedState from "@/lib/usePersistedState"
import GlobalStyles from "@/styles/theme/global.styles"
import { themeDark, themeLight } from "@/styles/theme/themeColors"
import { T_ThemeMenuContext } from "@/types/Global/T_ThemeMenuContext"
import { createContext, useCallback, useEffect, useState } from "react"
import { DefaultTheme, ThemeProvider } from "styled-components"

export const ThemeMenuContext = createContext({} as T_ThemeMenuContext)

export function ThemeMenuProvider({ children }: any) {
    let [theme, setTheme] = usePersistedState<DefaultTheme>("theme", themeLight)
    let [menuSide, setMenuSide] = useState<boolean>(false)

    const toggleTheme = useCallback(() => {
        theme = theme.titleTheme === "light" ? themeDark : themeLight
        setTheme(theme)
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])

    const alterMenuSide = useCallback(() => {
        setMenuSide(!menuSide)
    }, [menuSide])

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.innerWidth > 800 ? setMenuSide(true) : setMenuSide(false)
        }
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <ThemeMenuContext.Provider value={{ menuSide, toggleTheme, alterMenuSide }}>
                    {children}
                </ThemeMenuContext.Provider>
                <GlobalStyles />
            </ThemeProvider>
        </>
    )
}
