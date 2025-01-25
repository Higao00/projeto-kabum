export function convertDateToBrazilianStandard(dataISO8601: string | Date | undefined, leaveHours?: boolean) {
    if (dataISO8601) {
        // Creating a Date object with the date and time in ISO 8601 format
        var data = new Date(dataISO8601)

        // Getting the components of the Brazilian date
        var day = data.getDate().toString().padStart(2, "0")
        var month = (data.getMonth() + 1).toString().padStart(2, "0")
        var year = data.getFullYear()

        // Getting the components of the Brazilian time
        var hours = data.getHours().toString().padStart(2, "0")
        var minutes = data.getMinutes().toString().padStart(2, "0")
        var seconds = data.getSeconds().toString().padStart(2, "0")

        // Converting to the Brazilian format (dd/mm/yyyy hh:mm:ss)

        if (leaveHours) {
            return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
        }

        return day + "/" + month + "/" + year + " "
    }

    return "-"
}
