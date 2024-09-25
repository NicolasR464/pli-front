import { RegistrationForm } from '@/components/forms/userRegistration'
import ClerkTest from './clerkTest'

import type { User } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'

type UserData = {
    readonly id?: string
    readonly firstName?: string
    readonly lastName?: string
    readonly email?: string
}

const Home = async (): Promise<React.JSX.Element> => {
    const clerkUserData: User | null = await currentUser()

    const userData: UserData = {
        id: clerkUserData?.id ?? undefined,
        firstName: clerkUserData?.firstName ?? undefined,
        lastName: clerkUserData?.lastName ?? undefined,
        email: clerkUserData?.emailAddresses[0]?.emailAddress ?? undefined,
    }

    console.log({ userData })
    // if (userId) {
    //     // Query DB for user specific information or display assets only to signed in users
    //     console.log({ userId })
    //     userData =
    // }

    // Use `user` to render user details or create UI elements

    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24'>
            <h1>{process.env.NODE_ENV}</h1>

            {!!userData.id && <RegistrationForm user={userData} />}

            {/* <h1>{JSON.stringify(user, undefined, 2)}</h1> */}
            <ClerkTest />
        </div>
    )
}

export default Home
