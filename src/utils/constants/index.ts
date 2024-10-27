import { NotificationType } from '@/types'

import { notify } from '../functions'

/** The limit of documents we want to get per fetch for the infinite scrolls */
export const paginationLimit = 20

/** The list of React Query keys  */
export const rqKeys = {
    USERS: 'users',
}

/** Object containing page paths used throughout the application, set in alphabetical order */
export const pagePaths = {
    /** Path to the sign-in/ sign-up page */
    AUTH: {
        SIGN_IN: 'auth/sign-in/',
        SIGN_UP: 'auth/sign-up/',
    },
    /** Home page path */
    HOME: '/',
    /** Path to the onboarding page */
    ONBOARDING: '/onboarding/',
}

/** Object containing notifications to the user for various cases, set in alphabetical order */
export const userMessages = {
    imageAnalysis: {
        ERROR: 'Erreur lors de l’analyse de l’image.',
    },
    articleAnalysis: {
        ERROR: 'Erreur lors de l’analyse de l’article. Réessaye plus tard.',
    },
    articleCreation: {
        ERROR: 'Erreur lors de la création de l’article. Réessaye plus tard.',
        SUCCESS: 'L’article a été créé avec succès.',
    },
    onboarding: {
        ERROR: 'Erreur de sauvegarde de tes informations. Réessaye plus tard.',
        SUCCESS: 'Tes informations ont été sauvegardées',
    },
    notLoggedIn: {
        ERROR: 'Tu n’es pas connecté. Connecte-toi pour continuer.',
    },
}

/**
 * Function to get the search params and notify the user
 * @param {Record<string, string | string[] | undefined>} searchParams - Object containing URL search parameters
 */
export const getParamsAndNotify = (
    searchParams: Record<string, string | string[] | undefined>,
): void => {
    const matchingMessageKey = Object.keys(searchParams).find((param) =>
        Object.keys(userMessages).includes(param),
    )

    if (
        matchingMessageKey &&
        searchParams[matchingMessageKey] &&
        typeof searchParams[matchingMessageKey] === 'string' &&
        searchParams[matchingMessageKey].toUpperCase() in
            userMessages[matchingMessageKey as keyof typeof userMessages]
    ) {
        const messageType = searchParams[matchingMessageKey].toUpperCase()

        if (messageType) {
            notify({
                message:
                    userMessages[
                        matchingMessageKey as keyof typeof userMessages
                    ][
                        messageType as keyof (typeof userMessages)[keyof typeof userMessages]
                    ],
                type:
                    messageType === NotificationType.enum.SUCCESS
                        ? NotificationType.enum.SUCCESS
                        : NotificationType.enum.ERROR,
            })
        }
    }
}
