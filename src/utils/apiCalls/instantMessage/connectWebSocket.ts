/* eslint-disable unicorn/no-null*/
import { environment } from '@/types/environment'

let socket: WebSocket | null = null

export const connectWebSocketByRoomId = (roomId: string): WebSocket | null => {
    // Vérifier si le code s'exécute côté client
    if (typeof window !== 'undefined') {
        const wsUrl = `${environment.NEXT_PUBLIC_INSTANT_MESSAGE_WS_URL}${roomId}`

        // Vérifier si le WebSocket est déjà ouvert ou doit être réinitialisé
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            try {
                socket = new WebSocket(wsUrl)
            } catch {
                return null
            }
        }
    }
    return socket
}

export const sendMessageViaWebSocket = (
    content: string,
    sender: string,
    receiver: string,
    roomId: string,
): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
            JSON.stringify({
                roomID: roomId,
                message: content,
                sender,
                receiver,
            }),
        )
    }
}
