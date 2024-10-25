import Hero from '@/components/designSystem/hero'
import WelcomeMsg from '@/components/WelcomeMsg'

type HomeProperties = {
    readonly searchParams?: Record<string, string | string[] | undefined>
}

const defaultSearchParams = {}

const Home = ({
    searchParams = defaultSearchParams,
}: HomeProperties): React.JSX.Element => {
    const allGood = searchParams.onboardingSuccess === 'true'

    return (
        <div className='flex min-h-screen flex-col items-center justify-start'>
            <Hero />
            <h1>
                {!!searchParams.onboardingSuccess && (
                    <WelcomeMsg allGood={allGood} />
                )}
            </h1>
        </div>
    )
}

export default Home
