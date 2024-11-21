/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { instantMsgInstance } from '@/utils/axiosInstances/instantMessage'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { InstantMessage } from '@/types/instantMessage'

import type { AxiosResponse } from 'axios'

const getHeaders = (token: string): { Authorization: string } => ({
    Authorization: `Bearer ${token}`,
})

type RoomData = {
    id: string
    name: string
    lastMessage: string
    lastUpdated: Date
}

// 1. Fonction pour récupérer tous les messages
export const getInstantMsgs = async (
    token: string,
): Promise<InstantMessage[]> => {
    const headers = getHeaders(token)
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(
            apiEndpoints.microServices.protected.INSTANT_MESSAGES,
            { headers },
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.protected.INSTANT_MESSAGES}`,
        )
    return response.data
}

// 2. Fonction pour créer un message
export const sendMessage = async (
    roomID: string,
    sender: string,
    receiver: string,
    message: string,
    sentAt: Date,
    token: string,
): Promise<InstantMessage> => {
    const headers = getHeaders(token)
    const messageData = { roomID, sender, receiver, message, sentAt }
    const response: AxiosResponse<InstantMessage> =
        await instantMsgInstance.post(
            apiEndpoints.microServices.protected.INSTANT_MESSAGES,
            messageData,
            { headers },
        )
    if (response.status !== 201) {
        throw new Error('Erreur lors de la création du message')
    }
    return response.data
}
// 3. Fonction pour récupérer un message spécifique par ID
export const getInstantMsgById = async (
    msgId: string,
    token: string,
): Promise<InstantMessage> => {
    const headers = getHeaders(token)
    const response: AxiosResponse<InstantMessage> =
        await instantMsgInstance.get(
            `${apiEndpoints.microServices.protected.INSTANT_MESSAGES}${msgId}`,
            { headers },
        )
    if (response.status !== 200) {
        throw new Error(`Failed to fetch message with ID ${msgId}`)
    }
    return response.data
}

// 4. Fonction pour récupérer les messages d’une room spécifique
export const getMessagesByRoomID = async (
    roomID: string,
    token: string,
): Promise<InstantMessage[]> => {
    const headers = getHeaders(token)
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(
            `${apiEndpoints.microServices.protected.INSTANT_MESSAGES}rooms/${roomID}`,
            { headers },
        )
    if (response.status !== 200) {
        throw new Error(`Failed to fetch messages for roomID ${roomID}`)
    }
    return response.data
}

// 5. Fonction pour supprimer un message par ID
export const deleteMessageById = async (
    msgId: string,
    token: string,
): Promise<void> => {
    const headers = getHeaders(token)
    const response = await instantMsgInstance.delete(
        `${apiEndpoints.microServices.protected.INSTANT_MESSAGES}${msgId}`,
        { headers },
    )
    if (response.status !== 200) {
        throw new Error(`Failed to delete message with ID ${msgId}`)
    }
}

/**
 * Récupère les informations de l'utilisateur à partir de son ID et du jeton d'authentification.
 * @param {string} token - Le jeton d'authentification requis pour l'appel de l'API.
 * @param {string} userId - L'ID unique de l'utilisateur dont on souhaite récupérer les informations.
 * @returns {Promise<UserInfo>} - Les informations de l'utilisateur sous forme de promesse.
 */
export const fetchRoomsForUser = async (
    token: string,
    userId: string,
): Promise<Record<string, RoomData>> => {
    const allMessages = await getInstantMsgs(token)

    // Définition du type RoomData pour structurer les données des salles de manière claire
    const userRoomsMap: Record<string, RoomData> = {}

    for (const message of allMessages) {
        if (message.sender === userId || message.receiver === userId) {
            if (!userRoomsMap[message.roomID]) {
                userRoomsMap[message.roomID] = {
                    id: message.roomID,
                    name: `Room ${message.roomID}`,
                    lastMessage: message.message,
                    lastUpdated: message.sentAt,
                }
            } else if (
                new Date(message.sentAt) >
                new Date(userRoomsMap[message.roomID].lastUpdated)
            ) {
                userRoomsMap[message.roomID].lastMessage = message.message
                userRoomsMap[message.roomID].lastUpdated = message.sentAt
            }
        }
    }

    return userRoomsMap
}
