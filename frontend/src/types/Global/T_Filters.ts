import { T_FilterOptions } from "@/types/Global/T_FilterOptions"

export interface T_Filters {
    handleOpenModalFilter?: () => void
    handleFilter?: (item: string) => void
    handleFiltersOrdination?: (item: T_FilterOptions) => void
    handleFiltersStatus?: (item: string) => void
    options?: T_FilterOptions[]
    selectedOptionFilter?: T_FilterOptions
    status?: string[]
    selectedStatusFilter?: string

    handleSync?: () => void
    loadingButton?: boolean

    customerView?: boolean
    technicianView?: boolean
    managerView?: boolean
}
