import { transactionInstance } from '@/utils/axiosInstances/transaction'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { Transaction } from '@/types/transaction'

import type { AxiosResponse } from 'axios'

export const getTransactions = async (): Promise<Transaction[]> => {
    const response: AxiosResponse<Transaction[]> =
        await transactionInstance.get(
            apiEndpoints.microServices.private.TRANSACTIONS,
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.private.TRANSACTIONS}`,
        )

    return response.data
}
