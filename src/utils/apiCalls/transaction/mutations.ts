import { createTransaction } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export type TransactionParams = {
    data: {
        sender: string
        receiver: string
        senderArticle: string
        receiverArticle?: string
    }
    JWT: string
}

export type TransactionResponse = { response: 'Transaction created' }

/**
 * Custom hook for sending an email by using React Query's useMutation.
 */
export const useCreateTransaction = (): UseMutationResult<
    TransactionResponse,
    Error,
    TransactionParams
> => {
    return useMutation<TransactionResponse, Error, TransactionParams>({
        mutationFn: ({ data, JWT }) => createTransaction(data, JWT),
    })
}
