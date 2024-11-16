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
    const userDataStore = useUserStore((state) => state.user)
    const hasStoreHydrated = useUserStore((state) => state.hasHydrated)

    const { data: userQuery } = useQuery({
        queryKey: [rqKeys.USER, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId && !userDataStore.pseudo && hasStoreHydrated,
    })

    useEffect(() => {
        if (isLoaded && isSignedIn && userQuery && !userDataStore.pseudo) {
            setUserData({
                pseudo: userQuery.pseudo,
                avatarUrl: userQuery.avatarUrl,
                credit: userQuery.credit,
                balance: userQuery.balance,
                isPremium: userQuery.isPremium,
            })
        }

        // Empty the user data in local storage if the user logged out
        if (!isSignedIn && userDataStore.pseudo) resetUserData()
    }, [
        isLoaded,
        isSignedIn,
        userId,
        setUserData,
        userQuery,
        userDataStore,
        resetUserData,
    ])

    return undefined
}

export default UserStoreProvider
