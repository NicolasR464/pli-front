export const wait = async (mlseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, mlseconds)
    })
}
