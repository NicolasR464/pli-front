'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/stores/user'
import { getParamsAndNotify } from '@/utils/constants'

import { Button } from '../shadcn/ui/button'

const WelcomeMsg = ({
    searchParams,
}: {
    readonly searchParams: Record<string, string | string[] | undefined>
}): React.JSX.Element => {
    const { user } = useUserStore()

    useEffect(() => {
        getParamsAndNotify(searchParams)
    }, [searchParams])

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
                    {/** TODO: on FRONT-45 */}
                    <Button>{'Ajoute ton premier objet 🎁'}</Button>
                </div>
            )}
        </>
    )
}

export default WelcomeMsg
