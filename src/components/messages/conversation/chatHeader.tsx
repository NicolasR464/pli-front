import React from 'react'
import Image from 'next/image'

import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'

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
        <div className='flex items-center p-4'>
            <Image
                src={contactAvatar || avatarPlaceholder}
                alt={contactName || 'Avatar'}
                className='h-10 w-10 rounded-full'
                width={10}
                height={10}
            />
            <div className='ml-4'>
                <h2 className='text-lg font-semibold'>{contactName}</h2>
                {!!contactStatus && (
                    <p className='text-sm text-gray-500'>{contactStatus}</p>
                )}
            </div>
        </div>
    )
}
