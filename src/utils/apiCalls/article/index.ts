import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Article } from '@/types/article'

export const getArticles = async (): Promise<Article[]> => {
    const response = await fetch(
        process.env.ARTICLE_BASE_URL + apiEndpoints.ARTICLES,
    )

    const articles = (await response.json()) as Article[]

    return articles
}
