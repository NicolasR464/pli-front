import { pagePaths } from '@/utils/constants'

import { SignUp } from '@clerk/nextjs'

const SignUpPage = (): React.JSX.Element => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <SignUp forceRedirectUrl={pagePaths.HOME} />
        </div>
    )
}

export default SignUpPage
