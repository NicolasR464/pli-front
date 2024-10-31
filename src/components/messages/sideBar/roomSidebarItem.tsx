import React from 'react'
import Image from 'next/image'

import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { formatDate } from '@/utils/functions/messages'

type RoomSidebarItemProps = {
    room: {
        id: string
        name: string
        lastMessage: string
        lastUpdated: Date
        receiverInfo: {
            avatar: string
            username: string
        } | null
    }
    onSelect: () => void
}

const RoomSidebarItem: React.FC<RoomSidebarItemProps> = ({
    room,
    onSelect,
}) => {
    return (
        <div
            className='cursor-pointer p-2 hover:bg-gray-200'
            onClick={onSelect}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect()
                }
            }}
            role='button'
            tabIndex={0}
        >
            <div className='flex items-center space-x-4'>
                <Image
                    src={room.receiverInfo?.avatar ?? avatarPlaceholder}
                    alt={room.receiverInfo?.username ?? 'Avatar'}
                    className='h-10 w-10 rounded-full'
                    width={10}
                    height={10}
                />
                <div>
                    <h3 className='text-lg font-semibold'>
                        {room.receiverInfo?.username ?? room.name}
                    </h3>
                    <p className='text-gray-500'>{room.lastMessage}</p>
                    <span className='text-text-5 text-gray-400'>
                        {`Mis à jour : ${formatDate(room.lastUpdated.toString())}`}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RoomSidebarItem
