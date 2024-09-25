import { Context } from '@/types'
import { environment } from '@/types/environment'

import { whichSide } from '../functions'
import { createInstance } from '.'

/**
 * Creates an Axios instance for instant message-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const instantMsgInstance = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.INSTANT_MESSAGE_BASE_URL
        : environment.NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL,
)
