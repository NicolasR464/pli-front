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

/**
 * Object containing notification message in a toaster for the user for various cases, set in alphabetical order
 * - must have a label that will be the name of the URL query key
 * - must have a type of SUCCESS, ERROR or INFO (will change the color of the toaster)
 */
export const userMessages = {
    articleAnalysis: {
        label: 'article-analysis',
        type: {
            ERROR: 'Erreur lors de l’analyse de l’article. Réessaye plus tard.',
        },
    },
    articleCreation: {
        label: 'article-creation',
        type: {
            ERROR: 'Erreur lors de la création de l’article. Réessaye plus tard.',
            SUCCESS: 'L’article a été créé avec succès.',
        },
    },
    imageAnalysis: {
        label: 'image-analysis',

        type: {
            ERROR: 'Erreur lors de l’analyse de l’image.',
        },
    },
    onboarding: {
        label: 'onboarding',
        type: {
            ERROR: 'Erreur de sauvegarde de tes informations. Réessaye plus tard.',
            SUCCESS: 'Tes informations ont été sauvegardées',
        },
    },
    notLoggedIn: {
        label: 'not-logged-in',
        type: {
            ERROR: 'Tu n’es pas connecté. Connecte-toi pour continuer.',
        },
    },
}
