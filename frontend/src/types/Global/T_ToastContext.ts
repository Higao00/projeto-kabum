export interface T_ToastContext {
    showToast: (
        severity: "success" | "info" | "warn" | "error" | undefined,
        summary: string,
        detail: string,
        life: number
    ) => void
    hideToast: () => void
}
