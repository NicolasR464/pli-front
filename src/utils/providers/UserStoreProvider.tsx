'use client'

import { useEffect } from 'react'

import { useUserStore } from '@/stores/user'

import { getUserById } from '../apiCalls/user'
import { rqKeys } from '../constants'
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

const UserStoreProvider = (): undefined => {
    const { isLoaded, userId, isSignedIn } = useAuth()

    const setUserData = useUserStore((state) => state.setUserData)
    const resetUserData = useUserStore((state) => state.resetUserData)
    const userStore = useUserStore((state) => state.user)

    const { data: userQuery } = useQuery({
        queryKey: [rqKeys.USER, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    })

    useEffect(() => {
        if (isLoaded && isSignedIn && userQuery && !userStore.pseudo) {
            setUserData({
                id: userId,
                pseudo: userQuery.pseudo,
                avatarUrl: userQuery.avatarUrl,
                credit: userQuery.credit,
                balance: userQuery.balance,
                isPremium: userQuery.isPremium,
            })
        }

        if (!isSignedIn && userStore.pseudo) resetUserData()
    }, [
        isLoaded,
        isSignedIn,
        userId,
        setUserData,
        userQuery,
        userStore,
        resetUserData,
    ])

    return undefined
}

export default UserStoreProvider
