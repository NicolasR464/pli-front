import { getUserById } from '@/utils/apiCalls/user'

import type { User } from '@/types/user'

import { useQuery } from '@tanstack/react-query'

type UseUserByIdResult = {
    data: User | undefined
    isLoading: boolean
    isError: boolean
    error: unknown
}
// Get info from the user
const useUserById = (userId: string | undefined): UseUserByIdResult => {
    const { data, isLoading, isError, error } = useQuery<User | undefined>({
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
