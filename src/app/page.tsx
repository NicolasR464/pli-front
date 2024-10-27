import WelcomeMsg from '@/components/WelcomeMsg'

type HomeProperties = {
    readonly searchParams?: Record<string, string | string[] | undefined>
}

const defaultSearchParams = {}

const Home = ({
    searchParams = defaultSearchParams,
}: HomeProperties): React.JSX.Element => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24'>
            {!!searchParams.onboarding && (
                <WelcomeMsg searchParams={searchParams} />
            )}
        </div>
    )
}

export default Home
