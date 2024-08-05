import { apiEndpoints } from '@/utils/constants/endpoints'

/** @TODO Change Type */
import type { User } from '@/types/user'

export const getArticles = async (): Promise<User[]> => {
    const response = await fetch(
        process.env.USER_BASE_URL + apiEndpoints.ARTICLES,
    )

    const articles = (await response.json()) as User[]

    return articles
}
