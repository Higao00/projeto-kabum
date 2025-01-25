export function formatDateCalender(data: Date | null): Date | null {
    if (data === null) return null

    return new Date(formatDate(data))
}

function formatDate(data: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZoneName: "short",
    }

    return data?.toLocaleString("en-US", options)
}
