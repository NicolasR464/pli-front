/** The limit of documents we want to get per fetch for the infinite scrolls */
export const paginationLimit = 20

/** The list of React Query keys  */
export const rqKeys = {
    ARTICLES: 'allArticles',
    ARTICLE: 'article',
    TRANSACTION: 'transaction',
    USERS: 'users',
    USER: 'user',
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
    /** Path to Articles page */
    ARTICLES: '/articles/',
    /** Path to Article creation page */
    ARTICLE_CREATION: '/article/new/',
    /** Path to messages page */
    MESSAGES: '/messagerie/',
    /** Path to transactions page */
    TRANSACTION: '/transaction/',
    /** Path for profil page */
    MYPROFILE: '/myProfile',
    /** Path for users */
    USERS: '/users/',
}

/**
 * Object containing notification messages to use in pair with the Notification component for the user for various cases; set in alphabetical order.
 * - must have a label that will be the name of the URL search key
 * - must have a type of SUCCESS, ERROR or INFO (will change the color of the toaster) that will be the value of the URL search param
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
            ERROR: 'Tu n’es pas connecté.e, connecte-toi pour continuer.',
        },
    },
    requestSent: {
        label: 'request-sent',
        type: {
            SUCCESS: 'Demande envoyée !',
            ERROR: 'Une erreur est survenue lors de l’envoi de la demande.',
        },
    },
    transactionDuplicate: {
        label: 'transaction-duplicate',
        type: {
            ERROR: 'Cette transaction existe déjà',
        },
    },
}
