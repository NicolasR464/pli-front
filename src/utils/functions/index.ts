import { Context } from '@/types'
import { environment } from '@/types/environment'

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

/**
 * Generates a random avatar URL using the MultiAvatar API.
 *
 * This function creates a random number between 0 and 99, then uses it to generate
 * a unique avatar URL. The URL includes the API key stored in the environment variables.
 * @returns {string} A URL string pointing to a randomly generated avatar image.
 * @example
 * const avatarUrl = getRandomAvatarUrl();
 * // Returns something like: "https://api.multiavatar.com/42.png?apikey=YOUR_API_KEY"
 *
 * @see https://api.multiavatar.com/ for more information about the MultiAvatar API.
 */
export const getRandomAvatarUrl = (): string => {
    const randomNumber = Math.floor(Math.random() * 100)

    return `https://api.multiavatar.com/${randomNumber}.png?apikey=${environment.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`
}
