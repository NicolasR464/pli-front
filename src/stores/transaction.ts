import { create } from 'zustand'

// Define a type for the store's data
type TransactionStore = {
    transacUser_b: string | undefined
    queryParams: Record<string, string | undefined>
    setTransactionInfo: (transacUser_b: string) => void
    setQueryParams: (params: Record<string, string | undefined>) => void
}

/**
 * This store is used to manage information related to a transaction.
 * It tracks the owner ID,
 * as well as the query parameters associated with the transaction.
 */
export const useTransactionStore = create<TransactionStore>((set) => ({
    transacUser_b: undefined,
    queryParams: {},

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
}))
