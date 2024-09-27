// eslint-disable-next-line simple-import-sort/imports
import { environment } from '@/types/environment'
import { createInstance } from '.'

/**
 * Creates an Axios instance for user-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const userInstance = createInstance(
    typeof window === 'undefined'
        ? environment.USER_BASE_URL
        : environment.NEXT_PUBLIC_USER_BASE_URL,
)
