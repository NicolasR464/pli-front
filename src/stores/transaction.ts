import { create } from 'zustand'

// Définir un type pour les données du store
type TransactionStore = {
    transacUser_b: string | undefined
    queryParams: Record<string, string | undefined>
    setTransactionInfo: (transacUser_b: string) => void
    setQueryParams: (params: Record<string, string | undefined>) => void
}

/**
 * Ce store est utilisé pour gérer les informations relatives à une transaction.
 * Il permet de suivre l'identifiant du propriétaire, l'identifiant de la page de l'article,
 * ainsi que les paramètres de requête associés à la transaction.
 */
export const useTransactionStore = create<TransactionStore>((set) => ({
    transacUser_b: undefined,
    transacArticle_b: undefined,
    queryParams: {},

    // Fonction pour mettre à jour ces valeurs dans le store
    setTransactionInfo: (transacUser_b: string): void => {
        set({ transacUser_b })
    },

    // Fonction pour mettre à jour les query params dans le store. Elle prend un objet contenant les paramètre de la requête sous forme de clé-valeur
    setQueryParams: (
        sendQueryParams: Record<string, string | undefined>,
    ): void => {
        set({ queryParams: sendQueryParams })
    },
}))
