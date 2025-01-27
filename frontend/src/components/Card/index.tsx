import React, { memo, useContext } from "react"

import * as S from "./styles"
import { Button } from "primereact/button"

import { T_CardAndTable } from "@/types/Global/T_CardAndTable"
import { formatCPF } from "@/lib/formatCPF"
import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { firstAndLastName } from "@/lib/firstAndLastName"
import { formatRG } from "@/lib/formatRG"
import { formatPhone } from "@/lib/formatPhone"
import { T_Client } from "@/types/Client/T_Client"

const Card = ({
    type,
    data,
    buttons,

    // user
    setDataUser,
    processDeleteInformationUser,
    processUpdateInformationUser,


    // clients
    setDataClient,
    processDeleteInformationClient,
    processUpdateInformationClient,

    // address
    setDataAddress,
    processDeleteInformationAddress,
    processUpdateInformationAddress,
    processViewAddressInformation,
    handleGetByIdAddress,


}: T_CardAndTable) => {
    switch (type) {
        case "users":
            return (
                <S.Container>
                    <S.Card>
                        <S.TopCard>
                            <S.FlagStatus padding="0.2rem 1rem 0.2rem 3.8rem">
                                <S.ContainerImage>
                                    <S.ContainerIcons>
                                        <S.IconBsFillPersonFill />
                                    </S.ContainerIcons>
                                </S.ContainerImage>

                                <S.Title>{firstAndLastName(data.name)}</S.Title>
                            </S.FlagStatus>

                            <S.FlagNumber>
                                <S.Title>Nº {data.id}</S.Title>
                            </S.FlagNumber>
                        </S.TopCard>

                        <S.BodyCard>
                            <S.RightSideBodyCard>Status:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>
                                <S.Status $status={data.status}>{data.status ? "Ativo" : "Desativado"}</S.Status>
                            </S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Email:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.email}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data?.created_at, true)}</S.LeftSideBodyCard>
                        </S.BodyCard>

                        {buttons && (
                            <S.BottomCard>
                                <Button
                                    label="Editar"
                                    severity="info"

                                    onClick={() => {
                                        setDataUser!(data)
                                        processUpdateInformationUser!()
                                    }}
                                />

                                <Button
                                    label="Remover"
                                    severity="danger"

                                    onClick={() => {
                                        setDataUser!(data)
                                        processDeleteInformationUser!()
                                    }}
                                />
                            </S.BottomCard>
                        )}
                    </S.Card>
                </S.Container>
            )

        case "clients":
            return (
                <S.Container>
                    <S.Card>
                        <S.TopCard>
                            <S.FlagStatus padding="0.2rem 1rem 0.2rem 3.8rem">
                                <S.ContainerImage>
                                    <S.ContainerIcons>
                                        <S.IconBsFillPersonFill />
                                    </S.ContainerIcons>
                                </S.ContainerImage>

                                <S.Title>{firstAndLastName(data.name)}</S.Title>
                            </S.FlagStatus>

                            <S.FlagNumber>
                                <S.Title>Nº {data.id}</S.Title>
                            </S.FlagNumber>
                        </S.TopCard>

                        <S.BodyCard>
                            <S.RightSideBodyCard>CPF:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{formatCPF(data.cpf)}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>RG:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{formatRG(data.rg)}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Telefone:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{formatPhone(data.phone)}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data de Nascimento:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data.dob, false)}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data?.created_at, true)}</S.LeftSideBodyCard>
                        </S.BodyCard>

                        {buttons && (
                            <S.BottomCard>
                                <Button
                                    label="Editar"
                                    severity="info"
                                    onClick={() => {
                                        setDataClient!(data)
                                        processUpdateInformationClient!()
                                    }}
                                />

                                <Button
                                    label="Remover"
                                    severity="danger"
                                    onClick={() => {
                                        setDataClient!(data)
                                        processDeleteInformationClient!()
                                    }}
                                />

                                <Button
                                    label="Endereço"
                                    severity="info"
                                    onClick={() => {
                                        setDataClient!(data)
                                        handleGetByIdAddress?.(data.id)
                                        processViewAddressInformation!()
                                    }}
                                />

                            </S.BottomCard>
                        )}
                    </S.Card>
                </S.Container>
            )

        case "address":
            return (
                <S.Container>
                    <S.Card>
                        <S.TopCard>
                            <S.FlagStatus padding="0.2rem 1rem 0.2rem 3.8rem">
                                <S.ContainerImage>
                                    <S.ContainerIcons>
                                        <S.IconBsFillPersonFill />
                                    </S.ContainerIcons>
                                </S.ContainerImage>

                                <S.Title>{firstAndLastName(data.city)}</S.Title>
                            </S.FlagStatus>

                            <S.FlagNumber>
                                <S.Title>Nº {data.id}</S.Title>
                            </S.FlagNumber>
                        </S.TopCard>

                        <S.BodyCard>
                            <S.RightSideBodyCard>Rua:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.street}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Bairro:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.locality}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>CEP:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.postal_code}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Estado:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.state}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data?.created_at, true)}</S.LeftSideBodyCard>
                        </S.BodyCard>

                        {buttons && (
                            <S.BottomCard>
                                <Button
                                    label="Editar"
                                    severity="info"
                                    onClick={() => {
                                        setDataAddress!(data)
                                        processUpdateInformationAddress!()
                                    }}
                                />

                                <Button
                                    label="Remover"
                                    severity="danger"
                                    onClick={() => {
                                        setDataAddress!(data)
                                        processDeleteInformationAddress!()
                                    }}
                                />
                            </S.BottomCard>
                        )}
                    </S.Card>
                </S.Container>
            )


        default:
            return <h2>Não há dados</h2>
    }
}

export default memo(Card)
