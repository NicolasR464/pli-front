import { userInstance } from '@/utils/axiosInstances'
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { User } from '@/types/user'

import { addAuthHeader } from '..'
import type { AxiosResponse } from 'axios'

type CreateUserSuccess = {
    message: string
}
type CreateUserError = {
    error: string
}

type CreateUserResponse = CreateUserSuccess | CreateUserError

type PaginatedUsers = {
    users: User[]
    nextCursor?: number
}

/**
 * Retrieves a paginated list of users.
 * @param {number} pageParam  The page number for pagination
 * @returns {Promise<PaginatedUsers>} A promise that resolves to the paginated users
 */
export const getUsers = async (pageParam: number): Promise<PaginatedUsers> => {
    const response: AxiosResponse<{ users: User[]; nextCursor: number }> =
        await userInstance.get(apiEndpoints.USERS, {
            params: {
                skip: pageParam,
                limit: paginationLimit,
            },
        })

    if (response.status !== 200) throw new Error('No users found')

    return {
        users: response.data.users,
        nextCursor: response.data.nextCursor,
    }
}

/**
 * Creates a new user.
 * @param {string} jwt The JWT token for authentication.
 * @returns {Promise<CreateUserResponse>} A promise that resolves to the create user response.
 */
export const createUser = async (jwt: string): Promise<CreateUserResponse> => {
    addAuthHeader(userInstance, jwt)

    const response: AxiosResponse<{ users: User[]; nextCursor: number }> =
        await userInstance.post(apiEndpoints.USERS, {
            pseudo: 'Front Man',
            avatarUrl: `${apiEndpoints.USER_AVATAR}a249bc6.png?apikey=${environment.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`,
        })

    if (response.status !== 201)
        throw new Error('User data could not be created')

    return {
        message: 'User created successfully',
    }
}
