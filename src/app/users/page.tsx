import { Button } from '@/components/shadcn/shadcnUI/button'
import { UsersList } from '@/components/UsersList'

import { getUsers } from '@/utils/apiCalls/user'
import { getQueryClient } from '@/utils/providers/getQueryClient'

import type { User } from '@/types/user'

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
        <main className='flex min-h-screen flex-col items-center justify-between'>
            <h1 className='text-emerald-300'>{'Users page - server side '}</h1>

            <HydrationBoundary state={dehydratedState}>
                <UsersList />
            </HydrationBoundary>
        </main>
    )
}

export default Users
