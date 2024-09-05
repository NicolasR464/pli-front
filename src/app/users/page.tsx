/* eslint-disable @typescript-eslint/promise-function-async */
import { Suspense } from 'react'

import { UsersList } from '@/components/UsersList'
import Loading from './loading'

import { getUsers } from '@/utils/apiCalls/user'
import { getQueryClient } from '@/utils/providers/getQueryClient'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/** Display all users data. */
const Users = (): React.JSX.Element => {
    const queryClient = getQueryClient()

    queryClient.prefetchInfiniteQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(0),
        initialPageParam: 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        pages: 1,
    })
    const dehydratedState = dehydrate(queryClient)

    return (
        <main>
            <h1>{'Users page - server side '}</h1>

            <HydrationBoundary state={dehydratedState}>
                <Loading />
                <Suspense fallback={<>{'Loading server side'}</>}>
                    <UsersList />
                </Suspense>
            </HydrationBoundary>
        </main>
    )
}

export default Users
