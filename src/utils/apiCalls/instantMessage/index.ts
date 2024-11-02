import { instantMsgInstance } from '@/utils/axiosInstances/instantMessage'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { InstantMessage } from '@/types/instantMessage'

import type { AxiosResponse } from 'axios'

export const getInstantMsgs = async (): Promise<InstantMessage[]> => {
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(
            apiEndpoints.microServices.private.INSTANT_MESSAGES,
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.private.INSTANT_MESSAGES}`,
        )

    return response.data
}
