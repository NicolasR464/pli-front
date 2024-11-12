// hooks/useArticlesByUser.ts
import { useQuery } from '@tanstack/react-query'
import { getArticlesByUser } from '@/utils/apiCalls/article'

const useArticlesByUser = (userId: string | undefined) => {
    // Appel de useQuery pour récupérer les articles d'un utilisateur
    const { data, isLoading, isError, error } = useQuery({
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
