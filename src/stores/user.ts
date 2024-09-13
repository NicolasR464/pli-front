import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { Address } from '@/types/user'

/** To complete according to the evolution of the app */
type UserData = {
    pseudo: string
    address: Address
}

type UserStore = {
    user: UserData
    setUserData: () => Promise<void>
}

/** Todo in FRONT-33 */
export const useUserStore = create<UserStore>()(
    immer(() => ({
        user: {
            pseudo: '',
            address: {
                street: '',
                city: '',
                postcode: 0,
                citycode: 0,
                geopoints: { type: '', coordinates: [0, 0] },
            },
        },

        setUserData: async (): Promise<void> => {
            /** Example of use */
        },
    })),
)
