import { Context } from '@/types'
import { environment } from '@/types/environment'

import { whichSide } from '../functions'
import { createInstance } from '.'

/**
 * Creates an Axios instance for article-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const articleInstance = createInstance(
    whichSide() === Context.enum.SERVER
        ? environment.ARTICLE_BASE_URL
        : environment.NEXT_PUBLIC_ARTICLE_BASE_URL,
)
