
import { AppProps } from "next/app"

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "nprogress/nprogress.css"


import ProgressBar from "@/components/ProgressBar"
import Head from "next/head"

import { ThemeMenuProvider } from "@/contexts/ThemeMenuContext"
import { AuthContextProvider } from "@/contexts/AuthContext"
import { ToastProvider } from "@/contexts/ToastContext"
import { VisualizationProvider } from "@/contexts/VisualizationContext"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ThemeMenuProvider>
        <ToastProvider>
          <ProgressBar />
          <AuthContextProvider>
            <VisualizationProvider>
              <Component {...pageProps} />
            </VisualizationProvider>
          </AuthContextProvider>
        </ToastProvider>
      </ThemeMenuProvider>
    </>
  )
}