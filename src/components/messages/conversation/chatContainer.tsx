import React, { useEffect, useState } from 'react'
import { ChatHeader } from './chatHeader'
import SubHeader  from './subHeader'
import { ChatInput } from './chatInput'
import { MessageBubble } from './messageBubble'
import {
    getMessagesByRoomID,
    sendMessage,
} from '@/utils/apiCalls/instantMessage'
import { getUserInfo } from '@/utils/apiCalls/user'
import { connectWebSocketById } from '@/utils/constants/connectWebSocket'
import { useAuth, useUser } from '@clerk/nextjs'
import { groupMessagesByDate, formatDate } from '@/utils/functions/messages'

type Message = {
    id: string
    content: string
    isSent: boolean
    sender: string
    sentAt: Date
}

type ChatContainerProps = {
    roomId: string
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ roomId }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [error, setError] = useState<string | null>(null)
    const [contactName, setContactName] = useState<string>('Inconnu')
    const [contactAvatar, setContactAvatar] = useState<string>('')
    const [receiverId, setReceiverId] = useState<string>('') // Ajout de l'état pour le receiver

    const { user } = useUser()
    const { getToken } = useAuth()

    useEffect(() => {
        const initializeMessages = async () => {
            try {
                const token = (await getToken()) ?? ''
                const fetchedMessages = await getMessagesByRoomID(roomId, token)

                // Identifier le receiver depuis les messages
                const receiverMessage = fetchedMessages.find(
                    (msg) => msg.sender !== user?.id,
                )
                if (receiverMessage) {
                    setReceiverId(receiverMessage.receiver) // Définir dynamiquement l'ID du receiver
                    const receiverInfo = await getUserInfo(
                        receiverMessage.receiver,
                        token,
                    )
                    setContactName(receiverInfo.pseudo)
                    setContactAvatar(receiverInfo.avatarUrl || '')
                }

                setMessages(
                    fetchedMessages.map((msg) => ({
                        id: msg._id,
                        content: msg.message,
                        isSent: msg.sender === user?.id,
                        sender: msg.sender,
                        sentAt: new Date(msg.sentAt),
                    })),
                )
            } catch {
                setError('Erreur lors de la récupération des messages')
            }
        }

        initializeMessages()

        const socket = connectWebSocketById(roomId)
        socket.addEventListener('message', (event) => {
            const newMessage = JSON.parse(event.data)
            if (newMessage.roomID === roomId) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: newMessage._id,
                        content: newMessage.message,
                        isSent: newMessage.sender === user?.id,
                        sender: newMessage.sender,
                        sentAt: new Date(newMessage.sentAt),
                    },
                ])
            }
        })

        return () => {
            socket.close()
        }
    }, [roomId, getToken, user])

    const handleSendMessage = async (messageContent: string) => {
        if (!receiverId) {
            setError('Erreur : Récepteur non défini')
            return
        }

        try {
            const token = await getToken()
            await sendMessage(
                roomId,
                user?.id || '',
                receiverId, // Utilisation du receiverId dynamique
                messageContent,
                new Date(),
                token || '',
            )
        } catch {
            setError('Erreur lors de l’envoi du message')
        }
    }

    const groupedMessages = groupMessagesByDate(messages)

    return (
        <div className='flex h-screen flex-col'>
            <ChatHeader
                contactName={contactName}
                contactAvatar={contactAvatar}
                contactStatus='En ligne'
            />
            <SubHeader
                roomId={roomId}
                userId={user?.id || ''}
            />
            <div className='flex-1 overflow-y-auto bg-gray-50 p-4'>
                {Object.keys(groupedMessages).map((date) => (
                    <div key={date}>
                        <div className='my-4 text-center text-gray-500'>
                            {formatDate(date)}
                        </div>
                        {groupedMessages[date].map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg.content}
                                isSent={msg.isSent}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className='sticky bottom-0 border-t border-gray-300 bg-white p-4'>
                <ChatInput onSendMessage={handleSendMessage} />
                {!!error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    )
}
