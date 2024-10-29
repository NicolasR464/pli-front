import React, { useEffect, useState } from 'react'

import RoomSidebarItem from './roomSidebarItem'

import { getInstantMsgs } from '@/utils/apiCalls/instantMessage'
import { getUserInfo } from '@/utils/apiCalls/user'

import { useAuth, useUser } from '@clerk/nextjs'
import NewConversationModal from './convModal'

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { getToken } = useAuth()
    const { user } = useUser()

    useEffect(() => {
        const fetchRooms = async () => {
            const token = await getToken() || ''
            const userId = user?.id

            // Récupérer tous les messages de l'utilisateur actuel
            const allMessages = await getInstantMsgs(token)
            const sortedMessages = allMessages.sort(
                (a, b) =>
                    new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
            )
            // Filtrer et mapper les messages par room pour l'utilisateur
            const userRoomsMap: Record<string, RoomData> = {}
            for (const message of sortedMessages) {
                if (
                    (message.sender === userId || message.receiver === userId) &&
                    !userRoomsMap[message.roomID]
                ) {
                    const receiverId = message.receiver
                    const roomId = message.roomID

                    // Ajouter temporairement des informations de receiver en tant que null
                    userRoomsMap[message.roomID] = {
                        id: message.roomID,
                        name: `Room ${message.roomID}`,
                        lastMessage: message.message,
                        lastUpdated: message.sentAt,
                        receiverInfo: null,
                    }

                    // Récupérer les informations du receiver
                    if (receiverId && token) {
                        const receiverData = await getUserInfo(
                            receiverId,
                            token,
                        )
                        userRoomsMap[message.roomID].receiverInfo = {
                            avatar: receiverData.avatarUrl || '',
                            username: receiverData.pseudo,
                        }
                    }
                }
            }

            setRooms(Object.values(userRoomsMap))
        }

        fetchRooms()
    }, [getToken, user])

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    return (
        <aside className='h-screen w-1/4 overflow-y-auto border-r border-gray-200 bg-gray-100 p-4'>
            <h2 className='mb-4 text-xl font-semibold'>
                {'Mes Conversations'}
            </h2>
            <button
                onClick={openModal}
                className='w-full rounded bg-blue-500 p-2 text-white'
            >
                Nouvelle conversation
            </button>
            <NewConversationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onRoomSelect={onRoomSelect}
            />
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
