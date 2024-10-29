'use client'
import { useState } from 'react'

import { ChatContainer } from '@/components/messages/conversation/chatContainer'
import RoomSidebar from '@/components/messages/sideBar/roomSidebar'

const Messagerie = (): React.JSX.Element => {
    // `selectedRoomId` est utilisé pour stocker la room actuellement sélectionnée
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)

    // Fonction de gestion pour changer la roomID sélectionnée dans la sidebar
    const handleRoomSelect = (roomId: string) => {
        setSelectedRoomId(roomId)
    }
    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Sidebar des conversations */}
            <RoomSidebar onRoomSelect={handleRoomSelect} />

            {/* Conteneur du chat, affichant les messages de la room sélectionnée */}
            <div className='flex-1'>
                {selectedRoomId ? (
                    <ChatContainer roomId={selectedRoomId} />
                ) : (
                    <p className='p-4'>
                        {
                            'Sélectionnez une conversation pour afficher les messages'
                        }
                    </p>
                )}
            </div>
        </div>
    )
}
export default Messagerie
