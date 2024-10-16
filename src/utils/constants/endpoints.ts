export const apiEndpoints = {
    // Micro services
    USERS: 'api/users/',

    // J'ai dû modifier api/articles pour /articles car on tombe dans le middleware sinon : 
    ARTICLES: 'articles/',
    TRANSACTIONS: 'api/transaction/',
    /** @TODO Update the endpoint below  */
    INSTANT_MESSAGES: 'instantmsgs/',

    // Third party APIs
    API_GOUV: 'https://api-adresse.data.gouv.fr/search/',
    USER_AVATAR: 'https://api.multiavatar.com/',
}
