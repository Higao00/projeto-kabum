import React, { useEffect, useContext, useState } from "react"
import {
    BsGear,
    BsUpload,
    BsXLg,
    BsCheck2,
} from "react-icons/bs"
import { T_DefaultValueHookForm } from "@/types/Groups/T_DefaultValueHookForm"
import { AuthContext } from "@/contexts/AuthContext"
import { InputText } from "primereact/inputtext"
import { T_User } from "@/types/Users/T_User"
import { useForm } from "react-hook-form"
import { ToastContext } from "@/contexts/ToastContext"

import { ptBR } from "date-fns/locale/pt-BR"
import { format } from "date-fns/format"

import updateUser from "@/services/User/update"

import * as G from "../../../styles/theme/global.styles"
import * as S from "./styles"
import Image from "next/image"

interface T_AuxUser extends T_User {
    createdAtFormated: string
    updateAtFormated: string
}

const UserProfile = () => {
    const { showToast } = useContext(ToastContext)
    const { user } = useContext(AuthContext)

    const [stateEditProfile, setStateEditProfile] = useState(false)
    const [avatarImageMouseOver, setAvatarImageMouseOver] = useState(false)

    // Loading button
    const [loadingButton, setLoadingButton] = useState(false)

    let [auxUser, setAuxUser] = useState<T_AuxUser>({} as T_AuxUser)

    const defaultValues = {
        name: "",
        email: "",
        cpf: "",
    }

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        register,
    } = useForm({ defaultValues })


    const handleUpdateProfileUser = async (data: T_DefaultValueHookForm) => {
        setLoadingButton(true)
        const finalUser = {
            id: user?.id,
            status: user?.status,
            name: data.name,
            email: data.email,
            avatar_url: auxUser.avatar_url,
            cpf: data.cpf,
        }

        var response: any = await updateUser(finalUser, user?.id)
        if (response.status === 201) {
            const { user } = response

            setAuxUser(user)

            dateNormalize(user)
        } else {
            showToast("error", response.title, response.message, 3000)
        }

        setLoadingButton(false)
        setStateEditProfile(!stateEditProfile)
    }

    const dateNormalize = (thisUser: T_User) => {
        if (thisUser) {
            let createdAtAux
            let updatedAtAux

            auxUser = {
                ...thisUser,
                createdAtFormated: "",
                updateAtFormated: "",
            }

            if (auxUser.createdAt !== undefined && auxUser.updateAt !== undefined) {
                const createdAtDate = new Date(auxUser.createdAt)
                const updateAtDate = new Date(auxUser.updateAt)

                createdAtAux = format(createdAtDate, "dd/MM/yyyy", { locale: ptBR })
                updatedAtAux = format(updateAtDate, "dd/MM/yyyy", { locale: ptBR })
            }

            auxUser.createdAtFormated = createdAtAux!
            auxUser.updateAtFormated = updatedAtAux!

            setAuxUser(auxUser)
        }
    }

    const setValuesHookForm = () => {
        setValue("name", auxUser.name)
        setValue("cpf", auxUser.cpf!)
        setValue("email", auxUser.email)
    }

    const resetValuesHookForm = () => {
        auxUser.name = user!.name
        auxUser.cpf = user?.cpf
        auxUser.email = user!.email

        setAuxUser(auxUser)

        setValue("name", user!.name)
        setValue("cpf", user?.cpf ? user?.cpf : "")
        setValue("email", user!.email)
        reset()
    }

    useEffect(() => {
        dateNormalize(user!)
    }, [user])

    return (
        <>
            <div>
                <G.TitlePages>GERENCIAR PERFIL</G.TitlePages>

                <S.CardUserProfile>
                    <form onSubmit={handleSubmit(handleUpdateProfileUser)}>
                        <S.ContentCard>
                            <S.ContainerTopCardUserProfile>
                                {stateEditProfile && (
                                    <S.ButtonCardUserProfileTopCancel
                                        severity="danger"
                                        rounded
                                        type="button"
                                        onClick={() => {
                                            setStateEditProfile(!stateEditProfile)
                                            resetValuesHookForm()
                                        }}
                                    >
                                        <S.IconButtonTopProfile>
                                            <BsXLg color="#DC2626" />
                                        </S.IconButtonTopProfile>
                                        <span>Cancelar edição</span>
                                    </S.ButtonCardUserProfileTopCancel>
                                )}

                                {!stateEditProfile ? (
                                    <S.ButtonCardUserProfileTop
                                        severity="info"
                                        type="button"
                                        rounded
                                        onClick={() => {
                                            setStateEditProfile(!stateEditProfile)
                                            setValuesHookForm()
                                        }}
                                    >
                                        <S.IconButtonTopProfile>
                                            <BsGear color="#2563EB" />
                                        </S.IconButtonTopProfile>
                                        <span>Editar informações</span>
                                    </S.ButtonCardUserProfileTop>
                                ) : (
                                    <S.ButtonCardUserProfileTopSubmit
                                        severity="success"
                                        type="submit"
                                        loading={loadingButton}
                                        rounded
                                    >
                                        {!loadingButton && (
                                            <S.IconButtonTopProfile>
                                                <BsCheck2 color="#22C55E" />
                                            </S.IconButtonTopProfile>
                                        )}
                                        <span>Salvar edição</span>
                                    </S.ButtonCardUserProfileTopSubmit>
                                )}
                            </S.ContainerTopCardUserProfile>

                            <S.BodyCardProfile>
                                <S.AvatarUserProfile>
                                    <S.CuttingAvatar>
                                        <S.ContainerIcons>
                                            <S.IconBsFillPersonFill />
                                        </S.ContainerIcons>

                                    </S.CuttingAvatar>
                                </S.AvatarUserProfile>

                                <S.ContentLabelsBody>
                                    <S.ContentLabelsBodyLeft>
                                        <S.LabelInputText>
                                            <S.ErrorMessageCreateGroup className="p-error">
                                                {errors.name && errors.name.message}
                                            </S.ErrorMessageCreateGroup>
                                            <p>Nome</p>
                                            <InputText
                                                {...register("name", {
                                                    required: "O nome é obrigatorio",
                                                })}
                                                disabled={!stateEditProfile}
                                                type="text"
                                                className="p-inputtext-sm"
                                                value={auxUser?.name || ""}
                                                onChange={(e) => {
                                                    setAuxUser((prevState) => ({
                                                        ...auxUser,
                                                        ["name"]: e.target.value,
                                                    }))
                                                }}
                                                placeholder={auxUser?.name}
                                                style={{ width: "100%" }}
                                            />
                                        </S.LabelInputText>

                                        <S.LabelInputText>
                                            <S.ErrorMessageCreateGroup className="p-error">
                                                {errors.cpf && errors.cpf.message}
                                            </S.ErrorMessageCreateGroup>
                                            <p>CPF</p>
                                            <InputText
                                                {...register("cpf", {
                                                    required: "O CPF é obrigatorio",
                                                })}
                                                disabled={!stateEditProfile}
                                                type="text"
                                                className="p-inputtext-sm"
                                                value={
                                                    auxUser?.cpf !== null &&
                                                        auxUser?.cpf !== undefined
                                                        ? auxUser.cpf
                                                        : ""
                                                }
                                                placeholder={
                                                    auxUser?.cpf !== null &&
                                                        auxUser?.cpf !== undefined
                                                        ? auxUser.cpf
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    setAuxUser((prevState) => ({
                                                        ...auxUser,
                                                        ["cpf"]: e.target.value,
                                                    }))
                                                }}
                                                style={{ width: "100%" }}
                                            />
                                        </S.LabelInputText>

                                        <S.LabelInputText>
                                            <p>Telefone</p>
                                            <InputText
                                                disabled={!stateEditProfile}
                                                type="text"
                                                className="p-inputtext-sm"
                                                style={{ width: "100%" }}
                                            />
                                        </S.LabelInputText>
                                    </S.ContentLabelsBodyLeft>

                                    <S.ContentLabelsBodyRight>
                                        <S.LabelInputText>
                                            <S.ErrorMessageCreateGroup className="p-error">
                                                {errors.email && errors.email.message}
                                            </S.ErrorMessageCreateGroup>
                                            <p>Email</p>
                                            <InputText
                                                disabled={true}
                                                type="text"
                                                className="p-inputtext-sm"
                                                placeholder={auxUser?.email}
                                                value={auxUser?.email || ""}
                                                style={{ width: "100%" }}
                                            />
                                        </S.LabelInputText>

                                        <S.LabelInputTextGrid>
                                            <div>
                                                <p>Data de criação</p>
                                                <S.ChipExtended label={auxUser.createdAtFormated} />
                                            </div>

                                            <div>
                                                <p>Data de atualização</p>
                                                <S.ChipExtended label={auxUser.updateAtFormated} />
                                            </div>
                                        </S.LabelInputTextGrid>
                                        <S.LabelInputTextGrid>
                                            <div>
                                                <p>Status</p>
                                                <S.TagExtended
                                                    severity="success"
                                                    value="Ativo"
                                                    rounded
                                                ></S.TagExtended>
                                            </div>
                                        </S.LabelInputTextGrid>
                                    </S.ContentLabelsBodyRight>
                                </S.ContentLabelsBody>
                            </S.BodyCardProfile>
                        </S.ContentCard>
                    </form>
                </S.CardUserProfile>

                {/* <S.CardUserProfileExtended /> */}
            </div>
        </>
    )
}

export default UserProfile
