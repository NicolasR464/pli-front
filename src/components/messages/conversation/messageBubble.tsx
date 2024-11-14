// MessageBubble.tsx
import React from 'react'

type MessageBubbleProps = {
    message: string
    isSent: boolean
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isSent,
}) => {
    return (
        <div
            className={`mb-2 flex ${isSent ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-xs rounded-lg p-2 ${
                    isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
            >
                {message}
            </div>
        </div>
    )
}
