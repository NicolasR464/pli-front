/* eslint-disable no-console */
import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { User } from '@/types/user'

import type { QueryFunctionContext } from '@tanstack/react-query'

type PaginatedUsers = {
    users: User[]
    nextPage?: number
}

export const getUsers = async ({
    pageParam,
}: QueryFunctionContext<string[], number>): Promise<PaginatedUsers> => {
    console.log('🚀 getUsers')

    const response = await fetch(
        `${environment.USER_BASE_URL + apiEndpoints.USERS}?page=${pageParam}`,
    )

    if (!response.ok) throw new Error('Failed to fetch')

    const users = (await response.json()) as User[]

    return { users, nextPage: pageParam + 1 }
}
