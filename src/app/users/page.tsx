import { environment } from '@/types/environment'

// On server

/** Display all users data */
const Users = (): JSX.Element => {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{environment.DATABASE_URL}</h1>
            <h1>{environment.NEXT_PUBLIC_PUBLISHABLE_KEY}</h1>
        </main>
    )
}

export default Users
