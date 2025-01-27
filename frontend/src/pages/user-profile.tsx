import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import UserProfile from "@/components/Pages/UserProfile"
import Layout from "@/components/layouts/layout"
import Head from "next/head"

export default function UserProfilePage() {
    return (
        <Layout>
            <Head>
                <title>Perfil do usuário | Portal Esquadros</title>
            </Head>

            <UserProfile />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const apiClient = getAPIClient(ctx)

    const { ["app.kabum"]: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
