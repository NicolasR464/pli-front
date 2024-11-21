import { Suspense } from 'react'

import SkeletonAvatarTxt from '@/components/skeletons/SkeletonAvatarTxt'
import { UsersList } from '@/components/UsersList'

import { getUsers } from '@/utils/apiCalls/user'
import { rqKeys } from '@/utils/constants'
import { getQueryClient } from '@/utils/providers/getQueryClient'

import { auth } from '@clerk/nextjs/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/** Display all users data. */
const Users = async (): Promise<React.JSX.Element> => {
    const queryClient = getQueryClient()
    const { getToken } = auth()
    try {
        const token = await getToken({ template: 'trocup-1' })
        if (token) {
            await queryClient.prefetchInfiniteQuery({
                queryKey: [rqKeys.USERS],
                queryFn: () => getUsers(0, token),
                initialPageParam: 0,
                getNextPageParam: (lastPage) =>
                    lastPage.nextCursor ?? undefined,
                pages: 1,
            })
        }
    } catch {
        return (
            <main className='flex·min-h-screen·items-center·justify-center·bg-gray-100'>
                <h1>{'Error'}</h1>
                <p>{'Something went wrong while fetching the token.'}</p>
            </main>
        )
    }
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
