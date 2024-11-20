import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'

import { sendMessage } from '@/utils/apiCalls/instantMessage'

import { useAuth, useUser } from '@clerk/nextjs'

type ProductActionsProps = {
    sellerId: string
    articleTitle: string
}

const ProductActions: React.FC<ProductActionsProps> = ({
    sellerId,
    articleTitle,
}) => {
    const { getToken } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const clerkUser = useUser().user
    const handleSendMessage = async (): Promise<void> => {
        setLoading(true)

        try {
            const token = await getToken()
            if (!token) {
                throw new Error(
                    'Vous devez être connecté pour envoyer un message.',
                )
            }
            const senderId = clerkUser?.id ?? 'unknown_user'
            const roomID = `${senderId}_${sellerId}`
            const message = `Bonjour, je suis intéressé(e) par votre article "${articleTitle}".`
            const sentAt = new Date()

            // Envoi du premier message
            await sendMessage(
                roomID,
                senderId,
                sellerId,
                message,
                sentAt,
                token,
            )

            // Redirection vers la messagerie
            router.push(`/messagerie/${roomID}`)
        } catch {
            // Gestion sécurisée de l'erreur
            const errorMessage = 'Une erreur inattendue est survenue.'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='mb-6 mt-6 flex justify-center space-x-4'>
            <Button
                className='rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-2 text-white shadow-md transition duration-300 ease-in-out hover:from-teal-500 hover:to-teal-700'
                aria-label='Je veux acheter cet article'
            >
                {'Je le veux ! ❤️'}
            </Button>
            <Button
                onClick={() => {
                    handleSendMessage()
                }}
                disabled={loading}
                className='transform rounded-lg bg-gradient-to-r from-teal-200 to-teal-300 px-6 py-2 text-teal-700 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-teal-300 hover:to-teal-400 hover:text-white'
                aria-label='Envoyer un message au vendeur'
            >
                {loading ? 'Envoi en cours…' : 'Envoyer un message 💬'}
            </Button>
            {error.trim() && (
                <div className='mt-4 text-red-500'>
                    <p>{error}</p>
                </div>
            )}
        </div>
    )
}

export default ProductActions
