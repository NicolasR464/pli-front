import { articleInstance } from '@/utils/axiosInstances/article'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Article } from '@/types/article'

import type { AxiosResponse } from 'axios'

export const getArticles = async (): Promise<Article[]> => {
    const response: AxiosResponse<Article[]> = await articleInstance.get(
        apiEndpoints.ARTICLES,
    )

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.ARTICLES}`)

    return response.data
}
export const getArticlesById = async (id:string): Promise<Article[]> => {
    const response: AxiosResponse<Article[]> = await articleInstance.get(
        `{apiEndpoints.ARTICLES}/${id}`,
    )

    if (response.status !== 200)
        throw new Error(`Failed to fetch article with id ${id}`)

    return response.data
}

