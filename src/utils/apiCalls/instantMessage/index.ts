import { apiEndpoints } from '@/utils/constants/endpoints'

import type { InstantMessage } from '@/types/instantMessage'

export const getInstantMsgs = async (): Promise<InstantMessage[]> => {
    const response = await fetch(
        process.env.INSTANT_MESSAGE_BASE_URL + apiEndpoints.INSTANT_MESSAGES,
    )

    const instantMsgs = (await response.json()) as InstantMessage[]

    return instantMsgs
}
