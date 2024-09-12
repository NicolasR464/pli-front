import { userInstance } from '@/utils/axiosInstances'
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { User } from '@/types/user'

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

export const createUser = async (jwt: string): Promise<CreateUserResponse> => {
    console.log(environment.NEXT_PUBLIC_USER_BASE_URL + apiEndpoints.USERS)

    try {
        const response = await fetch(
            environment.NEXT_PUBLIC_USER_BASE_URL + apiEndpoints.USERS,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    pseudo: 'Front Man',
                    avatarUrl:
                        'https://api.multiavatar.com/a249bc6.png?apikey=JSUznFEgTLPa3x',
                }),
            },
        )

        if (!response.ok) {
            const errorResponse: CreateUserError = await response.json()
            return errorResponse
        }

        const successResponse: CreateUserSuccess = await response.json()
        return successResponse
    } catch (error) {
        return { error: 'Failed to connect to the server' }
    }
}
