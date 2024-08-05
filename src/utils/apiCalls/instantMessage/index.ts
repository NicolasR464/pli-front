import { apiEndpoints } from '@/utils/constants/endpoints'

/** @TODO Change Type */
import type { User } from '@/types/user'

export const getInstantMsgs = async (): Promise<User[]> => {
    const response = await fetch(
        process.env.USER_BASE_URL + apiEndpoints.INSTANT_MESSAGES,
    )

    const instantMsgs = (await response.json()) as User[]

    return instantMsgs
}
