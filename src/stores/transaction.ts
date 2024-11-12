import { create } from 'zustand'

// Définir un type pour les données du store
type TransactionStore = {
    owner: string | undefined
    articlePageId: string | undefined
    queryParams: Record<string, string | undefined>
    setTransactionInfo: (owner: string, articlePageId: string) => void
    setQueryParams: (params: Record<string, string | undefined>) => void
}

// Créez un store pour gérer les informations de transaction
export const useTransactionStore = create<TransactionStore>((set) => ({
    owner: undefined,
    articlePageId: undefined,
    queryParams: {},

    // Fonction pour mettre à jour ces valeurs dans le store
    setTransactionInfo: (owner: string, articlePageId: string): void => {
        set({ owner, articlePageId })
    },

    // Fonction pour mettre à jour les query params dans le store
    setQueryParams: (
        sendQueryParams: Record<string, string | undefined>,
    ): void => {
        set({ queryParams: sendQueryParams })
    },
}))
