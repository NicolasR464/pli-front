/* eslint-disable no-console */
'use client'

import { getUsers } from '@/utils/apiCalls/user'

import type { User } from '@/types/user'

import { useQuery } from '@tanstack/react-query'

export const UsersList = (): JSX.Element => {
    console.log('🔥 UsersList')

    const { data: users, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    console.log('%c isLoading', 'color: red', isLoading)

    console.log(users)

    return (
        <>
            <div>{'Users client'}</div>
            <div>{JSON.stringify(users)}</div>
        </>
    )
}
