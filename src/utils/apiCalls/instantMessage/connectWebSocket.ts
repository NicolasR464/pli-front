import { environment } from "@/types/environment"

// connectWebSocket.ts
let socket: WebSocket | null = null

export const connectWebSocketByRoomId = (roomId: string): WebSocket => {
    const wsUrl = `${environment.NEXT_PUBLIC_INSTANT_MESSAGE_WS_URL}${roomId}`
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(wsUrl)

        socket.addEventListener('open', () => {
            console.log(`WebSocket connected to room: ${roomId}`)
        })

        socket.addEventListener('close', () => {
            console.log('WebSocket connection closed.')
            socket = null // Réinitialise le socket si la connexion est fermée
        })

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error)
        })
    }
    return socket
}

export const sendMessageViaWebSocket = (
    content: string,
    sender: string,
    receiver: string,
    roomId: string,
) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
            JSON.stringify({
                roomID: roomId,
                message: content,
                sender,
                receiver,
            }),
        )
    } else {
        console.error('WebSocket connection is not open.')
    }
}

