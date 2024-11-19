import { environment } from '@/types/environment'

/**
 * API endpoints
 */
export const apiEndpoints = {
    // Micro services
    microServices: {
        // Public endpoints
        public: {
            USERS: 'api/users/',
            ARTICLES: 'api/articles/',
            TRANSACTIONS: 'api/transactions/',
            INSTANT_MESSAGES: 'api/messages/',
        },
        // Protected endpoints
        protected: {
            USERS: 'api/protected/users/',
            ARTICLES: 'api/protected/articles/',
            TRANSACTIONS: 'api/protected/transactions/',
            TRANSACTION_FINAL: 'api/protected/transactions/:id/complete',
            INSTANT_MESSAGES: 'api/protected/messages/',
        },
    },

    // Local API endpoints
    local: {
        IMAGE_ANALYSIS: 'image-analysis',
        PRODUCT_ANALYSIS: 'product-analysis',
        SEND_EMAIL: 'send-email',
    },

    // Third party APIs
    thirdParty: {
        API_GOUV: 'https://api-adresse.data.gouv.fr/search/',
        USER_AVATAR: 'https://api.multiavatar.com/',
        CLOUDINARY: `https://api.cloudinary.com/v1_1/${environment.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    },
}
