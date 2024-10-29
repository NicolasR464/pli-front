import { environment } from '@/types/environment'

export const apiEndpoints = {
    // Micro services
    USERS_PRIVATE: 'api/users/',
    USERS: 'users/',
    ARTICLES_PRIVATE: 'api/articles/',
    ARTICLES: 'articles/',
    TRANSACTIONS: 'api/transaction/',
    /** @TODO Update the endpoint below  */
    INSTANT_MESSAGES: 'api/messages/',

    // Local API endpoints
    IMAGE_ANALYSIS: 'image-analysis/',
    PRODUCT_ANALYSIS: 'product-analysis/',

    // Third party APIs
    API_GOUV: 'https://api-adresse.data.gouv.fr/search/',
    USER_AVATAR: 'https://api.multiavatar.com/',
    CLOUDINARY: `https://api.cloudinary.com/v1_1/${environment.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
}
