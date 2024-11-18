import { articleInstance } from '@/utils/axiosInstances/article'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { Article } from '@/types/article'

import { getUserById } from '../user'
import type { AxiosResponse } from 'axios'

type PaginatedArticlesResponse = {
    articles: Article[]
    hasNext: boolean
    nextCursor?: number
}

export const getAllArticles = async (
    page: number,
    limit = 30,
    category?: string,
    status?: string,
): Promise<PaginatedArticlesResponse> => {
    const skip = page * limit

    // Construction des paramètres de requête
    const params: {
        skip: number
        limit: number
        category?: string
        status?: string
    } = {
        skip,
        limit,
    }
    if (category) {
        params.category = category
    }

    if (status) {
        params.status = status
    }

    // Exécution de la requête
    const response: AxiosResponse<PaginatedArticlesResponse> =
        await articleInstance.get(apiEndpoints.microServices.public.ARTICLES, {
            params,
        })

    if (response.status !== 200) {
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.public.ARTICLES}`,
        )
    }

    const { articles = [], hasNext } = response.data

    // Retourne une réponse par défaut si la catégorie ne contient aucun article
    return {
        articles,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        hasNext: hasNext ?? false,
        nextCursor:
            Array.isArray(articles) && articles.length === limit
                ? page + 1
                : undefined,
    }
}

/**
 * Fetch all articles from the API.
 * @returns {Promise<Article[]>} An array of articles.
 */
export type ArticlesResponse = {
    articles: Article[]
    hasNext: boolean
    limit: number
    skip: number
}

export const getArticles = async (): Promise<Article[]> => {
    const response: AxiosResponse<Article[]> = await articleInstance.get(
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

/**
 * Fetch a specific article by its ID.
 * @param {string} id - The ID of the article to fetch.
 * @returns {Promise<Article>} The article with the given ID.
 * @throws {Error} If the request fails or the article cannot be found.
 */
export const getArticleById = async (id: string): Promise<Article> => {
    const response: AxiosResponse<Article> = await articleInstance.get(
        `${apiEndpoints.microServices.public.ARTICLES}${id}`,
    )
    if (response.status !== 200)
        throw new Error(`Failed to fetch article with id ${String(id)}`)
    return response.data
}

/**
 * Fetch all articles belonging to a specific user.
 * @param {string} userId - The ID of the user whose articles are to be fetched.
 * @returns {Promise<Article[]>} An array of articles belonging to the user.
 * @throws {Error} If the user cannot be found or their articles cannot be retrieved.
 */
export const getArticlesByUser = async (userId: string): Promise<Article[]> => {
    const user = await getUserById(userId)
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
            apiEndpoints.microServices.protected.ARTICLES,
            article,
        )

    if (response.status !== 201)
        throw new Error(
            `Failed to create ${apiEndpoints.microServices.protected.ARTICLES}`,
        )

    return response.data
}
