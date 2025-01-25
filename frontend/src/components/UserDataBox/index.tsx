import Image from "next/image"
import * as S from "./styles"
import { T_User } from "@/types/Users/T_User"

export const UserDataBox = ({ name, email, avatar_url, cpf }: T_User) => {
    return (
        <S.Container>
            <S.Header>
                <S.ContainerAvatar>
                    <S.Avatar>
                        {avatar_url ? (
                            <Image
                                src={avatar_url}
                                width={90}
                                height={90}
                                alt={`${name} user avatar`}
                            />
                        ) : (
                            <S.IconBsFillPersonFill />
                        )}
                    </S.Avatar>
                </S.ContainerAvatar>

                <S.ContainerInformation>
                    <S.ContainerText>
                        {/* <S.Title>Nome: </S.Title> */}
                        <S.Description>{name}</S.Description>
                    </S.ContainerText>

                    <S.ContainerText>
                        {/* <S.Title>Email: </S.Title> */}
                        <S.Description>{email}</S.Description>
                    </S.ContainerText>

                    <S.ContainerText>
                        {/* <S.Title>CPF: </S.Title> */}
                        <S.Description>{cpf}</S.Description>
                    </S.ContainerText>
                </S.ContainerInformation>
            </S.Header>

            <S.Footer>
                <S.ButtonPrimeReact label="Editar" severity="warning" />
                <S.ButtonPrimeReact label="Permissão" severity="success" />
                <S.ButtonPrimeReact label="Grupos" severity="info" />
                <S.ButtonPrimeReact label="Remover" severity="danger" />
            </S.Footer>
        </S.Container>
    )
}
