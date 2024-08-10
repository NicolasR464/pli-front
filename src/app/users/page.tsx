import { Button } from '@/components/shadcn/shadcnUI/button'

import { getUsers } from '@/utils/apiCalls/user'

import type { User } from '@/types/user'

/** Display all users data. */
const Users = async (): Promise<JSX.Element> => {
    const users: User[] = await getUsers()

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-emerald-300	'>{'Users'}</h1>
            <Button>{'🥸'}</Button>
            {users.length > 0 &&
                users.map((user) => <div key={user.id}>{user.name}</div>)}
        </main>
    )
}

export default Users
