import Image from 'next/image'

import { RegistrationForm } from '@/components/forms/userRegistration'

import { trocUpLogos } from '@/utils/constants/images'

const Onboarding = (): React.JSX.Element => {
    return (
        <div className='flex h-screen flex-col items-center justify-start'>
            <Image
                src={trocUpLogos.transparent.secondary}
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
