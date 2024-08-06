import { getUsers } from '@/utils/apiCalls/user'

/** Display all users data */
const Users = async (): Promise<JSX.Element> => {
    const users = await getUsers()

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-emerald-300	'>{'Users'}</h1>
            {users.length > 0 && <span>{JSON.stringify(users)}</span>}
        </main>
    )
}

export default Users
