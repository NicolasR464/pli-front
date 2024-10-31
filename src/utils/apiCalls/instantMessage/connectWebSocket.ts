import { environment } from '@/types/environment'

let socket: WebSocket | null = new WebSocket('')

export const connectWebSocketByRoomId = (roomId: string): WebSocket => {
    const wsUrl = `${environment.NEXT_PUBLIC_INSTANT_MESSAGE_WS_URL}${roomId}`
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(wsUrl)
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
    } else {
        // eslint-disable-next-line no-console
        console.error('WebSocket connection is not open.')
    }
}
