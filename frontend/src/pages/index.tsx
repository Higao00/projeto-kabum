import Home from "@/components/Pages/Home"
import Layout from "@/components/layouts/layout"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Home | Projeto Kabum</title>
      </Head>

      <Home />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const apiClient = getAPIClient(ctx)

  const { ["app.kabum"]: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
