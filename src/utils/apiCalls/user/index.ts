/* eslint-disable no-console */
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { User } from '@/types/user'

import type { QueryFunctionContext } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import axios from 'axios'

type PaginatedUsers = {
    users: User[]
    nextPage?: number
}

// Dynamically choose the environment variable based on the execution context (server/client side)
const mainUserURL =
    (typeof window === 'undefined'
        ? environment.USER_BASE_URL
        : environment.NEXT_PUBLIC_USER_BASE_URL) + apiEndpoints.USERS

export const getUsers = async (
    queryFn: QueryFunctionContext,
): Promise<PaginatedUsers> => {
    console.log('🚀 getUsers Fn')
    console.log(queryFn)

    const response: AxiosResponse<User[]> = await axios.get(mainUserURL, {
        params: {
            skip: (queryFn.pageParam as number) * paginationLimit,
            limit: paginationLimit,
        },
    })

    if (response.status !== 200) throw new Error('Failed to fetch')

    return { users: response.data, nextPage: (queryFn.pageParam as number) + 1 }
}
