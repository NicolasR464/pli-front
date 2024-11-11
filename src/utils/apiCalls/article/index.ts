import { articleInstance } from '@/utils/axiosInstances/article'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'
import { addAuthHeader } from '@/utils/functions'

import type { Article } from '@/types/article'

import { getUserById } from '../user'
import type { AxiosResponse } from 'axios'

/**
 * Fetch all articles from the API.
 * @returns {Promise<Article[]>} An array of articles.
 */
/**
 * Fetch all articles from the API.
 * @returns {Promise<Article[]>} An array of articles.
 */
export const getArticles = async (): Promise<Article[]> => {
    const response: AxiosResponse<Article[]> = await articleInstance.get(
        apiEndpoints.microServices.public.ARTICLES,
        apiEndpoints.microServices.public.ARTICLES,
    )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.public.ARTICLES}`,
        )
    throw new Error(
        `Failed to fetch ${apiEndpoints.microServices.public.ARTICLES}`,
    )

    return response.data
}

export const getArticleById = async (id: string): Promise<Article> => {
    const response: AxiosResponse<Article> = await articleInstance.get(
        `${apiEndpoints.microServices.public.ARTICLES}${id}`,
        `${apiEndpoints.microServices.public.ARTICLES}${id}`,
    )
    if (response.status !== 200)
        throw new Error(`Failed to fetch article with id ${String(id)}`)
    return response.data
}

// Fonction pour récupérer les articles d'un utilisateur
export const getArticlesByUser = async (
    userId: string,
    token: string,
): Promise<Article[]> => {
    const user = await getUserById(userId, token)
    if (user?.articles) {
        return Promise.all(
            user.articles.map((articleId) => getArticleById(articleId)),
        )
    }
    return []
}
/**
 * Create a new article.
 * @param {Partial<Article>} article - The article to create.
 * @param {string} JWT - The JWT token for authentication.
 * @returns {Promise<Partial<Article>>} The created article.
 */
export const createArticle = async (
    article: Partial<Article>,
    JWT: string,
): Promise<Partial<Article>> => {
    if (!JWT) throw new Error('No JWT provided')

    addAuthHeader(articleInstance, JWT)

    const response: AxiosResponse<Partial<Article>> =
        await articleInstance.post(
            apiEndpoints.microServices.private.ARTICLES,
            article,
        )

    if (response.status !== 201)
        throw new Error(
            `Failed to create ${apiEndpoints.microServices.private.ARTICLES}`,
        )

    return response.data
}
