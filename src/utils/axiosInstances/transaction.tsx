import { Context } from '@/types'
import { environment } from '@/types/environment'

import { whichSide } from '../functions'
import { createInstance } from '.'

/**
 * Creates an Axios instance for transaction-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const transactionInstance = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.TRANSACTION_BASE_URL
        : environment.NEXT_PUBLIC_TRANSACTION_BASE_URL,
    false,
)

/**
 * Creates an Axios instance for transaction-related API requests with authentication.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const transactionInstanceAuth = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.TRANSACTION_BASE_URL
        : environment.NEXT_PUBLIC_TRANSACTION_BASE_URL,
)
