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
                                {/* <S.BsSearchExtended /> */}
                                <S.InputTextExtended
                                    placeholder="Pesquisar"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (handleFilter) handleFilter(e.target.value)
                                    }}
                                />
                            </span>

                        </S.ContainerFilters>

                        <S.ContentButtonsTop>
                            <S.ButtonExtended className="p-button-success" label="Adicionar" rounded onClick={handleOpenModalFilter}>
                                <S.BsPlusLgExtended />
                            </S.ButtonExtended>

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
