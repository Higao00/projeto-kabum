import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/router"

import * as S from "./styles"
import { firstAndLastName } from "@/lib/firstAndLastName"

export interface T_UserProfile {
    userProfile: boolean
}

const UserProfileHeader = ({ userProfile }: T_UserProfile) => {
    const router = useRouter()
    const { logout, user } = useContext(AuthContext)

    return (
        <S.ContainerUserProfile $userProfile={userProfile}>
            <S.FirstUserProfile>
                <S.FirstUserProfileIcon>

                    <S.IconBsFillPersonFill />

                </S.FirstUserProfileIcon>

                <S.FirstUserProfileText>
                    <S.UserName>{firstAndLastName(user?.name)}</S.UserName>
                </S.FirstUserProfileText>
            </S.FirstUserProfile>

            <S.SecondUserProfile>
                <S.ButtonLogout
                    severity="warning"
                    label="Perfil"
                    onClick={() => router.push("/user-profile")}
                    icon={<S.IconBsFillPersonVcardFill />}
                />

                <S.ButtonLogout
                    severity="danger"
                    label="Sair"
                    onClick={logout}
                    icon={<S.IconBsPower />}
                />
            </S.SecondUserProfile>
        </S.ContainerUserProfile>
    )
}

export default UserProfileHeader
