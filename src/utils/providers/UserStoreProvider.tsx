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

    const { data: userQuery, isSuccess: isUserQuerySuccess } = useQuery({
        queryKey: [rqKeys.USER, userId],
        queryFn: () => getUserById(userId),
        enabled: isLoaded && !!userId && hasStoreHydrated,
    })

    useEffect(() => {
        if (isLoaded && isSignedIn && userQuery) {
            setUserData({
                pseudo: userQuery.pseudo,
                avatarUrl: userQuery.avatarUrl,
                credit: userQuery.credit || 0,
                balance: userQuery.balance || 0,
                isPremium: userQuery.isPremium || false,
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
        resetUserData,
        isUserQuerySuccess,
        userDataStore.pseudo,
    ])

    return undefined
}

export default UserStoreProvider
