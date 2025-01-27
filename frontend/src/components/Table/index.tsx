import React, { memo, useContext } from "react"

import * as S from "./styles"

import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { T_CardAndTable } from "@/types/Global/T_CardAndTable"


const Table = ({
    type,
    data,

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

}: T_CardAndTable) => {
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
                            return <S.Status $status={data.status}>{data.status ? "Ativo" : "Desativado"}</S.Status>
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
                    <S.TableColumn field="cpf" header="CPF" alignHeader={"left"} />
                    <S.TableColumn field="rg" header="RG" alignHeader={"left"} />
                    <S.TableColumn field="phone" header="Telefone" alignHeader={"left"} />
                    <S.TableColumn field="dob" header="Data Nascimento" alignHeader={"left"} />

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
                                                setDataClient!(data)
                                                processUpdateInformationClient!()
                                            },
                                        },

                                        {
                                            label: "Remover",
                                            command: () => {
                                                setDataClient!(data)
                                                processDeleteInformationClient!()
                                            },
                                        }
                                    ]}
                                />
                            )
                        }}
                    ></S.TableColumn>
                </S.Table>
            )

        case "address":
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
                    <S.TableColumn field="street" header="RUA" alignHeader={"left"} />
                    <S.TableColumn field="locality" header="Bairro" alignHeader={"left"} />
                    <S.TableColumn field="city" header="Cidade" alignHeader={"left"} />
                    <S.TableColumn field="postal_code" header="CEP" alignHeader={"left"} />
                    <S.TableColumn field="state" header="Estado" alignHeader={"left"} />
                    <S.TableColumn field="neighborhood" header="Vizinhança" alignHeader={"left"} />

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
                                                setDataAddress!(data)
                                                processUpdateInformationAddress!()
                                            },
                                        },

                                        {
                                            label: "Remover",
                                            command: () => {
                                                setDataAddress!(data)
                                                processDeleteInformationAddress!()
                                            },
                                        }
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
