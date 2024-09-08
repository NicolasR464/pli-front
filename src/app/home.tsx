'use client'
import { useAuth } from '@clerk/nextjs'

const Clerk = (): React.JSX.Element => {
    const { isLoaded, userId, sessionId, getToken } = useAuth()

    const handleClick = async (): Promise<void> => {
        const token = await getToken({ template: 'trocup-1' })
        // Use the token to make an authenticated request
        console.log({ token })
    }

    return (
        <div>
            {'Hello, '}
            {userId}
            {' your current active session is '}
            {sessionId}

            <button onClick={() => handleClick()}>
                Make Authenticated Request
            </button>
        </div>
    )
}
export default Clerk
