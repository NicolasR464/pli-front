import type { Article } from '@/types/article'
import type { Transaction } from '@/types/transaction'
import type { TransactionStates } from '@/types/transaction/actions'
import type { User } from '@/types/user'

import { confirmTransaction, createPreTransaction } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export type PreTransactionParams = {
    data: {
        userA: User['id']
        userB: User['id']
        articleB: Partial<Article>
        articleA?: Partial<Article>
        state: TransactionStates
    }
    JWT: string
}

export type ConfirmTransactionParams = {
    data: {
        id: Transaction['id']
        state: TransactionStates
    }
    JWT: string
}

/**
 * Custom hook for sending an email by using React Query's useMutation.
 */
export const useCreatePreTransaction = (): UseMutationResult<
    Transaction,
    Error,
    PreTransactionParams
> => {
    return useMutation<Transaction, Error, PreTransactionParams>({
        mutationFn: ({ data, JWT }) => createPreTransaction(data, JWT),
    })
}

/**
 * Custom hook for confirming a transaction.
 */
export const useConfirmTransaction = (): UseMutationResult<
    Transaction,
    Error,
    ConfirmTransactionParams
> => {
    return useMutation<Transaction, Error, ConfirmTransactionParams>({
        mutationFn: ({ data, JWT }) => confirmTransaction(data, JWT),
    })
}
