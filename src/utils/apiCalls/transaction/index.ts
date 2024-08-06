import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Transaction } from '@/types/transaction'

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await fetch(
        process.env.TRANSACTION_BASE_URL + apiEndpoints.TRANSACTIONS,
    )

    const transactions = (await response.json()) as Transaction[]

    return transactions
}
