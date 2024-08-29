import { apiEndpoints } from '@/utils/constants/endpoints'

import { environment } from '@/types/environment'
import type { Transaction } from '@/types/transaction'

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(
        environment.TRANSACTION_BASE_URL + apiEndpoints.TRANSACTIONS,
    )

    if (!response.ok) throw new Error('Failed to fetch')

    const transactions = (await response.json()) as Transaction[]

    return transactions
}
