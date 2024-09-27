import Image from 'next/image'

import { RegistrationForm } from '@/components/forms/userRegistration'

const Onboarding = (): React.JSX.Element => {
    return (
        <div className='flex h-screen flex-col items-center justify-start'>
            <Image
                src='https://res.cloudinary.com/etnaassets/image/upload/v1723194847/TROCUP_nobk_4x_izt0q3.png'
                alt='TrocUp Logo'
                width={200}
                height={200}
                className='my-8'
            />
            <h1 className='mb-8 text-4xl font-bold'>
                {'Bienvenue sur TrocUp !'}
            </h1>
            <RegistrationForm />
        </div>
    )
}

export default Onboarding
