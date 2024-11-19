import type {
    ConfirmTransactionParams,
    PreTransactionParams,
} from './mutations'

import { transactionInstance } from '@/utils/axiosInstances/transaction'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { Transaction } from '@/types/transaction'

import type { AxiosResponse } from 'axios'

export const getTransactions = async (): Promise<Transaction[]> => {
    const response: AxiosResponse<Transaction[]> =
        await transactionInstance.get(
            apiEndpoints.microServices.protected.TRANSACTIONS,
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.protected.TRANSACTIONS}`,
        )

    return response.data
}

/**
 * Function to create a new transaction.
 * @param {PreTransactionParams} data - The transaction data to create.
 * @param {string} JWT - The JSON Web Token for authentication.
 * @returns {Promise<TransactionResponse>} The created transaction.
 */
export const createPreTransaction = async (
    data: PreTransactionParams['data'],
    JWT: PreTransactionParams['JWT'],
): Promise<Transaction> => {
    addAuthHeader(transactionInstance, JWT)

    // eslint-disable-next-line no-console
    console.log('data', data)

    const response: AxiosResponse<Transaction> = await transactionInstance.post(
        apiEndpoints.microServices.protected.TRANSACTIONS,
        data,
    )

    if (response.status !== 201)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.protected.TRANSACTIONS}`,
        )

    return response.data
}

/**
 * Function to confirm a transaction.
 * @param {ConfirmTransactionParams} data - The transaction data to confirm.
 * @param {string} JWT - The JSON Web Token for authentication.
 * @returns {Promise<Transaction>} The confirmed transaction.
 */
export const confirmTransaction = async (
    data: ConfirmTransactionParams['data'],
    JWT: ConfirmTransactionParams['JWT'],
): Promise<Transaction> => {
    addAuthHeader(transactionInstance, JWT)

    console.log('🔥 confirmTransaction')

    console.log(data)

    const response: AxiosResponse<Transaction> =
        await transactionInstance.patch(
            apiEndpoints.microServices.protected.TRANSACTION_FINAL.replace(
                ':id',
                data.id,
            ),
            { state: data.state },
        )

    if (response.status !== 200) {
        console.log(response)

        throw new Error(
            `Failed to confirm ${apiEndpoints.microServices.protected.TRANSACTION_FINAL.replace(
                ':id',
                data.id,
            )}`,
        )
    }

    return response.data
}
