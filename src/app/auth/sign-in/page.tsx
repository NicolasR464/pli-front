import { pagePaths } from '@/utils/constants'

import { SignIn } from '@clerk/nextjs'

const SignInPage = (): React.JSX.Element => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <SignIn forceRedirectUrl={pagePaths.HOME} />
        </div>
    )
}

export default SignInPage
