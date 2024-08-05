import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { apiEndpoints, apiMockEndpoints } from '@/utils/constants/endpoints'

import type { User } from '@/types/user'

type UsersStore = {
    users: User[]
    getUsersData: () => Promise<void>
}

export const useUsersStore = create<UsersStore>()(
    immer((set) => ({
        users: [],

        getUsersData: async (): Promise<void> => {
            console.log('🔥')
            console.log(
                process.env.NEXT_PUBLIC_USER_BASE_URL + apiEndpoints.USERS,
            )

            /*
             * Const response = await fetch(
             *     process.env.NEXT_PUBLIC_USER_BASE_URL + apiEndpoints.USERS,
             * )
             */

            const response = await fetch(apiMockEndpoints.MOCK_USERS)

            const users = (await response.json()) as User[]

            set((state) => {
                state.users = users
            })
        },
    })),
)
