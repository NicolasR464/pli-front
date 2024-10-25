'use client'

import { useState } from 'react'
import { Paperclip, Send } from 'react-feather'
import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/shadcn/ui/sidebar'
import { Avatar } from '@/components/shadcn/ui/avatar'

//Mock
const conversations = [
    { id: '1', name: 'John Doe', lastMessage: 'Hello there!' },
    { id: '2', name: 'Jane Smith', lastMessage: 'Can we talk?' },
    { id: '3', name: 'Alice Johnson', lastMessage: 'See you soon!' },
]

const Messagerie = (): React.JSX.Element => {
    // Component
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation)
        // Charger les messages pour cette conversation si nécessaire
        setMessages([
            { id: 1, content: 'Salut!', sender: 'John Doe' },
            { id: 2, content: 'Comment ça va?', sender: 'Vous' },
            // Charger d'autres messages
        ])
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, content: message, sender: 'Vous' },
            ])
            setMessage('')
        }
    }

    return (
        <SidebarProvider>
            <div className='flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
                {/* Sidebar Conversations */}
                <Sidebar className='w-1/4 border-r border-gray-200 bg-white shadow-md'>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className='px-4 py-2 font-semibold text-indigo-600'>
                                Conversations
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {conversations.map((conversation) => (
                                        <SidebarMenuItem
                                            key={conversation.id}
                                            onClick={() =>
                                                handleConversationSelect(
                                                    conversation,
                                                )
                                            }
                                            className={`flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-all hover:bg-indigo-50 ${
                                                selectedConversation?.id ===
                                                conversation.id
                                                    ? 'bg-indigo-100'
                                                    : ''
                                            }`}
                                        >
                                            <Avatar className='h-10 w-10 bg-indigo-200' />{' '}
                                            {/* Avatar placeholder */}
                                            <div className='flex flex-col'>
                                                <span className='font-bold text-gray-700'>
                                                    {conversation.name}
                                                </span>
                                                <span className='text-sm text-gray-500'>
                                                    {conversation.lastMessage}
                                                </span>
                                            </div>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Chat Area */}
                <div className='flex flex-1 flex-col'>
                    {/* Chat Header */}
                    <div className='border-b bg-white p-4 shadow'>
                        {selectedConversation ? (
                            <h2 className='text-lg font-bold text-indigo-700'>
                                {selectedConversation.name}
                            </h2>
                        ) : (
                            <h2 className='text-lg font-bold text-gray-500'>
                                Sélectionnez une conversation
                            </h2>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div className='flex-1 overflow-y-auto bg-indigo-50 p-6'>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 max-w-xs rounded-lg p-3 shadow-sm ${
                                    msg.sender === 'Vous'
                                        ? 'self-end bg-indigo-600 text-white'
                                        : 'self-start bg-white text-gray-700'
                                }`}
                            >
                                <span>{msg.content}</span>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    {selectedConversation && (
                        <div className='flex items-center border-t bg-white p-4'>
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder='Écrivez un message...'
                                className='mr-4 flex-1 rounded-full border-gray-300'
                            />
                            <Button
                                onClick={handleSendMessage}
                                className='flex items-center rounded-full bg-indigo-600 text-white'
                            >
                                <Send
                                    size={16}
                                    className='mr-2'
                                />{' '}
                                Envoyer
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </SidebarProvider>
    )
}

export default Messagerie
