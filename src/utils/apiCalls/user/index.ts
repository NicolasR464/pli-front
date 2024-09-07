import { userInstance } from '@/utils/axiosInstances'
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { User } from '@/types/user'
import type { AxiosResponse } from 'axios'

type PaginatedUsers = {
    users: User[]
    nextCursor?: number
}

export const getUsers = async (pageParam: number): Promise<PaginatedUsers> => {
    try {
        const response: AxiosResponse<{ users: User[]; nextCursor: number }> =
            await userInstance.get(apiEndpoints.USERS, {
                params: {
                    skip: pageParam,
                    limit: paginationLimit,
                },
            })

        // Make sure there are users in the response
        if (!response.data.users) {
            throw new Error('No users found')
        }

        return {
            users: response.data.users,
            nextCursor: response.data.nextCursor,
        }
    } catch (error) {
        console.error('Error fetching users:', error)
        // Re-throw the error to be caught by an Error Boundary or external handler
        throw error
    }
}
