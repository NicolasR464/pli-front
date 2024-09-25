import { RegistrationForm } from '@/components/forms/userRegistration'

import { auth } from '@clerk/nextjs/server'

const Home = async (): Promise<React.JSX.Element> => {
    const { getToken } = auth()

    const jwt = await getToken({ template: 'trocup-1' })

    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24'>
            {!!jwt && <RegistrationForm jwt={jwt} />}
        </div>
    )
}

export default Home
