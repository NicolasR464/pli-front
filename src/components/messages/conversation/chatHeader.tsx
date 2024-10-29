// ChatHeader.tsx
import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import React from 'react'

type ChatHeaderProps = {
    contactName: string
    contactAvatar: string
    contactStatus?: string
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    contactName,
    contactAvatar,
    contactStatus,
}) => {
    return (
        <div className='flex items-center border-b border-gray-200 p-4'>
            <img
                src={contactAvatar || avatarPlaceholder}
                alt={contactName || 'Avatar'}
                className='h-10 w-10 rounded-full'
            />
            <div className='ml-4'>
                <h2 className='text-lg font-semibold'>{contactName}</h2>
                {contactStatus && (
                    <p className='text-sm text-gray-500'>{contactStatus}</p>
                )}
            </div>
        </div>
    )
}
