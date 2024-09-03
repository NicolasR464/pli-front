'use server'
/* eslint-disable no-console */
import { paginationLimit } from '@/utils/constants'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { whichSide } from '@/utils/functions'

import { Context } from '@/types'
import { environment } from '@/types/environment'
import type { User } from '@/types/user'

import type { QueryFunctionContext } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import axios from 'axios'

type PaginatedUsers = {
    users: User[]
    nextCursor?: number
}

// Dynamically choose the environment variable based on the execution context (server/client side)
const mainUserURL = environment.USER_BASE_URL + apiEndpoints.USERS

export const getUsers = async (pageParam: number): Promise<PaginatedUsers> => {
    console.log('🚀 getUsers Fn')
    console.log({ pageParam })

    // console.log({ queryFn })

    // const pageParam: number =
    //     whichSide() === Context.enum.SERVER
    //         ? queryFn.pageParam
    //         : (queryFn as unknown as number)

    // const page: number =
    //     typeof queryFn.pageParam === 'number' ? queryFn.pageParam : 0

    const response: AxiosResponse<User[]> = await axios.get(mainUserURL, {
        params: {
            skip: pageParam * paginationLimit,
            limit: paginationLimit,
        },
    })

    if (response.status !== 200) throw new Error('Failed to fetch')

    return { users: response.data, nextCursor: pageParam + 1 }
}
