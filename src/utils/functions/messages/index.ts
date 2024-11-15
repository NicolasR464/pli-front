/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-destructuring */
/* eslint-disable unicorn/no-array-reduce */
type Message = {
    id: string
    content: string
    isSent: boolean
    sender: string
    sentAt: Date
}

/**
 * Regroupe les messages par date.
 * @param {Message[]} messages - Liste des messages à regrouper par date.
 * @returns {Record<string, Message[]>} - Un objet contenant les messages regroupés par date, où chaque clé est une date unique au format `YYYY-MM-DD` et chaque valeur est un tableau de messages envoyés ce jour-là.
 */

export const groupMessagesByDate = (
    messages: Message[],
): Record<string, Message[]> =>
    messages.reduce((groups: Record<string, Message[]>, message) => {
        // Utiliser la date ISO comme clé de regroupement
        const dateKey = new Date(message.sentAt).toISOString().split('T')[0]

        // Initialiser le groupe de messages pour cette date si inexistant
        if (!groups[dateKey]) {
            groups[dateKey] = []
        }

        // Ajouter le message dans le groupe correspondant
        groups[dateKey].push(message)

        return groups
    }, {})

// Fonction pour formater la date d'affichage
/**
 * Formate une date sous forme de chaîne en fonction de sa valeur relative à la date actuelle.
 *
 * - Retourne "Aujourd'hui" si la date est la date actuelle.
 * - Retourne "Hier" si la date est celle de la veille.
 * - Sinon, retourne une représentation lisible de la date en français.
 * @param {string} dateString - La date sous forme de chaîne à formater.
 * @returns {string} - La date formatée, lisible en français.
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
        return `Aujourd’hui`
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Hier'
    }
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })
}
