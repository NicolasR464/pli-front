import { instantMsgInstance } from '@/utils/axiosInstances'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { InstantMessage } from '@/types/instantMessage'

import type { AxiosResponse } from 'axios'

export const getInstantMsgs = async (): Promise<InstantMessage[]> => {
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(apiEndpoints.INSTANT_MESSAGES)

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.INSTANT_MESSAGES}`)

    return response.data
}
