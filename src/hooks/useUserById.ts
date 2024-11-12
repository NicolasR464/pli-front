import { useQuery } from '@tanstack/react-query'
import { getUserById } from '@/utils/apiCalls/user'

const useUserById = (userId: string | undefined) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => {
            if (!userId) {
                throw new Error('userId is required')
            }
            return getUserById(userId)
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

export default useUserById
