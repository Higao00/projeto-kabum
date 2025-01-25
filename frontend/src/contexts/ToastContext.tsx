import React, { createContext, useState, useRef } from "react"
import { Toast } from "primereact/toast"
import { T_ToastContext } from "@/types/Global/T_ToastContext"

export const ToastContext = createContext({} as T_ToastContext)

export const ToastProvider = ({ children }: any) => {
    const toastRef = useRef<Toast | null>(null)

    const showToast = (
        severity: "success" | "info" | "warn" | "error" | undefined,
        summary: string,
        detail: string,
        life: number
    ) => {
        toastRef.current?.show({ severity, summary, detail, life })
    }

    const hideToast = () => {
        toastRef.current?.clear()
    }

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast ref={toastRef} position="top-right" />
        </ToastContext.Provider>
    )
}
