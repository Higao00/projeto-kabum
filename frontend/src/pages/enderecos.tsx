import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

import Layout from "@/components/layouts/layout"
import Head from "next/head"
import Address from "@/components/Pages/Address"

export default function AddressPage() {
    return (
        <Layout>
            <Head>
                <title>Endereços | Projeto Kabum</title>
            </Head>

            <Address />
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
