// ChatInput.tsx
import React, { useState } from 'react'

type ChatInputProps = {
    onSendMessage: (message: string) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input)
            setInput('')
        }
    }

    return (
        <div className='flex items-center border-t border-gray-200 p-4'>
            <input
                type='text'
                value={input}
                onChange={(e) => {
                    setInput(e.target.value)
                }}
                placeholder='Write your message'
                className='mr-2 flex-grow rounded-lg border p-2'
            />
            <button
                onClick={handleSend}
                className='rounded-full bg-teal-600 p-2 text-white'
            >
                {'Send'}
            </button>
        </div>
    )
}
