import { environment } from '@/types/environment'

import { createInstance } from '.'

/**
 * Creates an Axios instance for transaction-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const transactionInstance = createInstance(
    typeof window === 'undefined'
        ? environment.TRANSACTION_BASE_URL
        : environment.NEXT_PUBLIC_TRANSACTION_BASE_URL,
)
