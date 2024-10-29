'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'

import { useUserStore } from '@/stores/user'
import { getParamsAndNotify } from '@/utils/functions'

const WelcomeMsg = (): React.JSX.Element => {
    const { user } = useUserStore()

    const searchParams = useSearchParams()

    const paramsArray = []

    for (const [key, value] of searchParams.entries()) {
        paramsArray.push({ key, value })
    }

    getParamsAndNotify(paramsArray)

    return (
        <>
            {!!user.pseudo && (
                <div className='flex flex-col items-center justify-center'>
                    <div>
                        {'Bienvenue '}
                        <span className='bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'>
                            {user.pseudo}
                        </span>
                        {' ! 👋'}
                    </div>

                    <Link href='/article/new'>
                        <Button>{'Ajoute ton premier objet 🎁'}</Button>
                    </Link>
                </div>
            )}
        </>
    )
}

export default WelcomeMsg
