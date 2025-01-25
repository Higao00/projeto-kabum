export const sortByCreatedAt = (array: any, type?: string) => {
    if (type && type === "asc") {
        array.sort((a: any, b: any) => {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            return dateA.getTime() - dateB.getTime()
        })
    }

    if (type && type === "desc") {
        array.sort((a: any, b: any) => {
            var dateA = new Date(a.createdAt)
            var dateB = new Date(b.createdAt)
            return dateB.getTime() - dateA.getTime()
        })
    }

    return array
}

export const sortByAlphabet = (array: any, property: string, type?: string) => {
    if (type && type === "asc") {
        array.sort((a: any, b: any) => {
            const nameA = (a[property] as string).toUpperCase()
            const nameB = (b[property] as string).toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
    }

    if (type && type === "desc") {
        array.sort((a: any, b: any) => {
            const nameA = (a[property] as string).toUpperCase()
            const nameB = (b[property] as string).toUpperCase()
            if (nameA < nameB) {
                return 1
            }
            if (nameA > nameB) {
                return -1
            }
            return 0
        })
    }

    return array
}

export const sortByID = (array: any, type?: string) => {
    if (type && type === "asc") {
        array.sort((a: any, b: any) => a.id - b.id)
    }

    if (type && type === "desc") {
        array.sort((a: any, b: any) => b.id - a.id)
    }

    return array
}

export const sortByWaitTime = (array: any) => {
    array.sort((a: any, b: any) => a.wait_time - b.wait_time)
    return array
}

export const sortByStatusActive = (array: any) => {
    var newArray = array.filter((a: any) => a.status)
    return newArray
}

export const sortByStatusInactive = (array: any) => {
    var newArray = array.filter((a: any) => !a.status)
    return newArray
}

export const sortByCompletionDateCall = (array: any, type?: string) => {
    if (type && type === "asc") {
        array.sort((a: any, b: any) => {
            var dateA = new Date(a.finishedAt)
            var dateB = new Date(b.finishedAt)
            return dateA.getTime() - dateB.getTime()
        })
    }

    if (type && type === "desc") {
        array.sort((a: any, b: any) => {
            var dateA = new Date(a.finishedAt)
            var dateB = new Date(b.finishedAt)
            return dateB.getTime() - dateA.getTime()
        })
    }

    return array
}
