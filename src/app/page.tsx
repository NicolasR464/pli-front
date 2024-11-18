import Hero from '@/components/designSystem/hero'
import { Notification } from '@/components/Notification'

const Home = (): React.JSX.Element => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-start'>
            {/* Toaster from the search params */}
            <Notification />
            <Hero />
            {/* Display the welcome message if the onboarding search param is present */}
        </div>
    )
}

export default Home
