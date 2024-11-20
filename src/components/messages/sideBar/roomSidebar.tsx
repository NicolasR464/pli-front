import React, { useEffect, useState } from 'react'

import RoomSidebarItem from './RoomSidebarItem'

import { getInstantMsgs } from '@/utils/apiCalls/instantMessage'
import { getUserById } from '@/utils/apiCalls/user'

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

            try {
                const allMessages = await getInstantMsgs(token)
                const sortedMessages = allMessages.sort(
                    (a, b) =>
                        new Date(b.sentAt).getTime() -
                        new Date(a.sentAt).getTime(),
                )

                const userRoomsMap: Record<string, RoomData> = {}
                const contactIds = new Set<string>()

                for (const message of sortedMessages) {
                    const roomId = message.roomID
                    if (
                        !Object.hasOwn(userRoomsMap, roomId) &&
                        (message.sender === userId ||
                            message.receiver === userId)
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

                        if (contactId) {
                            contactIds.add(contactId)
                        }
                    }
                }

                const contactInfos = await Promise.all(
                    Array.from(contactIds).map(async (contactId) => {
                        try {
                            return {
                                id: contactId,
                                ...(await getUserById(contactId)),
                            }
                        } catch {
                            return {
                                id: contactId,
                                avatarUrl: '',
                                pseudo: 'Utilisateur inconnu',
                            }
                        }
                    }),
                )

                for (const contact of contactInfos) {
                    for (const room of Object.values(userRoomsMap)) {
                        if (
                            room.receiverInfo &&
                            room.receiverInfo.avatar === '' &&
                            room.receiverInfo.username === ''
                        ) {
                            room.receiverInfo = {
                                avatar: contact.avatarUrl ?? '',
                                username: contact.pseudo ?? '',
                            }
                        }
                    }
                }

                setRooms(Object.values(userRoomsMap))
            } catch {
                // Stocker une erreur générique dans l'état
                throw new Error('Erreur lors de la récupération des messages.')
            }
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
