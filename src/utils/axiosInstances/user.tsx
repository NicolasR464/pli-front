import { Context } from '@/types'
import { environment } from '@/types/environment'

import { whichSide } from '../functions'
import { createInstance } from '.'

/**
 * Creates an Axios instance for user-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const userInstance = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.USER_BASE_URL
        : environment.NEXT_PUBLIC_USER_BASE_URL,
    false,
)

/**
 * Creates an Axios instance for user-related API requests with authentication.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const userInstanceAuth = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.USER_BASE_URL
        : environment.NEXT_PUBLIC_USER_BASE_URL,
)
