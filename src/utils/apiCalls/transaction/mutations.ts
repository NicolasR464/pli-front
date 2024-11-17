import type { Article } from '@/types/article'
import type { Transaction } from '@/types/transaction'
import type { TransactionStates } from '@/types/transaction/actions'
import type { User } from '@/types/user'

import { createTransaction } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export type TransactionParams = {
    data: {
        userA: User['id']
        userB: User['id']
        articleB: Partial<Article>
        articleA?: Partial<Article>
        state: TransactionStates
    }
    JWT: string
}

/**
 * Custom hook for sending an email by using React Query's useMutation.
 */
export const useCreateTransaction = (): UseMutationResult<
    Transaction,
    Error,
    TransactionParams
> => {
    return useMutation<Transaction, Error, TransactionParams>({
        mutationFn: ({ data, JWT }) => createTransaction(data, JWT),
    })
}
