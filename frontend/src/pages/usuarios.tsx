import { prisma } from "@/lib/prisma"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"


import Layout from "@/components/layouts/layout"
import Head from "next/head"
import Users from "@/components/Pages/Users"

export default function UsersPage() {
    return (
        <Layout>
            <Head>
                <title>Usuários | Projeto Kabum</title>
            </Head>

            <Users />
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
