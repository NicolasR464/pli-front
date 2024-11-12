import { getArticlesByUser } from '@/utils/apiCalls/article'

import type { Article } from '@/types/article'

import { useQuery } from '@tanstack/react-query'

type UseArticlesByUserResult = {
    data: Article[] | undefined
    isLoading: boolean
    isError: boolean
    error: unknown
}

const useArticlesByUser = (
    userId: string | undefined,
): UseArticlesByUserResult => {
    // Appel de useQuery pour récupérer les articles d'un utilisateur
    const { data, isLoading, isError, error } = useQuery<Article[]>({
        queryKey: ['articles', userId],
        queryFn: () => {
            if (!userId) {
                throw new Error('userId is required')
            }
            return getArticlesByUser(userId)
        },
        enabled: !!userId,
    })

    return {
        data,
        isLoading,
        isError,
        error,
    }
}

export default useArticlesByUser
