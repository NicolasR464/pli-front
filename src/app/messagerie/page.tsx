'use client'
import { useState } from 'react'

import { ChatContainer } from '@/components/messages/conversation/chatContainer'
import RoomSidebar from '@/components/messages/sideBar/roomSidebar'

const Messagerie = (): React.JSX.Element => {
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <RoomSidebar onRoomSelect={(roomId) => setSelectedRoomId(roomId)} />

            {/* Chat Container */}
            <div className="flex-1 flex flex-col">
                {selectedRoomId ? (
                    <ChatContainer roomId={selectedRoomId} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Sélectionnez une conversation pour commencer le chat
                    </div>
                )}
            </div>
        </div>
    )
}
export default Messagerie
