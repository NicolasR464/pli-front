import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { apiMockEndpoints } from '@/utils/constants/endpoints'

import type { User } from '@/types/user'

type UsersStore = {
    users: User[]
    getUsersData: () => Promise<void>
}

export const useUsersStore = create<UsersStore>()(
    immer((set) => ({
        users: [],

        getUsersData: async (): Promise<void> => {
            const response = await fetch(apiMockEndpoints.MOCK_USERS)

            const users = (await response.json()) as User[]

            set((state) => {
                state.users = users
            })
        },
    })),
)
