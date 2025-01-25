import { memo } from "react"
import { useContext } from "react"
import { T_Children } from "@/types/Global/T_Children"
import { ThemeMenuContext } from "@/contexts/ThemeMenuContext"
import "primeicons/primeicons.css"

import Main from "../Main"
import Header from "../Header"

const Layout = ({ children }: T_Children) => {
    const { menuSide, alterMenuSide, toggleTheme } = useContext(ThemeMenuContext)

    return (
        <>
            <Header alterTheme={toggleTheme} alterMenuSide={alterMenuSide} menuSide={menuSide} />
            <Main menuSide={menuSide}>{children}</Main>
        </>
    )
}

export default memo(Layout)
