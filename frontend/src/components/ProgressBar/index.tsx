import { useEffect } from "react"
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const ProgressBar = () => {
    useEffect(() => {
        const start = () => {
            NProgress.start()
        }

        const stop = () => {
            NProgress.done()
        }

        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", stop)
        Router.events.on("routeChangeError", stop)

        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", stop)
            Router.events.off("routeChangeError", stop)
        }
    }, [])

    return null
}

export default ProgressBar
