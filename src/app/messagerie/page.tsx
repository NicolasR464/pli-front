'use client'
import { useState } from 'react'

import { ChatContainer } from '@/components/messages/conversation/ChatContainer'
import RoomSidebar from '@/components/messages/sideBar/RoomSidebar'

const Messagerie = (): React.JSX.Element => {
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>('')

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <RoomSidebar
                onRoomSelect={(roomId) => {
                    setSelectedRoomId(roomId)
                }}
            />

            {/* Chat Container */}
            <div className='flex flex-1 flex-col'>
                {selectedRoomId ? (
                    <ChatContainer roomId={selectedRoomId} />
                ) : (
                    <div className='flex h-full items-center justify-center text-gray-500'>
                        {'Sélectionnez une conversation pour commencer le chat'}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Messagerie
