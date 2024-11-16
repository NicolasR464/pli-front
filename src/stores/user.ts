import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { User } from '@/types/user'

type UserStore = {
    user: Partial<User>
    setUserData: (userData: Partial<User>) => void
    resetUserData: () => void
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}

/**
 * This store is used to manage user data, including pseudo, avatarUrl, isPremium status, and address.
 * It provides a method to update the user data partially.
 */
export const useUserStore = create<UserStore>()(
    persist(
        immer((set) => ({
            user: {
                pseudo: '',
                avatarUrl: '',
                isPremium: false,
                credit: 0,
                balance: 0,
                articles: [],
                comments: [],
                favoriteArticles: [],
            },

            hasHydrated: false,
            setHasHydrated: (state: boolean): void => {
                set({ hasHydrated: state })
            },

            setUserData: (userData: Partial<User>): void => {
                set((state) => {
                    state.user = { ...state.user, ...userData }
                })
            },

            resetUserData: (): void => {
                set((state) => {
                    state.user = {} as Partial<User>
                })
            },
        })),
        {
            name: 'user-store',
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        },
    ),
)
