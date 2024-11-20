'use client'
import { useParams } from 'next/navigation'

import { ChatContainer } from '@/components/messages/conversation/ChatContainer'

const MessagePage = (): React.JSX.Element => {
    const { id: roomId } = useParams()

    return (
        <div className='chat-page'>
            <ChatContainer roomId={roomId as string} />
        </div>
    )
}

export default MessagePage
