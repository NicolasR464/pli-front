export const wait = async (mlseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('⏰ Waiting: ', mlseconds)

            resolve()
        }, mlseconds)
    })
}
