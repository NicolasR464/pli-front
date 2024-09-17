'use client'

import { Button } from '@/components/shadcn/ui/button'

import { createUser } from '@/utils/apiCalls/user'

import { useAuth } from '@clerk/nextjs'

const ClerkTest = (): React.JSX.Element => {
    const { isLoaded, userId, sessionId, getToken } = useAuth()

    const handleClick = async (): Promise<void> => {
        console.log('🚀 handleClick')

        const token = await getToken({ template: 'trocup-1' })
        // Use the token to make an authenticated request
        console.log({ token })

        if (token) createUser(token)
    }

    return (
        <div>
            {'Hello, '}
            {userId}
            {' your current active session is '}
            {sessionId}

            <Button onClick={() => handleClick()}>
                {'Make Authenticated Request'}
            </Button>
        </div>
    )
}
export default ClerkTest
