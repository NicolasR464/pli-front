/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useEffect, useRef, useState } from 'react'
import { Repeat } from 'react-feather'

import { ChatHeader } from './chatHeader'
import { ChatInput } from './chatInput'
import { MessageBubble } from './messageBubble'
import ProposeExchangeModal from './proposalModal'
import StickySubheader from './stickySubHeader'
import UserInfoCard from './userInfoCard'

import { getMessagesByRoomID } from '@/utils/apiCalls/instantMessage'
import {
    connectWebSocketByRoomId,
    sendMessageViaWebSocket,
} from '@/utils/apiCalls/instantMessage/connectWebSocket'
import { getUserInfo } from '@/utils/apiCalls/user'
import { formatDate, groupMessagesByDate } from '@/utils/functions/messages'

import { useAuth, useUser } from '@clerk/nextjs'

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
type WebSocketMessage = {
    roomID: string
    _id: string
    message: string
    sender: string
    receiver: string
    sentAt: string
}
export const ChatContainer: React.FC<ChatContainerProps> = ({ roomId }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [showModal, setShowModal] = useState(false)
    const [proposalMessages, setProposalMessages] = useState<
        Record<string, string | null>
    >({})
    const [contactName, setContactName] = useState<string>('Inconnu')
    const [contactAvatar, setContactAvatar] = useState<string>('')
    const [receiverId, setReceiverId] = useState<string | null>('')
    const [currentUserInfo, setCurrentUserInfo] = useState<{
        avatar: string
        username: string
    } | null>()
    const { user } = useUser()
    const { getToken } = useAuth()
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const messageIds = useRef(new Set<string>())

    const scrollToBottom = (): void => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const initializeChat = async () => {
            const token = (await getToken()) ?? ''
            const fetchedMessages = await getMessagesByRoomID(roomId, token)

            const otherParticipantId =
                fetchedMessages.find((msg) => msg.sender !== user?.id)
                    ?.sender ??
                fetchedMessages.find((msg) => msg.receiver !== user?.id)
                    ?.receiver
            setReceiverId(otherParticipantId ?? '')

            if (otherParticipantId) {
                const otherParticipantInfo = await getUserInfo(
                    otherParticipantId,
                    token,
                )
                setContactName(otherParticipantInfo.pseudo)
                setContactAvatar(otherParticipantInfo.avatarUrl ?? '')
            }

            // Récupérer les infos de l'utilisateur connecté
            if (user?.id) {
                const currentUser = await getUserInfo(user.id, token)
                setCurrentUserInfo({
                    avatar: currentUser.avatarUrl ?? '',
                    username: currentUser.pseudo ?? 'Utilisateur',
                })
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

            const socket = connectWebSocketByRoomId(roomId)
            socket.addEventListener('message', (event) => {
                const newMessage: WebSocketMessage = JSON.parse(
                    event.data,
                ) as WebSocketMessage
                if (
                    newMessage.roomID === roomId &&
                    !messageIds.current.has(newMessage._id)
                ) {
                    messageIds.current.add(newMessage._id)
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
            return (): void => {
                socket.close()
            }
        }

        initializeChat()
    }, [roomId, getToken, user])

    useEffect((): void => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = (messageContent: string): void => {
        if (!user?.id || !receiverId) return
        sendMessageViaWebSocket(messageContent, user.id, receiverId, roomId)
    }

    const handleProposeExchange = (
        myArticle: string,
        theirArticle: string,
    ): string => {
        const proposalMessage = `Je propose "${myArticle}" en échange de "${theirArticle}"`
        if (proposalMessages[roomId] !== proposalMessage) {
            setProposalMessages((prev) => ({
                ...prev,
                [roomId]: proposalMessage,
            }))
            handleSendMessage(proposalMessage)
        }
        return proposalMessage
    }

    const handleRefuseProposal = (): void => {
        const refusalMessage = 'Je refuse la proposition'
        if (proposalMessages[roomId] !== refusalMessage) {
            handleSendMessage(refusalMessage)
            setProposalMessages((prev) => ({
                ...prev,
                [roomId]: '',
            }))
        }
    }

    const groupedMessages = groupMessagesByDate(messages)

    return (
        <div className='flex h-screen flex-col'>
            <div className='flex justify-between border-b bg-blueGreen-light align-middle shadow-md'>
                {/* Header pour le participant autre que l'utilisateur */}
                <ChatHeader
                    contactName={contactName}
                    contactAvatar={contactAvatar}
                    contactStatus='En ligne'
                />

                <Repeat className='mx-2 self-center text-gray-500' />

                {/* Card sticky pour les infos de l'utilisateur connecté */}
                {!!currentUserInfo && (
                    <UserInfoCard
                        avatarUrl={currentUserInfo.avatar}
                        username={currentUserInfo.username}
                        status='En ligne'
                    />
                )}
            </div>

            {!!proposalMessages[roomId] && (
                <StickySubheader
                    proposalMessage={proposalMessages[roomId] ?? ''}
                    roomId={roomId}
                    onModifyProposal={() => {
                        setShowModal(true)
                    }}
                    onRefuseProposal={handleRefuseProposal}
                />
            )}

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
                <div ref={messagesEndRef} />
            </div>

            <div className='sticky bottom-0 flex border-t border-gray-300 bg-white p-4'>
                <ChatInput onSendMessage={handleSendMessage} />
                <button
                    onClick={() => {
                        setShowModal(true)
                    }}
                    className='ml-2 rounded bg-blueGreen-dark-active p-2 text-white'
                >
                    {'Proposer un échange'}
                </button>
            </div>

            {!!showModal && (
                <ProposeExchangeModal
                    receiverId={receiverId ?? ''}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    onPropose={handleProposeExchange}
                />
            )}
        </div>
    )
}
