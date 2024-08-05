import { apiEndpoints } from '@/utils/constants/endpoints'

/** @TODO Change Type */
import type { User } from '@/types/user'

export const getTransactions = async (): Promise<User[]> => {
    const response = await fetch(
        process.env.USER_BASE_URL + apiEndpoints.TRANSACTIONS,
    )

    const transactions = (await response.json()) as User[]

    return transactions
}
