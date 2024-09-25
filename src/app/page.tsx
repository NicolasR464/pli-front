import { RegistrationForm } from '@/components/forms/userRegistration'

import type { User } from '@clerk/nextjs/server'
import { auth, currentUser } from '@clerk/nextjs/server'

type UserData = {
    readonly id?: string
    readonly firstName?: string
    readonly lastName?: string
    readonly email?: string
    readonly jwt?: string
}

const Home = async (): Promise<React.JSX.Element> => {
    const clerkUserData: User | null = await currentUser()
    const { getToken } = auth()

    const jwt = await getToken({ template: 'trocup-1' })

    const userData: UserData = {
        id: clerkUserData?.id ?? undefined,
        firstName: clerkUserData?.firstName ?? undefined,
        lastName: clerkUserData?.lastName ?? undefined,
        email: clerkUserData?.emailAddresses[0]?.emailAddress ?? undefined,
        jwt: jwt ?? undefined,
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24'>
            <h1>{process.env.NODE_ENV}</h1>

            {!!userData.id && <RegistrationForm user={userData} />}
        </div>
    )
}

export default Home
