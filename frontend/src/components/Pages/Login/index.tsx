import { useContext, useEffect, useState } from "react"
import Router, { useRouter } from "next/router"
import Image from "next/image"

import * as S from "./styles"

import axios from "axios"
import Loader from "@/components/Loader"
import { AuthContext } from "@/contexts/AuthContext"

import { useForm, Controller } from "react-hook-form"
import { classNames } from "primereact/utils"

import { ToastContext } from "@/contexts/ToastContext"
import { T_UserLogin } from "@/types/Users/T_UserLogin"


const Login = () => {
    const { showToast } = useContext(ToastContext)
    const { signIn } = useContext(AuthContext)

    const { query } = useRouter()

    const currentDate = new Date()
    const [userIp, setUserIp] = useState("")

    const [loading, setLoading] = useState(false)

    const defaultValues = {
        email: "",
        password: "",
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues })

    const getIpClient = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json")
            setUserIp(response.data.ip)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignIn = async (data: T_UserLogin) => {
        setLoading(true)
        const response = await signIn(data)

        console.log(response.data.error)

        if (response.status === 201) {
            query.redirect ? Router.push(`${query.redirect}`) : Router.push("/")
        } else {
            setLoading(false)
            showToast("error", "Erro no Login", response.data.error, 3000)
        }
    }

    useEffect(() => {
        getIpClient()
    }, [userIp])

    return (
        <S.Container>
            <S.ContainerLogin>
                <S.ContainerLoginFirst>
                    <S.TitleInfoFieldService>
                        BEM VINDO AO <br /> PROJETO KABUM
                    </S.TitleInfoFieldService>

                    <S.TextInfo>
                        ® Higor Henrique {currentDate.getFullYear()} <br /> Todos os direitos Reservados
                    </S.TextInfo>

                    <S.TextInfo>
                        Por questões de segurança, registramos seu endereço de IP <br />
                        {userIp}
                    </S.TextInfo>
                </S.ContainerLoginFirst>

                <S.ContainerLoginSecond>
                    <S.ContainerLogo>
                        <Image src={"https://static.kabum.com.br/conteudo/icons/logo.svg"} width={300} height={70} alt="Logotipo Kabum" />
                    </S.ContainerLogo>

                    <S.ContainerForm onSubmit={handleSubmit(handleSignIn)}>
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

                        <div className="flex flex-column gap-2">
                            {errors.password ? (
                                <small className="p-error">{errors.password.message}</small>
                            ) : (
                                <label className={classNames({ "p-error": errors.password }) + " label-input-login"} htmlFor="password">
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
                                        feedback={false}
                                        toggleMask
                                    />
                                )}
                            />
                        </div>

                        <S.ContainerLinkForgotLogin>
                            <S.ButtonLogin type="submit" label="ENTRAR" severity="success" rounded disabled={loading}>
                                {loading && <Loader width="30" height="30" />}
                            </S.ButtonLogin>
                        </S.ContainerLinkForgotLogin>
                    </S.ContainerForm>
                </S.ContainerLoginSecond>
            </S.ContainerLogin>
        </S.Container>
    )
}

export default Login
