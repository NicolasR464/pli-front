import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { User } from '@/types/user'

export const getUsers = async (): Promise<User[]> => {
    console.log('🚀 getUsers')

    const response = await fetch(environment.USER_BASE_URL + apiEndpoints.USERS)

    if (!response.ok) throw new Error('Failed to fetch')

    const users = await response.json()

    return users.data
}
