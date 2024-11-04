import { environment } from '@/types/environment'

export const apiEndpoints = {
    // Micro services
    USERS_PRIVATE: 'api/protected/users/',
    USERS: 'api/public/users/',
    ARTICLES_PRIVATE: 'api/protected/articles/',
    ARTICLES: 'api/public/articles/',
    TRANSACTIONS: 'api/public/transaction/',
    TRANSACTIONS_PRIVATE: 'api/protected/transaction/',
    INSTANT_MESSAGES: 'instantmsgs/',

    // Local API endpoints
    IMAGE_ANALYSIS: 'image-analysis/',
    PRODUCT_ANALYSIS: 'product-analysis/',

    // Third party APIs
    API_GOUV: 'https://api-adresse.data.gouv.fr/search/',
    USER_AVATAR: 'https://api.multiavatar.com/',
    CLOUDINARY: `https://api.cloudinary.com/v1_1/${environment.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
}
