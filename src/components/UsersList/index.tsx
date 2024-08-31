/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

import { getUsers } from '@/utils/apiCalls/user'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const UsersList = (): React.JSX.Element => {
    console.log('🔥 UsersList')

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useSuspenseInfiniteQuery({
            queryKey: ['users'],
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            queryFn: ({ pageParam }) => getUsers(pageParam),

            initialPageParam: 1,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
        })

    console.log('%c isFetching', 'color: red', isFetching)
    console.log(data.pages)
    console.log({ isFetchingNextPage })

    return (
        <>
            <h2 className='text-emerald-300	'>{'Users list - client side'}</h2>
            <>{JSON.stringify(data.pages)}</>
        </>
    )
}
