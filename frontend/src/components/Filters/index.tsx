import React, { memo, useContext, useEffect, useState } from "react"
import { T_Filters } from "@/types/Global/T_Filters"
import { Dropdown } from "primereact/dropdown"
import * as S from "./styles"
import { VisualizationContext } from "@/contexts/VisualizationContext"
import { BsPostcardFill, BsSortDown, BsSortUpAlt, BsTable } from "react-icons/bs"
import Loader from "../Loader"
import { AuthContext } from "@/contexts/AuthContext"
import { T_FilterOptions } from "@/types/Global/T_FilterOptions"

const Filters = ({
    handleOpenModalFilter,
    handleFilter,
    handleFiltersOrdination,
    handleFiltersStatus,
    handleSync,
    loadingButton,
    options,
    selectedOptionFilter,
    status,
    selectedStatusFilter,
    customerView,
    managerView,
    technicianView,
}: T_Filters) => {
    const { setVisualization, visualization } = useContext(VisualizationContext)
    const { user } = useContext(AuthContext)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return (
        <>
            <div>
                <S.Card>
                    <S.Filters>
                        <S.ContainerFilters>
                            <span id="advancedSearchFilter" className="p-input-icon-left">
                                <S.BsSearchExtended />
                                <S.InputTextExtended
                                    placeholder="Pesquisar"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (handleFilter) handleFilter(e.target.value)
                                    }}
                                />
                            </span>

                            {options && (
                                <div className="card flex justify-content-center">
                                    <Dropdown
                                        options={options}
                                        value={selectedOptionFilter}
                                        itemTemplate={(item: T_FilterOptions) => {
                                            if (item.type === "asc") {
                                                return (
                                                    <S.IconOrderBy>
                                                        <BsSortUpAlt fontSize={"1.2rem"} />
                                                        <span>{item.name}</span>
                                                    </S.IconOrderBy>
                                                )
                                            }

                                            if (item.type === "desc") {
                                                return (
                                                    <S.IconOrderBy>
                                                        <BsSortDown fontSize={"1.2rem"} />
                                                        <span>{item.name}</span>
                                                    </S.IconOrderBy>
                                                )
                                            }

                                            return <span>{item.name}</span>
                                        }}
                                        valueTemplate={(item: T_FilterOptions, props) => {
                                            if (item) {
                                                if (item.type === "asc") {
                                                    return (
                                                        <S.IconOrderBy>
                                                            <BsSortUpAlt fontSize={"1.2rem"} />
                                                            <span>{item.name}</span>
                                                        </S.IconOrderBy>
                                                    )
                                                }

                                                if (item.type === "desc") {
                                                    return (
                                                        <S.IconOrderBy>
                                                            <BsSortDown fontSize={"1.2rem"} />
                                                            <span>{item.name}</span>
                                                        </S.IconOrderBy>
                                                    )
                                                }

                                                return <span>{item.name}</span>
                                            }

                                            return <span>{props.placeholder}</span>
                                        }}
                                        onChange={(e) => {
                                            if (handleFiltersOrdination) handleFiltersOrdination(e.value)
                                        }}
                                        optionLabel="name"
                                        placeholder="Ordenação"
                                    />
                                </div>
                            )}

                            {status && (
                                <div className="card flex justify-content-center">
                                    <Dropdown
                                        options={status}
                                        value={selectedStatusFilter}
                                        onChange={(e: any) => {
                                            if (handleFiltersStatus) handleFiltersStatus(e.value)
                                        }}
                                        placeholder="Status"
                                    />
                                </div>
                            )}
                        </S.ContainerFilters>

                        <S.ContentButtonsTop>
                            {width > 1280 && (
                                <S.ButtonExtended
                                    className="class-table-card-button"
                                    rounded
                                    severity="info"
                                    onClick={() => setVisualization(visualization === "card" ? "table" : "card")}
                                >
                                    {visualization === "card" ? <BsTable fontSize={"1.5rem"} /> : <BsPostcardFill fontSize={"1.5rem"} />}
                                </S.ButtonExtended>
                            )}
                        </S.ContentButtonsTop>
                    </S.Filters>
                </S.Card>
            </div>
        </>
    )
}

export default memo(Filters)
