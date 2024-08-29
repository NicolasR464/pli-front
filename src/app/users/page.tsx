import { Button } from '@/components/shadcn/shadcnUI/button'

import { getUsers } from '@/utils/apiCalls/user'

// import getQueryClient from '@/utils/providers/getQueryClient'
import type { User } from '@/types/user'

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import { UsersList } from '@/components/UsersList'

/** Display all users data. */
const Users = async (): Promise<JSX.Element> => {
    // const users: User[] = await getUsers()

    // console.log(users)

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    })

    const dehydratedState = dehydrate(queryClient)

    console.log(queryClient)

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-emerald-300	'>{'Users page - server side '}</h1>
            <Button>{'🥸 This is a btn'}</Button>

            <HydrationBoundary state={dehydratedState}>
                <UsersList />
            </HydrationBoundary>

            {/* {users.length > 0 &&
                users.map((user) => <div key={user.id}>{user.name}</div>)} */}
        </main>
    )
}

export default Users
