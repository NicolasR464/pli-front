/* eslint-disable @typescript-eslint/promise-function-async */
import { Suspense } from 'react'

import SkeletonAvatarTxt from '@/components/skeletons/SkeletonAvatarTxt'
import { UsersList } from '@/components/UsersList'

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

    const skeletons = []
    for (let inc = 0; inc < 10; inc++) {
        skeletons.push(<SkeletonAvatarTxt />)
    }

    return (
        <main>
            <h1>{'Users page - server side '}</h1>

            <HydrationBoundary state={dehydratedState}>
                <Suspense fallback={skeletons}>
                    <UsersList />
                </Suspense>
            </HydrationBoundary>
        </main>
    )
}

export default Users
