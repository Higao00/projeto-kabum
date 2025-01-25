import Login from "@/components/Pages/Login"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"

export default function LoginPage() {
    return (
        <>
            <Head>
                <title>Login | Projeto Kabum</title>
            </Head>

            <Login />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ["app.kabum"]: token } = parseCookies(ctx)

    if (token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
