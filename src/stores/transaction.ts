import { create } from 'zustand'

import type { PartialArticleFields, UserB } from '@/types/transaction/actions'
import type { User } from '@/types/user'

// Define a type for the store's data
type TransactionStore = {
    transacUser_b: string | undefined
    queryParams: Record<string, string | undefined>
    setTransactionInfo: (transacUser_b: string) => void
    setQueryParams: (params: Record<string, string | undefined>) => void
    openRequestDialog: boolean
    setOpenRequestDialog: (open: boolean) => void
    articleA: PartialArticleFields | undefined
    articleB: PartialArticleFields | undefined
    userB: Pick<User, 'id' | 'email'>
    setArticleA: (articleA: PartialArticleFields) => void
    setArticleB: (articleB: PartialArticleFields) => void
    setUserB: (userB: UserB) => void
    requestSent: boolean
    setRequestSent: (sent: boolean) => void
}

/**
 * This store is used to manage information related to a transaction.
 * It tracks the owner ID,
 * as well as the query parameters associated with the transaction.
 */
export const useTransactionStore = create<TransactionStore>((set) => ({
    transacUser_b: undefined,
    queryParams: {},
    openRequestDialog: false,
    articleA: undefined,
    articleB: undefined,
    userB: { id: '', email: '' },
    requestSent: false,
    // Function to update these values in the store
    setTransactionInfo: (transacUser_b: string): void => {
        set({ transacUser_b })
    },

    // Function to update the query parameters in the store (object containing the query parameters as key-value pairs)
    setQueryParams: (
        sendQueryParams: Record<string, string | undefined>,
    ): void => {
        set({ queryParams: sendQueryParams })
    },

    // ℹ️ Logic below is for a pre-transaction process
    /* Open the request transaction dialog */
    setOpenRequestDialog: (open: boolean): void => {
        set({ openRequestDialog: open })
    },

    setRequestSent: (sent: boolean): void => {
        set({ requestSent: sent })
    },

    setArticleA: (articleA: PartialArticleFields): void => {
        set({ articleA })
    },

    setArticleB: (articleB: PartialArticleFields): void => {
        set({ articleB })
    },

    setUserB: (userB: UserB): void => {
        set({ userB })
    },
}))
