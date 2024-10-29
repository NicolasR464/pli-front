/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { environment } from '@/types/environment'

let reconnectAttempts = 0
let socket: WebSocket
const MAX_RECONNECT_ATTEMPTS = 5
export const connectWebSocket = (): WebSocket => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(environment.NEXT_PUBLIC_INSTANT_MESSAGE_WS_URL)

        socket.addEventListener('open', () => {
            console.log('WebSocket connection established.')
        })

        socket.addEventListener('close', () => {
            console.log('WebSocket connection closed.')
        })

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error)
        })
    }
    return socket
}
export const connectWebSocketById = (roomId: string): WebSocket => {
    socket = new WebSocket(
        `${environment.NEXT_PUBLIC_INSTANT_MESSAGE_WS_URL}?roomID=${roomId}`,
    )

    socket.addEventListener('open', () => {
        reconnectAttempts = 0
        console.log(`WebSocket connected to room: ${roomId}`)
    })

    socket.addEventListener('close', (event) => {
        if (reconnectAttempts < 5) {
            // Limiter les tentatives de reconnexion
            console.log(
                `WebSocket closed unexpectedly, attempting to reconnect...`,
            )
            setTimeout(
                () => connectWebSocketById(roomId),
                1000 * reconnectAttempts++,
            )
        } else {
            console.error('Max reconnect attempts reached.')
        }
    })

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error)
    })

    return socket
}
