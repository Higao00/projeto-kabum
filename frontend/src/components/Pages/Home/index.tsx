import { useContext, useEffect, useState } from "react"
import * as S from "./styles"

import { ToastContext } from "@/contexts/ToastContext"
import getAllUsers from "@/services/User/getAll"
import getAllClient from "@/services/Client/getAll"
import getAllAddress from "@/services/Address/getAll"


const Home = () => {
    const { showToast } = useContext(ToastContext)

    const [users, setUsers] = useState(0)
    const [clients, setClients] = useState(0)
    const [address, setAddress] = useState(0)

    const handleGetAll = async () => {
        const responseUser: any = await getAllUsers()
        const responseClients: any = await getAllClient()
        const responseAddress: any = await getAllAddress()

        if (responseUser.status === 200) {
            setUsers(responseUser.users.length)

        } else {
            showToast("error", responseUser.title, responseUser.message, 3000)
        }

        if (responseClients.status === 200) {
            setClients(responseClients.clients.length)

        } else {
            showToast("error", responseClients.title, responseClients.message, 3000)
        }

        if (responseAddress.status === 200) {
            setAddress(responseAddress.address.length)

        } else {
            showToast("error", responseAddress.title, responseAddress.message, 3000)
        }
    }

    useEffect(() => {
        handleGetAll()
    }, [])

    return (
        <>
            <S.Container>
                <a href="/usuarios">
                    <S.ContainerCard>
                        <S.ContainerHeader>
                            <S.Description>Usuários</S.Description>
                            <S.BsArrowUpRightSquareFillExtends color="#ffc559" />
                        </S.ContainerHeader>

                        <S.ContainerBody>
                            <S.ContainerBodySection>
                                <S.BsApp color="#ffc559">
                                    <S.Description fontSize={28}>{users}</S.Description>
                                </S.BsApp>

                                <S.Title>USUÁRIOS</S.Title>
                            </S.ContainerBodySection>

                            <S.BsGearExtends />
                        </S.ContainerBody>

                        <S.ContainerFooter>
                            <S.BsArrowReturnRightExtends color="#ffc559" />
                            <S.Description fontSize={17}>
                                Visualize todos os Usuarios.
                            </S.Description>
                        </S.ContainerFooter>
                    </S.ContainerCard>
                </a>

                <a href="clientes">
                    <S.ContainerCard>
                        <S.ContainerHeader>
                            <S.Description>Clientes</S.Description>
                            <S.BsArrowUpRightSquareFillExtends color="#82c083" />
                        </S.ContainerHeader>

                        <S.ContainerBody>
                            <S.ContainerBodySection>
                                <S.BsApp color="#82c083">
                                    <S.Description fontSize={28}>{clients}</S.Description>
                                </S.BsApp>

                                <S.Title>CLIENTES</S.Title>
                            </S.ContainerBodySection>

                            <S.BsWrenchAdjustableExtends />
                        </S.ContainerBody>

                        <S.ContainerFooter>
                            <S.BsArrowReturnRightExtends color="#82c083" />
                            <S.Description fontSize={17}>
                                Visualize todos os clientes
                            </S.Description>
                        </S.ContainerFooter>
                    </S.ContainerCard>
                </a>

                <a href="enderecos">
                    <S.ContainerCard>
                        <S.ContainerHeader>
                            <S.Description>Endereços</S.Description>
                            <S.BsArrowUpRightSquareFillExtends color="#bd7bbd" />
                        </S.ContainerHeader>

                        <S.ContainerBody>
                            <S.ContainerBodySection>
                                <S.BsApp color="#bd7bbd">
                                    <S.Description fontSize={28}>{address}</S.Description>
                                </S.BsApp>

                                <S.Title>ENDEREÇOS</S.Title>
                            </S.ContainerBodySection>

                            <S.BsChatLeftTextExtends />
                        </S.ContainerBody>

                        <S.ContainerFooter>
                            <S.BsArrowReturnRightExtends color="#bd7bbd" />
                            <S.Description fontSize={17}>Visualize todos os endereços.</S.Description>
                        </S.ContainerFooter>
                    </S.ContainerCard>
                </a>
            </S.Container>
        </>
    )
}

export default Home
