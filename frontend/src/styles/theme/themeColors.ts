const sourceData = {
    bold: "bold",
    light: "light",
    medium: "medium",
    regular: "regular",
}

export const themeDark = {
    titleTheme: "dark",
    value: true,
    background_global: "#1e1e1e",

    color: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.6)",
        ternary: "#000",

        table: "#fff",
    },

    background: {
        primary: "#1e1e1e",
        secondary: "#515C66",
        ternary: "#6E6E6E",

        first: "#003a6a",
        second: "#097bbb",

        table: "#1e1e1e",
    },

    fonts: sourceData,
}

export const themeLight = {
    titleTheme: "light",
    value: false,
    background_global: "#FFF",

    color: {
        primary: "#e9ecef",
        secondary: "#495057",
        ternary: "#000",

        table: "#495057",
    },

    background: {
        primary: "#515C66",
        secondary: "#1e1e1e",
        ternary: "#6E6E6E",

        first: "#003a6a",
        second: "#097bbb",

        table: "#fff",
    },

    fonts: sourceData,
}
