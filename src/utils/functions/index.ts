import toast from 'react-hot-toast'

import type { ISO8601DateTime } from '@/types'
import { NotificationType } from '@/types'
import { environment } from '@/types/environment'

import { userMessages } from '../constants'
import type { AxiosInstance } from 'axios'
import {
    adjectives,
    animals,
    colors,
    uniqueNamesGenerator,
} from 'unique-names-generator'

export const wait = async (mlseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, mlseconds)
    })
}

/**
 * Generates a random avatar URL using the MultiAvatar API.
 *
 * This function creates a random number between 0 and 99, then uses it to generate
 * a unique avatar URL. The URL includes the API key stored in the environment variables.
 * @returns {string} A URL string pointing to a randomly generated avatar image.
 * @example
 * const avatarUrl = getRandomAvatarUrl();
 * // Returns something like: "https://api.multiavatar.com/42.png?apikey=YOUR_API_KEY"
 * @see https://api.multiavatar.com/ for more information about the MultiAvatar API.
 */
export const getRandomAvatarUrl = (): string => {
    const randomNumber = Math.floor(Math.random() * 100)

    return `https://api.multiavatar.com/${randomNumber}.png?apikey=${environment.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`
}

/**
 * Generates a random user pseudonym using the unique-names-generator library.
 *
 * This function combines adjectives, animals, and colors to create a unique and humorous name.
 * @returns {string} A randomly generated user pseudonym.
 * @example
 * const pseudonym = getRandomUserPseudonym();
 * Returns something like: "Fierce-Tiger-Lime"
 * @see https://github.com/DylanVann/unique-names-generator for more information about the unique-names-generator library.
 */
export const getRandomUserPseudonym = (): string => {
    const randomPseudo = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        separator: ' ',
        length: 3,
        style: 'capital',
    })

    return randomPseudo
}
/**
 * Adds an Authorization header with a JWT token to the specified axios instance.
 *
 * This function sets the Authorization header of the provided axios instance
 * to include the given JWT token. This is typically used to authenticate
 * API requests.
 * @param {AxiosInstance} axiosInstance - The axios instance to which the Authorization header will be added.
 * @param {string} JWT - The JSON Web Token to be included in the Authorization header.
 * @returns {void}
 * @example
 * const jwtToken = 'your.jwt.token';
 * addAuthHeader(axiosInstance, jwtToken);
 * // Now all subsequent requests using the provided axiosInstance will include the Authorization header
 */
export const addAuthHeader = (
    axiosInstance: AxiosInstance,
    JWT: string,
): void => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${JWT}`
}

/**
 * Displays a toast notification with the specified message and type.
 *
 * This function uses the `react-hot-toast` library to display a toast notification.
 * @param {object} options - An object containing the message and type of the notification.
 * @param {string} options.message - The message to be displayed in the toast notification.
 * @param {NotificationType} options.type - The type of the notification (success, error, etc.).
 * @returns {void}
 */
const notify = ({
    message,
    type = NotificationType.enum.INFO,
}: {
    message: string
    type?: NotificationType
}): void => {
    switch (type) {
        case NotificationType.enum.SUCCESS: {
            toast.success(message)
            break
        }
        case NotificationType.enum.ERROR: {
            toast.error(message)
            break
        }
        default: {
            toast(message)
            break
        }
    }
}

/**
 * Formats a given date string into a more readable format.
 *
 * This function takes a date string, converts it into a Date object,
 * and then formats it according to specified options. The resulting
 * date is returned as a string in the format "day month year" (e.g., "26 octobre 2024").
 * @param {string} date - The input date string to format. It should be a valid date format
 * compatible with the JavaScript Date object.
 * @returns {string} A formatted date string in "day month year" format.
 * @example
 * const formattedDate = formatDate('2024-10-26T12:00:00Z');
 * Returns: "26 octobre 2024"
 */
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('fr-FR', options)
}

type UserMessageKeys = keyof typeof userMessages

/**
 * Function to get the user message key from the label
 * @param {string} label - The label of the user message
 * @returns {UserMessageKeys | undefined} The user message key
 */
const getUserMessageKeyFromLabel = (
    label: string,
): UserMessageKeys | undefined => {
    return Object.entries(userMessages).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value.label === label,
    )?.[0] as UserMessageKeys | undefined
}

/**
 * Function to get the search params and notify the user with a toaster
 * @param {Array<{key: string, value: string | undefined}>} paramsArray - Array containing key-value pairs of URL search parameters
 */
export const getParamsAndNotify = (
    paramsArray: {
        key: string
        value: string | undefined
    }[],
): void => {
    for (const param of paramsArray) {
        const matchingMessageKey = getUserMessageKeyFromLabel(param.key)

        if (matchingMessageKey) {
            notify({
                message:
                    userMessages[matchingMessageKey].type[
                        param.value?.toUpperCase() as keyof (typeof userMessages)[typeof matchingMessageKey]['type']
                    ],
                type: param.value?.toUpperCase() as keyof (typeof userMessages)[typeof matchingMessageKey]['type'],
            })
        }
    }
}

/**
 * Returns the current date.
 * @returns {ISO8601DateTime} The current date.
 */
export const getPresentDate = (): ISO8601DateTime => {
    return new Date().toISOString() as ISO8601DateTime
}
