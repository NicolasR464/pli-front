import Clerk from './home'

import { auth, currentUser } from '@clerk/nextjs/server'

const Home = async (): Promise<React.JSX.Element> => {
    const { userId } = auth()

    let user

    if (userId) {
        // Query DB for user specific information or display assets only to signed in users
        console.log({ userId })
        user = await currentUser()
    }

    // Use `user` to render user details or create UI elements

    return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{process.env.NODE_ENV}</h1>
            <h1>{JSON.stringify(user, null, 2)}</h1>
            <Clerk />
        </div>
    )
}

export default Home
