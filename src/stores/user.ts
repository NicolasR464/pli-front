import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type UserStore = {
    user: any
    setUserData: () => Promise<void>
}
/** Todo in FRONT-33 */
export const useUserStore = create<UserStore>()(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    immer((set) => ({
        user: {},

        setUserData: async (): Promise<void> => {
            /** Example of use */
        },
    })),
)
