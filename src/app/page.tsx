import Hero from '@/components/designSystem/Hero'
import { Notification } from '@/components/Notification'
import WelcomeMsg from '@/components/WelcomeMsg'

type HomeProperties = {
    readonly searchParams?: Record<string, string | string[] | undefined>
}

const defaultSearchParams = {}

const Home = ({
    searchParams = defaultSearchParams,
}: HomeProperties): React.JSX.Element => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-start'>
            {/* Toaster from the search params */}
            <Notification />
            <Hero />
            {/* Display the welcome message if the onboarding search param is present */}
            {!!searchParams.onboarding && <WelcomeMsg />}
        </div>
    )
}

export default Home
