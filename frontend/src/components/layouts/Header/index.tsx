import { memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import { validityThemeLocalStorage } from "@/lib/global"
import { T_ChangeTheme } from "@/types/Global/T_ChangeTheme"

import Image from "next/image"
import Link from "next/link"
import * as S from "./styles"
import { parseCookies } from "nookies"
import UserProfileHeader from "@/components/UserProfileHeader"

const Header: React.FC<T_ChangeTheme> = ({ alterMenuSide, menuSide }) => {

    const [checkedValue, setCheckedValue] = useState(false)
    const [userProfile, setUserProfile] = useState(false)

    const validityLocalStorageTheme = useCallback(() => {
        const themeProvider = validityThemeLocalStorage()
        if (themeProvider) {
            setCheckedValue(themeProvider.titleTheme === "dark")
        }
    }, [checkedValue])

    useEffect(() => {
        validityLocalStorageTheme()
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
                        <S.IconBsFillPersonFill />
                    </S.ContainerSideMenuButton>
                </S.RightContainer>
            </S.ContainerTop>

            <UserProfileHeader userProfile={userProfile} />

            <>
                <S.ContainerSide $menuSide={menuSide}>
                    <S.ContainerSideMenu>
                        <S.TitleSideMenu $level={1}>Configuração</S.TitleSideMenu>
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
                        <Link href={"/enderecos"} onClickCapture={alterMenuSide}>
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
