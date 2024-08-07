import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { User } from '@/types/user'

type UsersStore = {
    users: User[]
    getUsersData: () => Promise<void>
}

export const useUsersStore = create<UsersStore>()(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    immer((set) => ({
        users: [],

        getUsersData: async (): Promise<void> => {
            /** @TODO */
        },
    })),
)
