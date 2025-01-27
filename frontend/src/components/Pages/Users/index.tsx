import { memo, useContext, useEffect, useState } from "react"

import * as S from "./styles"
import * as G from "@/styles/theme/global.styles"

import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { classNames } from "primereact/utils"
import { BsCheck2, BsFillCloudUploadFill, BsTrash3, BsXLg } from "react-icons/bs"

import _ from "lodash"
import Card from "@/components/Card"
import Filters from "@/components/Filters"
import Loader from "@/components/Loader"
import { Controller, useForm } from "react-hook-form"

import { sortByAlphabet, sortByID } from "@/lib/sortBy"
import { capitalizeWords } from "@/lib/capitalizeWords"
import { T_FilterOptions } from "@/types/Global/T_FilterOptions"
import { T_User } from "@/types/Users/T_User"

import getAllUsers from "@/services/User/getAll"
import deleteUser from "@/services/User/delete"
import updateUser from "@/services/User/update"
import createUser from "@/services/User/create"
import { Skeleton } from "@/components/Skeleton"

import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { ToastContext } from "@/contexts/ToastContext"
import { VisualizationContext } from "@/contexts/VisualizationContext"
import Table from "@/components/Table"
import { Dropdown } from "primereact/dropdown"

const Users = () => {
    const { showToast } = useContext(ToastContext)
    const { visualization } = useContext(VisualizationContext)

    // States to user
    const [user, setUser] = useState({} as T_User)
    const [users, setUsers] = useState([] as T_User[])
    const [auxUsers, setAuxUsers] = useState([] as T_User[])

    interface Status {
        name: string;
        va: boolean;
    }

    const [status] = useState([{ name: 'Ativo', va: true }, { name: 'Desativado', va: false }])
    const [statusUnique, setStatusUnique] = useState({} as Status)

    const defaultValues: T_User = {
        email: "",
        name: "",
        password: "",
        status: false,
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
        register,
    } = useForm({ defaultValues })


    const handleGetAll = async () => {
        const response: any = await getAllUsers()

        if (response.status === 200) {
            setUsers(response.users)
            setAuxUsers(response.users)
        } else {
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleCreate = async (data: T_User) => {
        setLoadingButton(true)

        interface UserCreate {
            name: string
            email: string
            status: boolean
            password: string
        }

        const user: UserCreate = {
            name: capitalizeWords(data.name),
            email: data.email,
            status: statusUnique.va,
            password: data.password || ''
        }

        var response: any = await createUser(user)

        if (response.status === 201) {
            const finalUser: T_User = response.user

            setUsers((users) => [...users, finalUser])
            onHideDialogCreate()
        } else {
            setLoadingButton(false)
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleUpdate = async (data: T_User) => {
        setLoadingButton(true)

        const finalUser = {
            status: statusUnique.va,
            name: capitalizeWords(data.name),
            email: data.email.toLowerCase()
        }

        var response: any = await updateUser(finalUser, user.id)

        if (response.status === 200) {
            const { user } = response

            setUsers((users) => {
                return users.map((u) => {
                    if (user.id === u.id) {
                        return response.user
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

        var response: any = await deleteUser(user.id)

        if (response.status === 200) {
            const newUsers = users.filter((item) => item.id !== user.id)
            setUsers(newUsers)
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
        setUser({} as T_User)
        setCreateDialog(true)
    }

    const onHideDialogDelete = () => {
        setDeleteDialog(false)
        setLoadingButton(false)
        setUser({} as T_User)
        setStatusUnique({} as Status)

        reset()
    }

    const onHideDialogCreate = () => {
        setCreateDialog(false)
        setLoadingButton(false)
        setUser({} as T_User)
        setStatusUnique({} as Status)

        reset()
    }

    const onHideDialogUpdate = () => {
        setUpdateDialog(false)
        setLoadingButton(false)
        setUser({} as T_User)
        setStatusUnique({} as Status)

        reset()
    }

    const onFilters = _.debounce((item: string) => {
        var aux = [] as T_User[]

        auxUsers.map((user) => {
            var cpf = user?.name ? user?.name.toLowerCase().includes(item.toLowerCase()) : ""
            var dateCreate = user.created_at?.toString() || ""

            if (
                cpf ||
                user.name.toLowerCase().includes(item.toLowerCase()) ||
                user.email.toLowerCase().includes(item.toLowerCase()) ||
                convertDateToBrazilianStandard(dateCreate).includes(item)
            ) {
                aux.push(user)
            }
        })

        setUsers(aux)
    }, 300)

    const optionsOrdination: T_FilterOptions[] = [
        {
            name: "ID - Crescente",
            code: "id",
            type: "asc",
        },

        {
            name: "ID - Decrescente",
            code: "id",
            type: "desc",
        },

        {
            name: "Nome - Crescente",
            code: "name",
            type: "asc",
        },

        {
            name: "Nome - Decrescente",
            code: "name",
            type: "desc",
        },

        {
            name: "Data da Criação - Crescente",
            code: "date",
            type: "asc",
        },

        {
            name: "Data da Criação - Decrescente",
            code: "date",
            type: "desc",
        },
    ]

    const handleFiltersOrdination = _.debounce((item: T_FilterOptions) => {
        setSelectedOptionFilter(item)

        switch (item.code) {
            case "name":
                setUsers(sortByAlphabet(users, "name", item.type))
                setAuxUsers(sortByAlphabet(auxUsers, "name", item.type))
                break

            case "id":
                setUsers(sortByID(users, item.type))
                setAuxUsers(sortByID(auxUsers, item.type))
                break

            default:
                break
        }
    }, 300)

    const renderCardOrTable = () => {
        if (visualization === "card") {
            return (
                <S.Container>
                    {users.map((user, index) => (
                        <Card
                            key={index}
                            data={user}
                            type="users"
                            setDataUser={setUser}
                            processDeleteInformationUser={processDeleteInformation}
                            processUpdateInformationUser={processUpdateInformation}
                        />
                    ))}
                </S.Container>
            )
        }

        if (visualization === "table") {
            return (
                <Table
                    data={users}
                    type="users"
                    setDataUser={setUser}
                    processDeleteInformationUser={processDeleteInformation}
                    processUpdateInformationUser={processUpdateInformation}
                />
            )
        }
    }

    useEffect(() => {
        handleGetAll()
    }, [])

    useEffect(() => {
        setValue("name", user.name)
        setValue("email", user.email)
        setValue("status", user.status)

        if (user.status) {
            const updateStatus: Status = user.status ? { name: 'Ativo', va: true } : { name: 'Desativado', va: false }
            setStatusUnique(updateStatus)
        }

    }, [user])

    return (
        <>
            <G.TitlePages>Gerenciar Usuários</G.TitlePages>

            <Filters
                handleOpenModalFilter={processCreateInformation}
                handleFilter={onFilters}
                handleFiltersOrdination={handleFiltersOrdination}
                options={optionsOrdination}
                selectedOptionFilter={selectedOptionFilter}
                managerView={true}
            />

            {users.length > 0 ? (
                renderCardOrTable()
            ) : (
                <S.Container>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </S.Container>
            )}

            {/* Create */}
            <Dialog visible={createDialog} onHide={onHideDialogCreate} header="Criação de Usuário" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleSubmit(
                        (data) => {
                            // Log dos dados enviados ao formulário
                            console.log("Form Data:", data);
                            handleCreate(data); // Chama a função para processar o envio
                        },
                        (errors) => {
                            // Log dos erros de validação
                            console.error("Validation Errors:", errors);
                        }
                    )}>
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
                            {errors.email ? (
                                <small className="p-error">{errors.email.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.email }) + " label-input-login"} htmlFor="email">
                                    Email*
                                </label>
                            )}

                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email é obrigatorio.",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Email com formato invalido",
                                    },
                                }}
                                render={({ field }) => <S.InputTextLogin type="email" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.status ? (
                                <small className="p-error">{errors.status.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.status }) + " label-input-login"} htmlFor="status">
                                    Status*
                                </label>
                            )}

                            <Dropdown
                                {...register("status", {
                                    required: "O status é obrigatorio",
                                })}
                                style={{ width: "100%" }}
                                value={statusUnique}
                                options={status}
                                onChange={(e) => setStatusUnique(e.value)}
                                optionLabel="name"
                                id="status"
                                placeholder="Selecione um Status"
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.password ? (
                                <small className="p-error">{errors.password.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.password }) + " label-input-login"} htmlFor="name">
                                    Password*
                                </label>
                            )}

                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Password é obrigatorio." }}
                                render={({ field, fieldState }) => (
                                    <S.PasswordLogin
                                        className={classNames({ "p-invalid": fieldState.invalid })}
                                        id={field.name}
                                        {...field}
                                        autoComplete="current-password"
                                        feedback={false}
                                        toggleMask
                                    />
                                )}
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogCreate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar Usuário"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Update */}
            <Dialog visible={updateDialog} onHide={onHideDialogUpdate} header="Edição de usuário" draggable={false}>
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
                            {errors.email ? (
                                <small className="p-error">{errors.email.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.email }) + " label-input-login"} htmlFor="email">
                                    Email*
                                </label>
                            )}

                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email é obrigatorio.",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Email com formato invalido",
                                    },
                                }}
                                render={({ field }) => <S.InputTextLogin type="email" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.status ? (
                                <small className="p-error">{errors.status.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.status }) + " label-input-login"} htmlFor="status">
                                    Status*
                                </label>
                            )}

                            <Dropdown
                                {...register("status", {
                                    required: "O status é obrigatorio",
                                })}
                                style={{ width: "100%" }}
                                value={statusUnique}
                                options={status}
                                onChange={(e) => setStatusUnique(e.value)}
                                optionLabel="name"
                                id="status"
                                placeholder="Selecione um Status"
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogCreate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar Usuário"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Delete */}
            <Dialog visible={deleteDialog} onHide={onHideDialogDelete} header="Dados do Usuário" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleDelete}>
                        <div>
                            <S.ContainerData>
                                <S.Title>Nome: </S.Title>
                                <S.Description>{user.name}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Email: </S.Title>
                                <S.Description>{user.email}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Data de Criação: </S.Title>
                                <S.Description>{convertDateToBrazilianStandard(user?.created_at?.toLocaleString() || "")}</S.Description>
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

export default memo(Users)
