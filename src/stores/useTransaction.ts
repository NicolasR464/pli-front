import { create } from 'zustand'

// Définir un type pour les données du store
type TransactionStore = {
    owner: string | undefined
    articlePageId: string | undefined
    setTransactionInfo: (owner: string, articlePageId: string) => void
}

// Créez un store pour gérer les informations de transaction
export const useTransactionStore = create<TransactionStore>((set) => ({
    owner: undefined,
    articlePageId: undefined,

    // Fonction pour mettre à jour ces valeurs dans le store
    setTransactionInfo: (owner: string, articlePageId: string): void => {
        set({ owner, articlePageId })
    },
}))
