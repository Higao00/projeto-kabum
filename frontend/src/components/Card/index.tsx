import React, { memo, useContext } from "react"

import Image from "next/image"
import * as S from "./styles"

import { AuthContext } from "@/contexts/AuthContext"

import { Button } from "primereact/button"

import { T_CardAndTable } from "@/types/Global/T_CardAndTable"
import { formatCPF } from "@/lib/formatCPF"
import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { firstAndLastName } from "@/lib/firstAndLastName"

const Card = ({
    type,
    data,

    // user
    setDataUser,
    processDeleteInformationUser,
    processUpdateInformationUser,


    // clients
    setDataClients,
    handleUpdateClient,
    handleViewClient,
    handleViewEquipments,
    handleLinkUsers,


}: T_CardAndTable) => {
    const { user } = useContext(AuthContext)

    switch (type) {
        case "users":
            return (
                <S.Container>
                    <S.Card>
                        <S.TopCard>
                            <S.FlagStatus padding="0.2rem 1rem 0.2rem 3.8rem">
                                <S.ContainerImage>
                                    {data.avatar_url ? (
                                        <Image src={data.avatar_url} width={60} height={60} alt={`Imagem do usuário ${data.name}`} />
                                    ) : (
                                        <S.ContainerIcons>
                                            <S.IconBsFillPersonFill />
                                        </S.ContainerIcons>
                                    )}
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
                                <S.Status status={data.status}>{data.status ? "Ativo" : "Desativado"}</S.Status>
                            </S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Email:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.email}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data?.created_at, true)}</S.LeftSideBodyCard>
                        </S.BodyCard>

                        <S.BottomCard>
                            <Button
                                label="Editar"
                                severity="info"
                                disabled={data.email === "ti@esquadros.com.br"}
                                onClick={() => {
                                    setDataUser!(data)
                                    processUpdateInformationUser!()
                                }}
                            />

                            <Button
                                label="Remover"
                                severity="danger"
                                disabled={data.email === "ti@esquadros.com.br"}
                                onClick={() => {
                                    setDataUser!(data)
                                    processDeleteInformationUser!()
                                }}
                            />
                        </S.BottomCard>
                    </S.Card>
                </S.Container>
            )

        case "clients":
            return (
                <S.Container>
                    <S.Card minHeight="220px">
                        <S.TopCard>
                            <S.FlagStatus>
                                <S.Title>{firstAndLastName(data.corporateName || "")}</S.Title>
                            </S.FlagStatus>

                            <S.FlagNumber>
                                <S.Title>Nº {data.idTotvs}</S.Title>
                            </S.FlagNumber>
                        </S.TopCard>

                        <S.BodyCard>
                            <S.RightSideBodyCard>Nome Fantasia:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{data.fantasyName}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data de criação:</S.RightSideBodyCard>
                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data.createdAt, true)}</S.LeftSideBodyCard>

                            <S.RightSideBodyCard>Data de atualização:</S.RightSideBodyCard>

                            <S.LeftSideBodyCard>{convertDateToBrazilianStandard(data.updateAt, true)}</S.LeftSideBodyCard>
                        </S.BodyCard>

                        <S.BottomCard>
                            <Button
                                label="Atualizar"
                                severity="warning"
                                onClick={() => {
                                    setDataClients!(data)
                                    handleUpdateClient!()
                                }}
                            />

                            <Button
                                label="Visualizar"
                                severity="info"
                                onClick={() => {
                                    setDataClients!(data)
                                    handleViewClient!()
                                }}
                            />

                            <Button
                                label="Equipamento"
                                severity="help"
                                onClick={() => {
                                    setDataClients!(data)
                                    handleViewEquipments!(data)
                                }}
                            />

                            <Button
                                label="Usuários"
                                severity="secondary"
                                onClick={() => {
                                    setDataClients!(data)
                                    handleLinkUsers!(data)
                                }}
                            />
                        </S.BottomCard>
                    </S.Card>
                </S.Container>
            )

        default:
            return <h2>Não há dados</h2>
    }
}

export default memo(Card)
