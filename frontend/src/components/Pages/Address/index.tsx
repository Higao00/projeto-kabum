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

import { Skeleton } from "@/components/Skeleton"

import { convertDateToBrazilianStandard } from "@/lib/formatDateBR"
import { ToastContext } from "@/contexts/ToastContext"
import { VisualizationContext } from "@/contexts/VisualizationContext"
import Table from "@/components/Table"
import getAllAddress from "@/services/Address/getAll"
import createAddress from "@/services/Address/create"
import { T_Address } from "@/types/Address/T_Address"
import updateAddress from "@/services/Address/update"
import deleteAddress from "@/services/Address/delete"
import { T_Client } from "@/types/Client/T_Client"
import getAllClient from "@/services/Client/getAll"
import { Dropdown } from "primereact/dropdown"
import axios from "axios"

const Address = () => {
    const { showToast } = useContext(ToastContext)
    const { visualization } = useContext(VisualizationContext)

    // States to user
    const [address, setAddress] = useState({} as T_Address)
    const [addresses, setAddresses] = useState([] as T_Address[])
    const [auxAddresses, setAuxAddresses] = useState([] as T_Address[])

    const [clients, setClients] = useState([] as T_Client[])
    const [client, setClient] = useState({} as T_Client)

    const defaultValues: T_Address = {
        client_id: null,
        postal_code: '',
        street: '',
        neighborhood: '',
        locality: '',
        city: '',
        state: ''
    }

    // Loading button
    const [loadingButton, setLoadingButton] = useState(false)

    // Open close Dialog
    const [updateDialog, setUpdateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [createDialog, setCreateDialog] = useState(false)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset,
        register,
        watch
    } = useForm({ defaultValues })


    const handleGetAll = async () => {
        const response: any = await getAllAddress()

        if (response.status === 200) {
            setAddresses(response.address)
            setAuxAddresses(response.address)
        } else {
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleGetAllClients = async () => {
        const response: any = await getAllClient()

        if (response.status === 200) {
            setClients(response.clients)
        } else {
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleCreate = async (data: T_Address) => {
        setLoadingButton(true)

        interface AddressCreate {
            client_id: number,
            postal_code: string,
            street: string,
            neighborhood: string,
            locality: string,
            city: string,
            state: string
        }

        const address: AddressCreate = {
            client_id: client.id ? client.id : 0,
            postal_code: data.postal_code,
            street: data.street,
            neighborhood: data.neighborhood,
            locality: data.locality,
            city: data.city,
            state: data.state
        }

        var response: any = await createAddress(address)

        if (response.status === 201) {
            const finalAddress: T_Address = response.address

            setAddresses((address) => [...address, finalAddress])
            onHideDialogCreate()
        } else {
            setLoadingButton(false)
            showToast("error", response.title, response.message, 3000)
        }
    }

    const handleUpdate = async (data: T_Address) => {
        setLoadingButton(true)

        const finaAddress = {
            postal_code: data.postal_code,
            street: data.street,
            neighborhood: data.neighborhood,
            locality: data.locality,
            city: data.city,
            state: data.state
        }

        var response: any = await updateAddress(finaAddress, address.id)

        if (response.status === 200) {
            const { address } = response

            setAddresses((addresses) => {
                return addresses.map((u) => {
                    if (address.id === u.id) {
                        return response.address
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

        var response: any = await deleteAddress(address.id)

        if (response.status === 200) {
            const newAddresses = addresses.filter((item) => item.id !== address.id)
            setAddresses(newAddresses)
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
        setAddress({} as T_Address)
        setCreateDialog(true)
    }

    const onHideDialogDelete = () => {
        setDeleteDialog(false)
        setLoadingButton(false)
        setAddress({} as T_Address)
        setClient({} as T_Client)

        reset()
    }

    const onHideDialogCreate = () => {
        setCreateDialog(false)
        setLoadingButton(false)
        setAddress({} as T_Address)
        setClient({} as T_Client)

        reset()
    }

    const onHideDialogUpdate = () => {
        setUpdateDialog(false)
        setLoadingButton(false)
        setAddress({} as T_Address)
        setClient({} as T_Client)

        reset()
    }

    const onFilters = _.debounce((item: string) => {
        var aux = [] as T_Address[]

        auxAddresses.map((address) => {
            var city = address?.city ? address?.city.toLowerCase().includes(item.toLowerCase()) : ""
            var dateCreate = address.created_at?.toString() || ""

            if (
                city ||
                address.locality.toLowerCase().includes(item.toLowerCase()) ||
                address.state.toLowerCase().includes(item.toLowerCase()) ||
                address.postal_code.toLowerCase().includes(item.toLowerCase()) ||
                address.neighborhood.toLowerCase().includes(item.toLowerCase()) ||
                address.street.toLowerCase().includes(item.toLowerCase()) ||
                convertDateToBrazilianStandard(dateCreate).includes(item)
            ) {
                aux.push(address)
            }
        })

        setAddresses(aux)
    }, 300)

    const renderCardOrTable = () => {
        if (visualization === "card") {
            return (
                <S.Container>
                    {addresses.map((address, index) => (
                        <Card
                            key={index}
                            data={address}
                            type="address"
                            buttons={true}
                            setDataAddress={setAddress}
                            processDeleteInformationAddress={processDeleteInformation}
                            processUpdateInformationAddress={processUpdateInformation}
                        />
                    ))}
                </S.Container>
            )
        }

        if (visualization === "table") {
            return (
                <Table
                    data={addresses}
                    type="address"
                    buttons={true}
                    setDataAddress={setAddress}
                    processDeleteInformationAddress={processDeleteInformation}
                    processUpdateInformationAddress={processUpdateInformation}
                />
            )
        }
    }

    const handleCepBlur = async () => {
        let cep = watch("postal_code");

        // Remove todos os caracteres que não são números
        cep = cep.replace(/\D/g, "");

        // Verifica se o CEP tem 8 caracteres numéricos
        if (cep && /^[0-9]{8}$/.test(cep)) {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

                if (data.erro) {
                    showToast("error", "CEP não encontrado.", "Digite um novo CEP", 3000);
                    setValue("postal_code", '');
                    setValue("city", '');
                    setValue("locality", '');
                    setValue("neighborhood", '');
                    setValue("state", '');
                    setValue("street", '');
                } else {
                    setValue("city", data.localidade);
                    setValue("locality", data.bairro);
                    setValue("neighborhood", data.bairro);
                    setValue("state", data.uf);
                    setValue("street", data.logradouro);
                }
            } catch (error) {
                showToast("error", "Erro ao buscar o CEP", "Tente novamente", 3000);
            }
        }
    };

    useEffect(() => {
        handleGetAll()
        handleGetAllClients()
    }, [])

    useEffect(() => {
        setValue("city", address.city)
        setValue("client_id", address.client_id)
        setValue("locality", address.locality)
        setValue("neighborhood", address.neighborhood)
        setValue("postal_code", address.postal_code)
        setValue("state", address.state)
        setValue("street", address.street)

        clients.forEach(client => {
            if (client.id === address.client_id) {
                setClient(client)
            }
        });
    }, [address])

    return (
        <>
            <G.TitlePages>Gerenciar Endereços</G.TitlePages>

            <Filters
                handleOpenModalFilter={processCreateInformation}
                handleFilter={onFilters}
                managerView={true}
            />

            {addresses?.length > 0 ? (
                renderCardOrTable()
            ) : (
                <S.Container>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </S.Container>
            )}

            {/* Create */}
            <Dialog visible={createDialog} onHide={onHideDialogCreate} header="Criação de Endereço" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleSubmit(handleCreate)}>
                        <div className="flex flex-column gap-2">
                            {errors.client_id ? (
                                <small className="p-error">{errors.client_id.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.client_id }) + " label-input-login"} htmlFor="client_id">
                                    Cliente*
                                </label>
                            )}

                            <Dropdown
                                {...register("client_id", {
                                    required: "O Cliente é obrigatorio",
                                })}
                                style={{ width: "100%" }}
                                value={client}
                                options={clients}
                                onChange={(e) => setClient(e.value)}
                                optionLabel="name"
                                id="status"
                                placeholder="Selecione um Cliente"
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.postal_code ? (
                                <small className="p-error">{errors.postal_code.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.postal_code }) + " label-input-login"} htmlFor="postal_code">
                                    CEP*
                                </label>
                            )}

                            <Controller
                                name="postal_code"
                                control={control}
                                rules={{
                                    required: "CEP é obrigatorio.",
                                    pattern: {
                                        value: /^[0-9]{5}-[0-9]{3}$/,
                                        message: "CEP inválido. Use o formato 00000-000.",
                                    },
                                }}
                                render={({ field }) =>
                                    <S.InputTextMask
                                        type="text"
                                        mask="99999-999"
                                        id={field.name}
                                        {...field}
                                        onBlur={() => {
                                            field.onBlur();
                                            handleCepBlur();
                                        }}
                                    />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.city ? (
                                <small className="p-error">{errors.city.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.city }) + " label-input-login"} htmlFor="city">
                                    Cidade*
                                </label>
                            )}

                            <Controller
                                name="city"
                                control={control}
                                rules={{
                                    required: "Cidade é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.locality ? (
                                <small className="p-error">{errors.locality.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.locality }) + " label-input-login"} htmlFor="locality">
                                    Bairro*
                                </label>
                            )}

                            <Controller
                                name="locality"
                                control={control}
                                rules={{
                                    required: "Bairro é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.neighborhood ? (
                                <small className="p-error">{errors.neighborhood.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.neighborhood }) + " label-input-login"} htmlFor="neighborhood">
                                    vizinhança*
                                </label>
                            )}

                            <Controller
                                name="neighborhood"
                                control={control}
                                rules={{
                                    required: "Vizinhança é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.state ? (
                                <small className="p-error">{errors.state.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.state }) + " label-input-login"} htmlFor="state">
                                    Estado*
                                </label>
                            )}

                            <Controller
                                name="state"
                                control={control}
                                rules={{
                                    required: "Estado é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.street ? (
                                <small className="p-error">{errors.street.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.street }) + " label-input-login"} htmlFor="street">
                                    Rua*
                                </label>
                            )}

                            <Controller
                                name="street"
                                control={control}
                                rules={{
                                    required: "Rua é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogCreate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar Endereço"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Update */}
            <Dialog visible={updateDialog} onHide={onHideDialogUpdate} header="Edição de Endereço" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleSubmit(handleUpdate)}>

                        <div className="flex flex-column gap-2">
                            <label className={"label-input-login"} htmlFor="client">
                                Cliente
                            </label>

                            <S.InputTextLogin disabled={true} type="text" value={client.name} />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.postal_code ? (
                                <small className="p-error">{errors.postal_code.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.postal_code }) + " label-input-login"} htmlFor="postal_code">
                                    CEP*
                                </label>
                            )}

                            <Controller
                                name="postal_code"
                                control={control}
                                rules={{
                                    required: "CEP é obrigatorio.",
                                    pattern: {
                                        value: /^[0-9]{5}-[0-9]{3}$/,
                                        message: "CEP inválido. Use o formato 00000-000.",
                                    },
                                }}
                                render={({ field }) =>
                                    <S.InputTextMask
                                        type="text"
                                        mask="99999-999"
                                        id={field.name}
                                        {...field}
                                        onBlur={() => {
                                            field.onBlur();
                                            handleCepBlur();
                                        }}
                                    />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.city ? (
                                <small className="p-error">{errors.city.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.city }) + " label-input-login"} htmlFor="city">
                                    Cidade*
                                </label>
                            )}

                            <Controller
                                name="city"
                                control={control}
                                rules={{
                                    required: "Cidade é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.locality ? (
                                <small className="p-error">{errors.locality.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.locality }) + " label-input-login"} htmlFor="locality">
                                    Bairro*
                                </label>
                            )}

                            <Controller
                                name="locality"
                                control={control}
                                rules={{
                                    required: "Bairro é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.neighborhood ? (
                                <small className="p-error">{errors.neighborhood.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.neighborhood }) + " label-input-login"} htmlFor="neighborhood">
                                    vizinhança*
                                </label>
                            )}

                            <Controller
                                name="neighborhood"
                                control={control}
                                rules={{
                                    required: "Vizinhança é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.state ? (
                                <small className="p-error">{errors.state.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.state }) + " label-input-login"} htmlFor="state">
                                    Estado*
                                </label>
                            )}

                            <Controller
                                name="state"
                                control={control}
                                rules={{
                                    required: "Estado é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <div className="flex flex-column gap-2">
                            {errors.street ? (
                                <small className="p-error">{errors.street.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.street }) + " label-input-login"} htmlFor="street">
                                    Rua*
                                </label>
                            )}

                            <Controller
                                name="street"
                                control={control}
                                rules={{
                                    required: "Rua é obrigatorio.",
                                }}
                                render={({ field }) => <S.InputTextLogin type="text" id={field.name} {...field} />}
                            />
                        </div>

                        <br />

                        <S.ContainerButtons>
                            <Button type="button" label="Cancelar" severity="danger" onClick={onHideDialogUpdate} icon={<BsXLg />} />
                            <Button
                                type="submit"
                                disabled={loadingButton}
                                label="Salvar endereços"
                                severity="success"
                                icon={loadingButton ? <Loader width="20" height="20" /> : <BsCheck2 />}
                            />
                        </S.ContainerButtons>
                    </form>
                </S.ContainerDialog>
            </Dialog>

            {/* Delete */}
            <Dialog visible={deleteDialog} onHide={onHideDialogDelete} header="Dados do Endereço" draggable={false}>
                <S.ContainerDialog>
                    <form onSubmit={handleDelete}>
                        <div>
                            <S.ContainerData>
                                <S.Title>Cliente: </S.Title>
                                <S.Description>{client.name}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Rua: </S.Title>
                                <S.Description>{address.street}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Cidade: </S.Title>
                                <S.Description>{address.city}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Estado: </S.Title>
                                <S.Description>{address.state}</S.Description>
                            </S.ContainerData>

                            <S.ContainerData>
                                <S.Title>Data de Criação: </S.Title>
                                <S.Description>{convertDateToBrazilianStandard(address?.created_at?.toLocaleString() || "")}</S.Description>
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

export default memo(Address)
