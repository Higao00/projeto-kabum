import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { ThemeContext } from "styled-components"
import { validityThemeLocalStorage } from "@/lib/global"
import { T_ChangeTheme } from "@/types/Global/T_ChangeTheme"
import { T_Error } from "@/types/Message/T_Error"
import { Toast } from "primereact/toast"
import { AuthContext } from "@/contexts/AuthContext"
import { T_Menu } from "@/types/Menus/T_Menu"
import { T_Groups } from "@/types/Groups/T_Groups"

import Image from "next/image"
import Link from "next/link"
import * as S from "./styles"
import { isEqual } from "lodash"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import UserProfileHeader from "@/components/UserProfileHeader"

const Header: React.FC<T_ChangeTheme> = ({ alterMenuSide, menuSide }) => {
    const { "kabum.menuid": auxGroup } = parseCookies()

    const toastBR = useRef<Toast>(null)
    const [checkedValue, setCheckedValue] = useState(false)
    const [userProfile, setUserProfile] = useState(false)
    const [screenSize, setScreenSize] = useState(false)

    const [groups, setGroups] = useState<T_Groups[]>([])
    const [group, setGroup] = useState({} as T_Groups)

    const { user } = useContext(AuthContext)

    console.log(user)

    const validityLocalStorageTheme = useCallback(() => {
        const themeProvider = validityThemeLocalStorage()
        if (themeProvider) {
            setCheckedValue(themeProvider.titleTheme === "dark")
        }
    }, [checkedValue])

    useEffect(() => {
        validityLocalStorageTheme()
        setScreenSize(window.screen.width < 800)
    }, [])


    return (
        <>
            <S.ContainerTop>
                <S.LeftContainer>
                    <S.ContainerImageLogo>
                        <a href="/">
                            <Image src={"https://static.kabum.com.br/conteudo/icons/logo.svg"} alt="Logotipo Kabum" width={250} height={40} priority />
                        </a>
                    </S.ContainerImageLogo>

                    <S.ContainerSideMenuButton onClick={alterMenuSide}>{menuSide ? <S.IconBsXLg /> : <S.IconBsList />}</S.ContainerSideMenuButton>
                </S.LeftContainer>

                <S.RightContainer>
                    <S.ContainerSideMenuButton onClick={() => setUserProfile(!userProfile)}>
                        {user?.avatar_url ? (
                            <S.ImageNext
                                src={user.avatar_url ? user.avatar_url : ""}
                                width={30}
                                height={30}
                                alt={`Avatar do ${user.name}`}
                                style={{ borderRadius: "50px" }}
                                priority
                            />
                        ) : (
                            <S.IconBsFillPersonFill />
                        )}
                    </S.ContainerSideMenuButton>
                </S.RightContainer>
            </S.ContainerTop>

            <UserProfileHeader userProfile={userProfile} />

            <>
                <S.ContainerSide menuSide={menuSide}>
                    <S.ContainerSideMenu>
                        <S.TitleSideMenu level={1}>Configuração</S.TitleSideMenu>
                    </S.ContainerSideMenu>

                    <S.ContainerSideMenu>
                        <Link href={"/clientes"} onClickCapture={alterMenuSide}>
                            <S.ContainerLinkSideMenu>
                                <i className={'pi pi-users'} style={{ fontSize: "1.2rem", color: "#fff" }}></i>
                                <S.LinkSideMenu>Clientes</S.LinkSideMenu>
                                <br />
                            </S.ContainerLinkSideMenu>
                        </Link>
                    </S.ContainerSideMenu>

                    <S.ContainerSideMenu>
                        <Link href={"/usuarios"} onClickCapture={alterMenuSide}>
                            <S.ContainerLinkSideMenu>
                                <i className={'pi pi-users'} style={{ fontSize: "1.2rem", color: "#fff" }}></i>
                                <S.LinkSideMenu>Usuários</S.LinkSideMenu>
                                <br />
                            </S.ContainerLinkSideMenu>
                        </Link>
                    </S.ContainerSideMenu>

                    <S.ContainerSideMenu>
                        <Link href={"/endereco"} onClickCapture={alterMenuSide}>
                            <S.ContainerLinkSideMenu>
                                <i className={'pi pi-users'} style={{ fontSize: "1.2rem", color: "#fff" }}></i>
                                <S.LinkSideMenu>Endereços</S.LinkSideMenu>
                                <br />
                            </S.ContainerLinkSideMenu>
                        </Link>
                    </S.ContainerSideMenu>
                </S.ContainerSide>
            </>
        </>
    )
}

export default memo(Header)
