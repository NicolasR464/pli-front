import { environment } from '@/types/environment'

import { createInstance } from '.'

/**
 * Creates an Axios instance for instant message-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const instantMsgInstance = createInstance(
    typeof window === 'undefined'
        ? environment.INSTANT_MESSAGE_BASE_URL
        : environment.NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL,
)
