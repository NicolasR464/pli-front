import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { User } from '@/types/user'

type UserStore = {
    user: Partial<User>
    setUserData: (userData: Partial<User>) => void
    resetUserData: () => void
}

/**
 * This store is used to manage non-sensitive user data.
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

            /**
             * This function updates the user data partially.
             * @param {Partial<User>} userData - The user data to update.
             */
            setUserData: (userData: Partial<User>): void => {
                set((state: UserStore) => {
                    state.user = { ...state.user, ...userData }
                })
            },

            /**
             * This function deletes the user data, to be used when the user logs out.
             */
            resetUserData: (): void => {
                set((state: UserStore) => {
                    state.user = {
                        pseudo: '',
                        avatarUrl: '',
                        isPremium: false,
                        credit: 0,
                        balance: 0,
                        articles: [],
                        comments: [],
                        favoriteArticles: [],
                    }
                })
            },
        })),
        {
            name: 'user-store',
        },
    ),
)
