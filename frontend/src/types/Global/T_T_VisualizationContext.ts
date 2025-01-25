import { SetStateAction } from "react"
import { Dispatch } from "react"

export interface T_T_VisualizationContext {
    visualization: string
    setVisualization: Dispatch<SetStateAction<string>>
}
