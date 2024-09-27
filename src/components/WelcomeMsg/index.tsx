'use client'

import { useEffect, useState } from 'react'

import { useUserStore } from '@/stores/user'
import { userMessages } from '@/utils/constants'
import { notify } from '@/utils/functions'

import { NotificationType } from '@/types'

import { Button } from '../shadcn/ui/button'

const WelcomeMsg = ({
    allGood,
}: {
    readonly allGood: boolean
}): React.JSX.Element => {
    const { user } = useUserStore()

    const [toastState, setToastState] = useState({
        message: '',
        type: NotificationType.enum.SUCCESS as NotificationType,
    })

    useEffect(() => {
        if (allGood)
            setToastState({
                message: userMessages.onboardingSuccess,
                type: NotificationType.enum.SUCCESS,
            })

        if (!allGood)
            setToastState({
                message: userMessages.onboardingError,
                type: NotificationType.enum.ERROR,
            })
    }, [allGood])

    useEffect(() => {
        if (user.pseudo && toastState.message) notify(toastState)
    }, [user, toastState])

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
