import React, { memo, useContext } from "react"

import Image from "next/image"
import * as S from "./styles"

import { AuthContext } from "@/contexts/AuthContext"

import { Button } from "primereact/button"

import { formatCPF } from "@/lib/formatCPF"
import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { T_CardAndTable } from "@/types/Global/T_CardAndTable"
import { firstAndLastName } from "@/lib/firstAndLastName"
import { formatNumberWithSixDecimals } from "@/lib/formatNumberWithSixDecimals"

const Table = ({
    type,
    data,

    // user
    setDataUser,
    setDataItemsMenu,
    processGroupInformationUser,
    processDeleteInformationUser,
    processPermissionInformationUser,
    processUpdateInformationUser,

    // group
    handleRemoveGroup,
    handleUpdateGroup,
    handleViewPermissionsGroup,

    // permission
    handleUpdatePermissions,
    handleRemovePermissions,
    handleAddGroupMenu,
    viewUsers,

    // menu link
    handleEditMenuLink,
    handleRemoveMenuLink,

    // menu item
    handleUpdateItemsMenu,
    handleRemoveItemsMenu,

    // menu
    setDataMenu,
    handleUpdateMenu,
    handleRemoveMenu,

    // status
    setDataGeneralStatus,
    handleUpdateGeneralStatus,
    handleRemoveGeneralStatus,

    // category
    setDataCategory,
    handleUpdateCategory,
    handleRemoveCategory,

    // standard message
    setDataStandardMessage,
    handleUpdateStandardMessage,
    handleRemoveStandardMessage,

    // term use
    setDataTermUse,
    handleRemoveTermUse,
    handleUpdateTermUse,
    handleViewTermUse,

    // clients
    setDataClients,
    handleUpdateClient,
    handleViewClient,
    handleViewEquipments,
    handleLinkUsers,

    // Equipments
    setDataEquipment,
    handleUpdateEquipment,
    handleRemoveEquipment,
    handleViewEquipment,

    // Call
    setDataCall,
    handleAnswerCall,
    handleTechnicalDefinitionCall,
    handleViewEquipmentById,

    // Solicitation
    setDataSolicitation,

    // serviceOrder
    setDataServiceOrder,
    handleViewDetailsById,
    handleTechnicalDefinitionServiceOrder,
    handleAlterStatusServiceOrder,
    handleAnswerServiceOrder,
    handleAppointmentsServiceOrder,
}: T_CardAndTable) => {
    const { user } = useContext(AuthContext)

    switch (type) {
        case "users":
            return (
                <S.Table value={data}>
                    <S.TableColumn
                        header=""
                        alignHeader={"left"}
                        body={(data) => {
                            return (
                                <S.ContainerImage>
                                    <S.ContainerIcons>
                                        <S.IconBsFillPersonFill />
                                    </S.ContainerIcons>
                                </S.ContainerImage>
                            )
                        }}
                    />

                    <S.TableColumn field="id" header="ID" alignHeader={"left"} />
                    <S.TableColumn field="name" header="Nome" alignHeader={"left"} />
                    <S.TableColumn field="email" header="Email" alignHeader={"left"} />


                    <S.TableColumn
                        header="Status"
                        alignHeader={"left"}
                        body={(data) => {
                            return <S.Status status={data.status}>{data.status ? "Ativo" : "Desativado"}</S.Status>
                        }}
                    />


                    <S.TableColumn
                        header="Data Criação"
                        alignHeader={"left"}
                        body={(data) => {
                            return <> {convertDateToBrazilianStandard(data?.created_at)}</>
                        }}
                    />

                    <S.TableColumn
                        header=""
                        alignHeader={"left"}
                        style={{ width: "12%" }}
                        body={(data) => {
                            return (
                                <S.SplitButtonExtends
                                    label="Opções"
                                    severity="info"
                                    model={[
                                        {
                                            label: "Editar",
                                            command: () => {
                                                setDataUser!(data)
                                                processUpdateInformationUser!()
                                            },
                                        },

                                        {
                                            label: "Remover",
                                            command: () => {
                                                setDataUser!(data)
                                                processDeleteInformationUser!()
                                            },
                                        }
                                    ]}
                                />
                            )
                        }}
                    ></S.TableColumn>
                </S.Table>
            )

        case "clients":
            return (
                <S.Table value={data} scrollable>
                    <S.TableColumn field="id" header="ID" alignHeader={"left"} />

                    <S.TableColumn field="idTotvs" header="ID totvs" alignHeader={"left"} />

                    <S.TableColumn field="corporateName" header="Nome Fantasia" alignHeader={"left"} />

                    <S.TableColumn field="contactName" header="Nome Contato" alignHeader={"left"} />

                    <S.TableColumn field="email" header="Email Contato" alignHeader={"left"} />

                    <S.TableColumn
                        header="Data Criação"
                        alignHeader={"left"}
                        style={{ width: "10%" }}
                        body={(data) => {
                            return <> {convertDateToBrazilianStandard(data?.createdAt)}</>
                        }}
                    />

                    <S.TableColumn
                        header=""
                        alignHeader={"left"}
                        style={{ width: "12%" }}
                        body={(data) => {
                            return (
                                <S.SplitButtonExtends
                                    label="Opções"
                                    severity="info"
                                    model={[
                                        {
                                            label: "Atualizar",
                                            command: () => {
                                                setDataClients!(data)
                                                handleUpdateClient!()
                                            },
                                        },
                                        {
                                            label: "Visualizar",
                                            command: () => {
                                                setDataClients!(data)
                                                handleViewClient!()
                                            },
                                        },
                                        {
                                            label: "Equipamentos",
                                            command: () => {
                                                setDataClients!(data)
                                                handleViewEquipments!(data)
                                            },
                                        },

                                        {
                                            label: "Usuários",
                                            disabled: data.technicianUser?.id !== undefined,
                                            command: () => {
                                                setDataClients!(data)
                                                handleLinkUsers!(data)
                                            },
                                        },
                                    ]}
                                />
                            )
                        }}
                    ></S.TableColumn>
                </S.Table>
            )

        default:
            return <h2>Não há dados</h2>
    }
}

export default memo(Table)
