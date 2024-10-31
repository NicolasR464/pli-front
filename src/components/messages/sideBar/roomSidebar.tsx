/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react'

import RoomSidebarItem from './roomSidebarItem'

import { getInstantMsgs } from '@/utils/apiCalls/instantMessage'
import { getUserInfo } from '@/utils/apiCalls/user'

import { useAuth, useUser } from '@clerk/nextjs'

type RoomData = {
    id: string
    name: string
    lastMessage: string
    lastUpdated: Date
    receiverInfo: {
        avatar: string
        username: string
    } | null
}

type RoomSidebarProps = {
    onRoomSelect: (roomId: string) => void
}

const RoomSidebar: React.FC<RoomSidebarProps> = ({ onRoomSelect }) => {
    const [rooms, setRooms] = useState<RoomData[]>([])
    const { getToken } = useAuth()
    const { user } = useUser()

    useEffect(() => {
        const fetchRooms = async (): Promise<void> => {
            const token = (await getToken()) ?? ''
            const userId = user?.id

            // Récupérer tous les messages de l'utilisateur actuel et les trier par date d'envoi (du plus récent au plus ancien)
            const allMessages = await getInstantMsgs(token)
            const sortedMessages = allMessages.sort(
                (a, b) =>
                    new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
            )

            // Parcourir les messages pour ne garder que le plus récent de chaque room
            const userRoomsMap: Record<string, RoomData> = {}

            for (const message of sortedMessages) {
                const roomId = message.roomID
                if (
                    !Object.hasOwn(userRoomsMap, roomId) &&
                    (message.sender === userId || message.receiver === userId)
                ) {
                    const contactId =
                        message.sender === userId
                            ? message.receiver
                            : message.sender

                    userRoomsMap[roomId] = {
                        id: roomId,
                        name: `Room ${roomId}`,
                        lastMessage: message.message,
                        lastUpdated: message.sentAt,
                        receiverInfo: {
                            avatar: '',
                            username: '',
                        },
                    }

                    // Récupérer les informations du contact et les ajouter comme `receiverInfo`
                    if (contactId && token) {
                        const contactData = await getUserInfo(contactId, token)
                        userRoomsMap[roomId].receiverInfo = {
                            avatar: contactData.avatarUrl ?? '',
                            username: contactData.pseudo,
                        }
                    }
                }
            }

            // Mettre à jour le state avec la liste des rooms
            setRooms(Object.values(userRoomsMap))
        }

        fetchRooms()
    }, [getToken, user])

    return (
        <aside className='h-screen w-1/4 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4'>
            <h2 className='mb-4 text-xl font-semibold'>
                {'Mes Conversations'}
            </h2>
            <div className='space-y-4'>
                {rooms.map((room) => (
                    <RoomSidebarItem
                        room={room}
                        key={room.id}
                        onSelect={() => {
                            onRoomSelect(room.id)
                        }}
                    />
                ))}
            </div>
        </aside>
    )
}

export default RoomSidebar
