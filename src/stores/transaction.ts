import { create } from 'zustand'

// Définir un type pour les données du store
type TransactionStore = {
    owner: string | undefined
    articlePageId: string | undefined
    queryParams: Record<string, string | undefined>
    setTransactionInfo: (owner: string, articlePageId: string) => void
    setQueryParams: (params: Record<string, string | undefined>) => void
}

/**
 * Ce store est utilisé pour gérer les informations relatives à une transaction.
 * Il permet de suivre l'identifiant du propriétaire, l'identifiant de la page de l'article,
 * ainsi que les paramètres de requête associés à la transaction.
 */
export const useTransactionStore = create<TransactionStore>((set) => ({
    owner: undefined,
    articlePageId: undefined,
    queryParams: {},

    // Fonction pour mettre à jour ces valeurs dans le store
    setTransactionInfo: (owner: string, articlePageId: string): void => {
        set({ owner, articlePageId })
    },

    // Fonction pour mettre à jour les query params dans le store. Elle prend un objet contenant les paramètre de la requête sous forme de clé-valeur
    setQueryParams: (
        sendQueryParams: Record<string, string | undefined>,
    ): void => {
        set({ queryParams: sendQueryParams })
    },
}))
