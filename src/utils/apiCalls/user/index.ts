import { userInstance } from '@/utils/axiosInstances/user'
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { User } from '@/types/user'

import type { AxiosResponse } from 'axios'

type CreateUserSuccess = {
    message: string
}
type CreateUserError = {
    error: string
}

export type CreateUserResponse = CreateUserSuccess | CreateUserError

type PaginatedUsers = {
    users: User[]
    nextCursor?: number
}

/**
 * Retrieves a paginated list of users.
 * @param {number} pageParam  The page number for pagination
 * @param {string} JWT The JWT token for authentication.
 * @returns {Promise<PaginatedUsers>} A promise that resolves to the paginated users
 */
export const getUsers = async (
    pageParam: number,
    JWT: string,
): Promise<PaginatedUsers> => {
    if (!JWT) {
        throw new Error('No JWT token provided')
    }
    // Add the authorization header
    addAuthHeader(userInstance, JWT)
    // API call to get users with pagination
    const response: AxiosResponse<{ users: User[]; nextCursor?: number }> =
        await userInstance.get(apiEndpoints.microServices.admin.USERS, {
            params: {
                skip: pageParam,
                limit: paginationLimit,
            },
        })
    if (response.status !== 200) {
        throw new Error('Failed to fetch users')
    }
    // Return users with optional nextCursor
    return {
        users: response.data.users,
        nextCursor: response.data.nextCursor,
    }
}
/**
 * Creates a new user.
 * @param {User} data The user data to create.
 * @param {string} JWT The JWT token for authentication.
 * @returns {Promise<CreateUserResponse>} A promise that resolves to the create user response.
 */
export const createUser = async (
    data: Partial<User>,
    JWT: string,
): Promise<CreateUserResponse> => {
    if (!JWT) throw new Error('No JWT provided')

    addAuthHeader(userInstance, JWT)

    const response: AxiosResponse<CreateUserResponse> = await userInstance.post(
        apiEndpoints.microServices.private.USERS,
        data,
    )

    if (response.status !== 201)
        throw new Error('User data could not be created')

    return {
        message: 'User created successfully',
    }
}

/**
 * Get user by Id.
 * @param {string} userId the id of the user to retreive.
 * @returns {Promise<User>|undefined} A promise that resolves with user information.
 */
export const getUserById = async (
    userId: string | undefined,
): Promise<User | undefined> => {
    const response: AxiosResponse<User> = await userInstance.get(
        `${apiEndpoints.microServices.public.USERS}${userId}`,
    )
    if (response.status !== 200)
        throw new Error(`Failed to fetch user with id ${String(userId)}`)
    return response.data
}

export const getUserInfo = async (
    userId: string,
    token: string,
): Promise<User> => {
    const headers = { Authorization: `Bearer ${token}` }
    const url = `${apiEndpoints.microServices.public.USERS}${userId}`
    const response: AxiosResponse<User> = await userInstance.get(url, {
        headers,
    })

    if (response.status !== 200) {
        throw new Error(`Failed to fetch user with id ${String(userId)}`)
    }

    return response.data
}
