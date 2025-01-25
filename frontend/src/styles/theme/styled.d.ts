import "styled-components"
import { themeDark } from "./themeColors"

declare module "styled-components" {
    export interface DefaultTheme {
        titleTheme: string
        value: boolean
        background_global: string

        color: {
            primary: string
            secondary: string
            ternary: string
            
            table: string
        }

        background: {
            primary: string
            secondary: string
            ternary: string

            first: string
            second: string
            
            table: string
        }

        fonts: {
            bold: string
            light: string
            medium: string
            regular: string
        }
    }
}
