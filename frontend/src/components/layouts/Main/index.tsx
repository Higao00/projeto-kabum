import { T_Children } from "@/types/Global/T_Children"
import * as S from "./styles"
import { memo } from "react"

const Main = ({ menuSide, children }: T_Children) => {
    return <S.Container $menuSide={menuSide ? menuSide : false}>{children}</S.Container>
}

export default memo(Main)
