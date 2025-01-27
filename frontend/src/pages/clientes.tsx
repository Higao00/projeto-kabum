import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"


import Layout from "@/components/layouts/layout"
import Head from "next/head"
import Clients from "@/components/Pages/Clients"

export default function ClientsPage() {
    return (
        <Layout>
            <Head>
                <title>Clientes | Projeto Kabum</title>
            </Head>

            <Clients />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ["app.kabum"]: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: `/login?redirect=${ctx.resolvedUrl}`,
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
