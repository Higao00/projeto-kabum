export const firstAndLastName = (name: string | undefined) => {
    if (!name) return ""

    const arrayNames = name.split(" ")

    if (arrayNames[0] === arrayNames[arrayNames.length - 1]) return arrayNames[0]

    return `${arrayNames[0]} ${arrayNames[arrayNames.length - 1]}`
}
