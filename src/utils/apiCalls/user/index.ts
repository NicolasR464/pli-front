import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { User } from '@/types/user'

export const getUsers = async (): Promise<User[] | string> => {
    const response = await fetch(environment.USER_BASE_URL + apiEndpoints.USERS)

    const users = (await response.json()) as User[]

    return users
}
