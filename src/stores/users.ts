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

        getUsersData: async (): Promise<void> => {},
    })),
)
