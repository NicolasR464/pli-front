import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Article } from '@/types/article'
import { environment } from '@/types/environment'

export const getArticles = async (): Promise<Article[]> => {
    const response = await fetch(
        environment.ARTICLE_BASE_URL + apiEndpoints.ARTICLES,
    )

    if (!response.ok) throw new Error('Failed to fetch')

    const articles = (await response.json()) as Article[]

    return articles
}
