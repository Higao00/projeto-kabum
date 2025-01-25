export const formatNumberWithSixDecimals = (number: number | string | undefined) => {
    if (!number) return number

    return String(number).padStart(6, "0")
}
