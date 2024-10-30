import { Suspense } from 'react'

import SkeletonAvatarTxt from '@/components/skeletons/SkeletonAvatarTxt'
import { UsersList } from '@/components/UsersList'

import { getUsers } from '@/utils/apiCalls/user'
import { rqKeys } from '@/utils/constants'
import { getQueryClient } from '@/utils/providers/getQueryClient'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/** Display all users data. */
const Users = async (): Promise<React.JSX.Element> => {
    const queryClient = getQueryClient()

    await queryClient.prefetchInfiniteQuery({
        queryKey: [rqKeys.USERS],
        queryFn: () => getUsers(0),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
        pages: 1,
    })

    const skeletons = []
    for (let inc = 0; inc < 10; inc++) {
        skeletons.push(<SkeletonAvatarTxt />)
    }

    return (
        <main>
            <h1>{'Users page - server side '}</h1>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={skeletons}>
                    <UsersList />
                </Suspense>
            </HydrationBoundary>
        </main>
    )
}

export default Users
