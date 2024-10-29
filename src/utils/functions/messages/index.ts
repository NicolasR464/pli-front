type Message = {
    id: string
    content: string
    isSent: boolean
    sender: string
    sentAt: Date
}

export function groupMessagesByDate(messages: Message[]) {
    return messages.reduce((groups: Record<string, Message[]>, message) => {
        // Utiliser la date ISO comme clé de regroupement
        const dateKey = new Date(message.sentAt).toISOString().split('T')[0] // garde juste la partie 'YYYY-MM-DD'

        // Initialiser le groupe de messages pour cette date si inexistant
        if (!groups[dateKey]) {
            groups[dateKey] = []
        }

        // Ajouter le message dans le groupe correspondant
        groups[dateKey].push(message)

        return groups
    }, {})
}

// Fonction pour formater la date d'affichage
export function formatDate(dateString: string) {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
        return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Hier'
    } else {
        return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    }
}