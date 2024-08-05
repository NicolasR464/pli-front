import { getUsers } from '@/utils/apiCalls/userApi'

/** Display all users data */
const Users = async (): Promise<JSX.Element> => {
    const users = await getUsers()

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{'Users'}</h1>
            {users.length > 0 ? (
                <span>{JSON.stringify(users)}</span>
            ) : (
                <>{'Error message'}</>
            )}
        </main>
    )
}

export default Users
