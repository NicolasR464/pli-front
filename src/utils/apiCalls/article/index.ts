import { articleInstance } from '@/utils/axiosInstances/article'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { Article } from '@/types/article'

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
): Promise<PaginatedArticlesResponse> => {
    const skip = page * limit

    // Construction des paramètres de requête
    const params: { skip: number; limit: number; category?: string } = {
        skip,
        limit,
    }
    if (category) {
        params.category = category
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

    return response.data
}

export const getArticleById = async (id: string): Promise<Article> => {
    const response: AxiosResponse<Article> = await articleInstance.get(
        `${apiEndpoints.microServices.public.ARTICLES}${id}`,
    )
    if (response.status !== 200)
        throw new Error(`Failed to fetch article with id ${String(id)}`)
    return response.data
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
