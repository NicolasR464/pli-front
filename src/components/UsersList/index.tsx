'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import { getUsers } from '@/utils/apiCalls/user'

import { Avatar } from '../shadcn/ui/avatar'
import SkeletonAvatarTxt from '../skeletons/SkeletonAvatarTxt'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

export const UsersList = (): React.JSX.Element => {
    const {
        data: users,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useSuspenseInfiniteQuery({
        // } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({ pageParam }) => getUsers(pageParam),

        initialPageParam: 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    })

    const previousScrollPosition = useRef(0)

    useEffect(() => {
        const handleScroll = (): void => {
            const pxToBottom =
                document.body.offsetHeight -
                (window.innerHeight + window.scrollY)

            if (
                pxToBottom < 150 &&
                hasNextPage &&
                !isFetching &&
                !isFetchingNextPage
            ) {
                // Save the current scroll position before fetching so it can scroll up once new data loaded
                previousScrollPosition.current = window.scrollY
                fetchNextPage()
            }
        }

        window.addEventListener('scroll', handleScroll)

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage])

    // This useEffect runs after new data has been fetched
    useEffect(() => {
        if (!isFetchingNextPage) {
            // Restore the previous scroll position after fetching data
            window.scrollTo(0, previousScrollPosition.current)
        }
    }, [isFetchingNextPage])

    return (
        <div>
            <h2 className='fixed text-center text-emerald-300'>
                {
                    'Users list - client side - This demonstrate React Query with infinite scrolling'
                }
            </h2>

            {users.pages.length > 0 &&
                users.pages.map((page) =>
                    page.users.map((user) => (
                        <div
                            key={user.pseudo + Date.now()}
                            className='flex justify-center p-2'
                        >
                            <div className='flex w-3/4 items-center justify-center'>
                                <Avatar>
                                    <Image
                                        src={user.avatarUrl ?? ''}
                                        width={500}
                                        height={500}
                                        alt='User avatar'
                                    />
                                </Avatar>
                                <div className='p-2'>{user.pseudo}</div>
                            </div>
                        </div>
                    )),
                )}
            <div>{!!isFetching && <SkeletonAvatarTxt />}</div>
        </div>
    )
}
