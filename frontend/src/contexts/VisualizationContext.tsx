import React, { createContext, useState, useEffect } from "react"
import { T_T_VisualizationContext } from "@/types/Global/T_T_VisualizationContext"

export const VisualizationContext = createContext({} as T_T_VisualizationContext)

export const VisualizationProvider = ({ children }: any) => {
    const [visualization, setVisualization] = useState("table")

    useEffect(() => {
        window.innerWidth < 1600 ? setVisualization("card") : setVisualization("table")
    }, [])

    return <VisualizationContext.Provider value={{ setVisualization, visualization }}>{children}</VisualizationContext.Provider>
}
