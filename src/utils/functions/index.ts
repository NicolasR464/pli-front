import { Context } from '@/types'

export const wait = async (mlseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, mlseconds)
    })
}

/** To know which execution context we are on, server or client side */
export const whichSide = (): Context =>
    typeof window === 'undefined' ? Context.enum.SERVER : Context.enum.CLIENT
