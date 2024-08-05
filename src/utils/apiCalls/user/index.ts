import { apiEndpoints } from '@/utils/constants/endpoints'

import type { User } from '@/types/user'

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(process.env.USER_BASE_URL + apiEndpoints.USERS)

    const users = (await response.json()) as User[]

    return users
}
