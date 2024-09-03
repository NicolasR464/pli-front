/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

import { getUsers } from '@/utils/apiCalls/user'

import { Button } from '../shadcn/shadcnUI/button'
import {
    useInfiniteQuery,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

export const UsersList = (): React.JSX.Element => {
    console.log('🔥 UsersList')

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        // useSuspenseInfiniteQuery({
        useInfiniteQuery({
            queryKey: ['users'],
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            queryFn: ({ pageParam }) => getUsers(pageParam),

            initialPageParam: 0,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        })

    const handleFetchMore = (): void => {
        console.log('CLICK MORE ✅')

        if (hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage()
    }

    useEffect(() => {
        const handleScroll = (): void => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 2 &&
                !isFetchingNextPage
            ) {
                console.log('📜 SCROLLING')

                fetchNextPage()
            }
        }

        window.addEventListener('scroll', handleScroll)

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    console.log('%c isFetching', 'color: red', isFetching)
    // console.log(data.pages)
    console.log({ isFetchingNextPage })
    console.log({ hasNextPage })

    return (
        <>
            <h2 className='text-emerald-300'>
                {
                    'Users list - client side - This demonstrate React Query with infinite scrolling'
                }
            </h2>
            <Button onClick={handleFetchMore}>{'MORE'}</Button>
            {!!data && <>{JSON.stringify(data.pages)}</>}
        </>
    )
}
