'use client'

import { useUser } from '@clerk/nextjs'

const Room = (): React.JSX.Element => {
    // Get user info from Clerk
    const { user } = useUser()

    // Loading state while fetching the user
    if (!user) {
        return <div>{'Loading…'}</div>
    }

    // Component
    return (
        <div>
            <h1>{'Room'}</h1>
            <p>
                {'Connecté : '}
                {user.id}
            </p>
            {/* <ShowTokenComponent/> */}
        </div>
    )
}

export default Room
