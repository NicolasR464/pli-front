'use client'
import { useParams } from 'next/navigation'
import {ChatContainer} from '@/components/messages/conversation/chatContainer'
import { pagePaths } from '@/utils/constants'
import { Bell } from 'react-feather'
import Link from 'next/link'

const MessagePage = () => {
    const { id: roomId } = useParams()

    if (!roomId) return null

    return (
        <div className='chat-page'>
            <Link href={pagePaths.MESSAGES}>
                <Bell
                    className='color-blueGreen-dark-active cursor-pointer'
                    strokeWidth={1.5}
                />
            </Link>
            <ChatContainer roomId={roomId as string} />
        </div>
    )
}

export default MessagePage
