/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

import { getUsers } from '@/utils/apiCalls/user'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const UsersList = (): JSX.Element => {
    console.log('🔥 UsersList')

    ///////////

    const {
        data: users,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({ pageParam }) => getUsers(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    console.log('%c isFetching', 'color: red', isFetching)

    useEffect(() => {
        const handleScroll = (): void => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 2 &&
                hasNextPage &&
                !isFetchingNextPage
            )
                fetchNextPage()
        }

        window.addEventListener('scroll', handleScroll)

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    console.log({ users })

    return (
        <>
            <h2 className='text-emerald-300	'>{'Users list - client side'}</h2>

            {!!isFetching && <div>{'🚀 Fetching'}</div>}

            {!isFetching &&
                users.length > 0 &&
                users.map((user, index) => (
                    <div key={(user.id, index)}>{user.name}</div>
                ))}
        </>
    )
}
