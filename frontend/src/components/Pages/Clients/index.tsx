import { memo, useContext, useEffect, useState } from "react"

import * as S from "./styles"
import * as G from "@/styles/theme/global.styles"

import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"
import { BsCheck2, BsTrash3, BsXLg } from "react-icons/bs"

import _ from "lodash"
import Card from "@/components/Card"
import Filters from "@/components/Filters"
import Loader from "@/components/Loader"
import { Controller, useForm } from "react-hook-form"

import { sortByAlphabet, sortByID } from "@/lib/sortBy"
import { capitalizeWords } from "@/lib/capitalizeWords"
import { T_FilterOptions } from "@/types/Global/T_FilterOptions"

import { Skeleton } from "@/components/Skeleton"

import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { ToastContext } from "@/contexts/ToastContext"
import { VisualizationContext } from "@/contexts/VisualizationContext"
import Table from "@/components/Table"
import { T_Client } from "@/types/Client/T_Client"
import getAllClient from "@/services/Client/getAll"
import createClient from "@/services/Client/create"
import updateClient from "@/services/Client/update"
import deleteClient from "@/services/Client/delete"

const Clients = () => {
    const { showToast } = useContext(ToastContext)
    const { visualization } = useContext(VisualizationContext)

    // States to user
    const [client, setClient] = useState({} as T_Client)
    const [clients, setClients] = useState([] as T_Client[])
    const [auxClients, setAuxClients] = useState([] as T_Client[])

    const defaultValues: T_Client = {
        cpf: '',
        dob: '',
        name: '',
        phone: '',
        rg: ''
    }

    // Loading button
    const [loadingButton, setLoadingButton] = useState(false)

    // Open close Dialog
    const [updateDialog, setUpdateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [createDialog, setCreateDialog] = useState(false)

    // Filters
    const [selectedOptionFilter, setSelectedOptionFilter] = useState({} as T_FilterOptions)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
    } = useForm({ defaultValues })


    const handleGetAll = async () => {
        const response: any = await getAllClient()

        if (response.status === 200) {
            setClients(response.clients)
            setAuxClients(response.clients)
        } else {
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleCreate = async (data: T_Client) => {
        setLoadingButton(true)

        interface ClientsCreate {
            name: string;
            dob: string;
            cpf: string;
            rg: string;
            phone: string;
        }

        const client: ClientsCreate = {
            name: capitalizeWords(data.name),
            cpf: data.cpf,
            dob: data.dob,
            phone: data.phone,
            rg: data.rg
        }

        var response: any = await createClient(client)

        if (response.status === 201) {
            const finalClient: T_Client = response.client

            setClients((client) => [...client, finalClient])
            onHideDialogCreate()
        } else {
            setLoadingButton(false)
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleUpdate = async (data: T_Client) => {
        setLoadingButton(true)

        const finaClient = {
            name: capitalizeWords(data.name),
            cpf: data.cpf,
            dob: data.dob,
            phone: data.phone,
            rg: data.rg
        }

        var response: any = await updateClient(finaClient, client.id)

        if (response.status === 200) {
            const { client } = response

            setClients((clients) => {
                return clients.map((u) => {
                    if (client.id === u.id) {
                        return response.client
                    } else {
                        return u
                    }
                })
            })
            onHideDialogUpdate()
        } else {
            setLoadingButton(false)
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoadingButton(true)

        var response: any = await deleteClient(client.id)

        if (response.status === 200) {
            const newClients = clients.filter((item) => item.id !== client.id)
            setClients(newClients)
            onHideDialogDelete()
        } else {
            setLoadingButton(false)
            showToast("error", response.title, response.message, 3000)
        }
    }

    const processUpdateInformation = () => {
        setUpdateDialog(true)
    }

    const processDeleteInformation = () => {
        setDeleteDialog(true)
    }

    const processCreateInformation = () => {
        setClient({} as T_Client)
        setCreateDialog(true)
    }

    const onHideDialogDelete = () => {
        setDeleteDialog(false)
        setLoadingButton(false)
        setClient({} as T_Client)

        reset()
    }

    const onHideDialogCreate = () => {
        setCreateDialog(false)
        setLoadingButton(false)
        setClient({} as T_Client)

        reset()
    }

    const onHideDialogUpdate = () => {
        setUpdateDialog(false)
        setLoadingButton(false)
        setClient({} as T_Client)

        reset()
    }

    const onFilters = _.debounce((item: string) => {
        var aux = [] as T_Client[]

        auxClients.map((client) => {
            var cpf = client?.name ? client?.name.toLowerCase().includes(item.toLowerCase()) : ""
            var dateCreate = client.created_at?.toString() || ""

            if (
                cpf ||
                client.name.toLowerCase().includes(item.toLowerCase()) ||
                client.cpf.toLowerCase().includes(item.toLowerCase()) ||
                convertDateToBrazilianStandard(dateCreate).includes(item)
            ) {
                aux.push(client)
            }
        })

        setClients(aux)
    }, 300)

    const renderCardOrTable = () => {
        if (visualization === "card") {
            return (
                <S.Container>
                    {clients.map((client, index) => (
                        <Card
                            key={index}
                            data={client}
                            type="clients"
                            setDataClient={setClient}
                            processDeleteInformationClient={processDeleteInformation}
                            processUpdateInformationClient={processUpdateInformation}
                        />
                    ))}
                </S.Container>
            )
        }

        if (visualization === "table") {
            return (
                <Table
                    data={clients}
                    type="clients"
                    setDataClient={setClient}
                    processDeleteInformationClient={processDeleteInformation}
                    processUpdateInformationClient={processUpdateInformation}
                />
            )
        }
    }

    useEffect(() => {
        handleGetAll()
    }, [])

    useEffect(() => {
        setValue("name", client.name)
        setValue("cpf", client.cpf)
        setValue("dob", client.dob)
        setValue("phone", client.phone)
        setValue("rg", client.rg)
    }, [client])

    return (
        <>
            <G.TitlePages>Gerenciar Clientes</G.TitlePages>

            <Filters
                handleOpenModalFilter={processCreateInformation}
                handleFilter={onFilters}
                selectedOptionFilter={selectedOptionFilter}
                managerView={true}
            />

            {clients?.length > 0 ? (
                renderCardOrTable()
            ) : (
                <S.Container>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </S.Container>
            )}

            {/* Create */}
            <Dialog visible={createDialog} onHide={onHideDialogCreate} header="Criação de Cliente" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleSubmit(handleCreate)}>
                        <div className="flex flex-column gap-2">
                            {errors.name ? (
                                <small className="p-error">{errors.name.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.name }) + " label-input-login"} htmlFor="name">
                                    Nome*
                                </label>
                            )}

                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Nome é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.cpf ? (
                                <small className="p-error">{errors.cpf.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="cpf">
                                    CPF*
                                </label>
                            )}

                            <Controller
                                name="cpf"
                                control={control}
                                rules={{
                                    required: "CPF é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="cpf" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.rg ? (
                                <small className="p-error">{errors.rg.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="rg">
                                    RG*
                                </label>
                            )}

                            <Controller
                                name="rg"
                                control={control}
                                rules={{
                                    required: "RG é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="rg" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.phone ? (
                                <small className="p-error">{errors.phone.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="phone">
                                    Telefone*
                                </label>
                            )}

                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Telefone é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="phone" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.dob ? (
                                <small className="p-error">{errors.dob.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="dob">
                                    Data de Nascimento*
                                </label>
                            )}

                            <Controller
                                name="dob"
                                control={control}
                                rules={{
                                    required: "Data de Nascimento é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="dob" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogCreate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar Cliente"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Update */}
            <Dialog visible={updateDialog} onHide={onHideDialogUpdate} header="Edição de Cliente" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <div className="flex flex-column gap-2">
                            {errors.name ? (
                                <small className="p-error">{errors.name.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.name }) + " label-input-login"} htmlFor="name">
                                    Nome*
                                </label>
                            )}

                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Nome é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.cpf ? (
                                <small className="p-error">{errors.cpf.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="cpf">
                                    CPF*
                                </label>
                            )}

                            <Controller
                                name="cpf"
                                control={control}
                                rules={{
                                    required: "CPF é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="cpf" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.rg ? (
                                <small className="p-error">{errors.rg.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="rg">
                                    RG*
                                </label>
                            )}

                            <Controller
                                name="rg"
                                control={control}
                                rules={{
                                    required: "RG é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="rg" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.phone ? (
                                <small className="p-error">{errors.phone.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="phone">
                                    Telefone*
                                </label>
                            )}

                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Telefone é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="phone" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.dob ? (
                                <small className="p-error">{errors.dob.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.cpf }) + " label-input-login"} htmlFor="dob">
                                    Data de Nascimento*
                                </label>
                            )}

                            <Controller
                                name="dob"
                                control={control}
                                rules={{
                                    required: "Data de Nascimento é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="dob" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogUpdate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar Cliente"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Delete */}
            <Dialog visible={deleteDialog} onHide={onHideDialogDelete} header="Dados do Cliente" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleDelete}>
                        <div>
                            <S.ContainerData>
                                <S.Title>Nome: </S.Title>
                                <S.Description>{client.name}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>CPF: </S.Title>
                                <S.Description>{client.cpf}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Data de Criação: </S.Title>
                                <S.Description>{convertDateToBrazilianStandard(client?.created_at?.toLocaleString() || "")}</S.Description>
                            </S.ContainerData>
                        </div>

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="info" onClick={onHideDialogDelete} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Remover"
                                severity="danger"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsTrash3 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>
        </>
    )
}

export default memo(Clients)
